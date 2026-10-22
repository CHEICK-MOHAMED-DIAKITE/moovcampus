import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Illustration de l'écran du hero : une ligne de trajet façon plan de transport,
 * avec un point qui la parcourt et les gains qui s'affichent à l'arrivée.
 * (Composant maison, projeté dans le Hero v-2 de LibraryUI.)
 */
@Component({
  selector: 'mc-route-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rp">
      <svg class="rp__map" viewBox="0 0 900 340" aria-hidden="true">
        <defs>
          <linearGradient id="rp-line" x1="0" x2="1">
            <stop offset="0" stop-color="#7fd1b3"/>
            <stop offset="1" stop-color="#f2c230"/>
          </linearGradient>
        </defs>
        <!-- lignes secondaires -->
        <path d="M40 80 H300 Q340 80 360 110 L420 200" class="rp__ghost"/>
        <path d="M520 40 V140 Q520 170 550 180 H860" class="rp__ghost"/>
        <path d="M120 300 H380 Q420 300 440 270" class="rp__ghost"/>
        <!-- trajet principal -->
        <path id="rp-path" d="M70 250 H250 Q290 250 310 220 L380 120 Q400 92 440 92 H600 Q640 92 660 120 L720 210 Q735 232 770 232 H840" class="rp__line"/>
        <g class="rp__stops">
          <circle cx="70" cy="250" r="11"/>
          <circle cx="310" cy="220" r="8"/>
          <circle cx="440" cy="92" r="8"/>
          <circle cx="600" cy="92" r="8"/>
          <circle cx="840" cy="232" r="13" class="rp__stop--end"/>
        </g>
        <circle r="10" class="rp__dot">
          <animateMotion dur="5.5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear">
            <mpath href="#rp-path"/>
          </animateMotion>
        </circle>
        <text x="70" y="290" class="rp__label">Ivry-sur-Seine</text>
        <text x="440" y="70" class="rp__label rp__label--mid">Porte d'Italie</text>
        <text x="840" y="278" class="rp__label rp__label--end">Campus Villejuif</text>
      </svg>

      <div class="rp__chips">
        <span class="rp__chip"><i class="bi bi-bicycle"></i> 5,9 km à vélo</span>
        <span class="rp__chip rp__chip--green"><i class="bi bi-cloud-check"></i> 1,18 kg de CO₂ évités</span>
        <span class="rp__chip rp__chip--yellow"><i class="bi bi-trophy-fill"></i> +79 points</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .rp { position: relative; width: 100%; padding: 1.5rem 1.5rem 1.75rem; }
    .rp__map { width: 100%; height: auto; display: block; overflow: visible; }
    .rp__ghost { fill: none; stroke: rgba(255,255,255,.08); stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
    .rp__line { fill: none; stroke: url(#rp-line); stroke-width: 12; stroke-linecap: round; stroke-linejoin: round; }
    .rp__stops circle { fill: #0f2a1f; stroke: #fff; stroke-width: 4; }
    .rp__stops .rp__stop--end { fill: #f2c230; stroke: #fff; }
    .rp__dot { fill: #fff; filter: drop-shadow(0 0 10px rgba(242,194,48,.9)); }
    .rp__label { fill: rgba(255,255,255,.75); font: 600 17px var(--mc-font-body); text-anchor: start; }
    .rp__label--mid { text-anchor: middle; }
    .rp__label--end { text-anchor: end; fill: #fff; font-weight: 700; }
    .rp__chips { display: flex; flex-wrap: wrap; justify-content: center; gap: .6rem; margin-top: .75rem; }
    .rp__chip { display: inline-flex; align-items: center; gap: .45rem; padding: .5rem .9rem; border-radius: 999px; background: rgba(255,255,255,.08); color: #e6efe9; border: 1px solid rgba(255,255,255,.12); font-size: .9rem; font-weight: 600; }
    .rp__chip--green { background: rgba(127,209,179,.16); color: #bfe8d6; }
    .rp__chip--yellow { background: rgba(242,194,48,.16); color: #ffe08a; }
    @media (max-width: 600px) {
      .rp { padding: 1rem .75rem 1.25rem; }
      .rp__label { font-size: 26px; }
      .rp__label--mid { display: none; }
      .rp__chip { font-size: .78rem; padding: .4rem .7rem; }
    }
    @media (prefers-reduced-motion: reduce) { .rp__dot { display: none; } }
  `]
})
export class RoutePreviewComponent {}
