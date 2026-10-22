import { Injectable, computed, signal } from '@angular/core';

/**
 * Comptes de démonstration.
 * Le site est statique (GitHub Pages) : les comptes et les trajets sont enregistrés
 * dans le navigateur (localStorage). Le mot de passe n'est jamais stocké en clair,
 * seulement son empreinte SHA-256.
 */
export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  campus: string;
  passwordHash: string;
  createdAt: string;
}

export type SessionUser = Omit<Account, 'passwordHash'>;

const ACCOUNTS_KEY = 'mc.accounts';
const SESSION_KEY = 'mc.session';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown, persist = true): void {
  try {
    const store = persist ? localStorage : sessionStorage;
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Stockage indisponible (navigation privée stricte) : la session reste en mémoire.
  }
}

async function hash(email: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`moovcampus:${email}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const normalize = (email: string) => email.trim().toLowerCase();

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<SessionUser | null>(this.restore());

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly initials = computed(() => {
    const u = this._user();
    return u ? `${u.firstName.charAt(0)}${u.lastName.charAt(0)}`.toUpperCase() : null;
  });

  private restore(): SessionUser | null {
    const email = readJson<string | null>(SESSION_KEY, null);
    if (!email) return null;
    const account = this.accounts()[email];
    return account ? this.toSession(account) : null;
  }

  private accounts(): Record<string, Account> {
    return readJson<Record<string, Account>>(ACCOUNTS_KEY, {});
  }

  private toSession(a: Account): SessionUser {
    const { passwordHash: _, ...user } = a;
    return user;
  }

  async register(data: { firstName: string; lastName: string; email: string; campus: string; password: string }): Promise<SessionUser> {
    const email = normalize(data.email);
    const accounts = this.accounts();
    if (accounts[email]) {
      throw new Error('Un compte existe déjà avec cette adresse. Connecte-toi plutôt.');
    }
    const account: Account = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email,
      campus: data.campus,
      passwordHash: await hash(email, data.password),
      createdAt: new Date().toISOString()
    };
    writeJson(ACCOUNTS_KEY, { ...accounts, [email]: account });
    writeJson(SESSION_KEY, email);
    const user = this.toSession(account);
    this._user.set(user);
    return user;
  }

  async login(emailInput: string, password: string, remember: boolean): Promise<SessionUser> {
    const email = normalize(emailInput);
    const account = this.accounts()[email];
    if (!account || account.passwordHash !== (await hash(email, password))) {
      throw new Error('Adresse e-mail ou mot de passe incorrect.');
    }
    try { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); } catch { /* ignoré */ }
    writeJson(SESSION_KEY, email, remember);
    const user = this.toSession(account);
    this._user.set(user);
    return user;
  }

  logout(): void {
    try { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); } catch { /* ignoré */ }
    this._user.set(null);
  }
}
