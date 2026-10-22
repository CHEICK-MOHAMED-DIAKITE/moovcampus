import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export interface PodiumEntry {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  campus: string;
  points: number;
  co2: number;
  isMe?: boolean;
}

/** Podium des trois premiers du classement (composant maison, dans la charte « réseau de nuit »). */
@Component({
  selector: 'mc-podium',
  standalone: true,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="podium" aria-labelledby="podium-title">
      <div class="podium__head">
        <h2 id="podium-title">Le podium d'octobre</h2>
        <p>Les trois étudiants qui ont évité le plus de CO₂ ce mois-ci.</p>
      </div>

      <ol class="podium__steps">
        @for (p of ordered(); track p.entry.id) {
          <li class="podium__step podium__step--{{ p.place }}" [class.podium__step--me]="p.entry.isMe">
            <div class="podium__person">
              @if (p.place === 1) { <i class="bi bi-trophy-fill podium__crown" aria-hidden="true"></i> }
              <span class="podium__avatar">{{ p.entry.avatar }}</span>
              <strong class="podium__name">{{ p.entry.firstName }} {{ p.entry.lastName.charAt(0) }}.</strong>
              <span class="podium__campus">{{ p.entry.campus }}</span>
              <span class="podium__points">{{ p.entry.points | number:'1.0-0' }} pts</span>
            </div>
            <div class="podium__block">
              <span class="podium__rank" [attr.aria-label]="p.place + (p.place === 1 ? 're' : 'e') + ' place'">{{ p.place }}</span>
              <span class="podium__co2">{{ p.entry.co2 | number:'1.0-1' }} kg CO₂</span>
            </div>
          </li>
        }
      </ol>
    </section>
  `,
  styleUrl: './podium.component.scss'
})
export class PodiumComponent {
  /** Les trois premiers, dans l'ordre du classement. */
  readonly top = input<PodiumEntry[]>([]);

  /** Ordre visuel : 2e, 1er, 3e. */
  protected readonly ordered = computed(() => {
    const [first, second, third] = this.top();
    return [
      second && { place: 2, entry: second },
      first && { place: 1, entry: first },
      third && { place: 3, entry: third }
    ].filter(Boolean) as { place: number; entry: PodiumEntry }[];
  });
}
