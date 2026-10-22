/**
 * Composant LibraryUI : « Cards », style « Event card »
 * Source : https://www.libraryui.com/components/bootstrap/cards
 *
 * Adaptations MoovCampus : chaque carte est un défi (période, lieu, participants,
 * points à gagner, tendance). Boutons « Rejoindre » / « Copier le lien » fonctionnels,
 * état « inscrit » géré dans le composant, largeur fluide.
 */
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

export interface EventAttendee {
  readonly initials: string;
  readonly background: string;
}

export type TrendDirection = 'up' | 'down' | 'flat';

export interface EventItem {
  readonly id: string;
  readonly date: string;
  readonly time: string;
  readonly title: string;
  readonly location: string;
  readonly amount: string;
  readonly amountPositive?: boolean;
  readonly trendLabel?: string;
  readonly trendValue: string;
  readonly trendDirection?: TrendDirection;
  readonly attendees?: EventAttendee[];
  readonly attendeesCountLabel?: string;
  readonly attendeesSuffix?: string;
  readonly status?: string;
  readonly showPublish?: boolean;
  readonly shareUrl?: string;
}

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCard {
  readonly events = input<EventItem[]>([]);

  readonly editLabel = input('Rejoindre le défi');
  readonly joinedLabel = input('Défi rejoint');
  readonly copyLabel = input('Copier le lien');
  readonly copiedLabel = input('Lien copié');
  readonly publishLabel = input('M\'inscrire');

  readonly editEvent = output<EventItem>();
  readonly copyLink = output<EventItem>();
  readonly publish = output<EventItem>();

  private readonly copiedEvent = signal<EventItem | null>(null);
  private readonly joined = signal<Set<string>>(new Set());

  isCopied(event: EventItem): boolean {
    return this.copiedEvent() === event;
  }

  isJoined(event: EventItem): boolean {
    return this.joined().has(event.id);
  }

  onJoin(event: EventItem): void {
    this.joined.update(set => {
      const next = new Set(set);
      next.has(event.id) ? next.delete(event.id) : next.add(event.id);
      return next;
    });
    this.editEvent.emit(event);
  }

  async onCopyLink(event: EventItem): Promise<void> {
    this.copyLink.emit(event);
    const url = event.shareUrl ?? `${location.origin}${location.pathname}#/communaute`;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Le presse-papiers peut être refusé : on affiche quand même la confirmation.
      }
    }

    this.copiedEvent.set(event);
    setTimeout(() => {
      if (this.copiedEvent() === event) {
        this.copiedEvent.set(null);
      }
    }, 2000);
  }
}
