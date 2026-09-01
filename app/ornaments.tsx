/**
 * Territorial ornaments — Torre del Greco.
 *
 * The town is the world capital of coral and cameo carving, it sits at the foot
 * of Vesuvius and it faces the bay. The volcano with its bay is drawn as 1px
 * line work that draws itself on scroll. The coral and the cameo are supplied
 * illustrations, served as images from public/images.

 *
 * Every path carries pathLength="1" so one dash rule animates them all whatever
 * their real length, and the order of the children is the order they are drawn
 * in — always from the base outwards, so a half-finished drawing still reads as
 * something growing rather than as loose fragments.
 */

type Props = { className?: string };

/**
 * Vesuvius and the bay, seen the way Torre del Greco sees them: the Monte Somma
 * ridge on the left, the cone on the right, the sea underneath.
 */
export function VesuvioMare({ className = "" }: Props) {
  return (
    <svg
      className={`draw vesuvio ${className}`}
      viewBox="0 0 400 220"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* il profilo: fianco del Somma, cresta, sella, cono grande */}
      <path pathLength="1" d="M14 152C50 150 82 132 108 100" />
      <path pathLength="1" d="M108 100C118 88 126 76 134 72" />
      <path pathLength="1" d="M134 72C142 76 148 84 158 84" />
      <path pathLength="1" d="M158 84C176 62 194 42 210 30" />
      <path pathLength="1" d="M210 30C220 23 232 24 242 32" />
      <path pathLength="1" d="M242 32C276 60 320 108 356 136" />
      <path pathLength="1" d="M356 136C370 146 382 151 392 152" />
      {/* la sella interna del Somma */}
      <path pathLength="1" d="M116 92C134 98 152 96 164 86" />
      {/* il mare */}
      <path pathLength="1" d="M16 176C60 172 98 180 142 176" />
      <path pathLength="1" d="M170 176C212 172 248 180 290 176" />
      <path pathLength="1" d="M42 194C90 190 132 198 180 194" />
      <path pathLength="1" d="M214 194C260 190 302 198 350 194" />
      <path pathLength="1" d="M98 210C142 206 180 214 224 210" />
    </svg>
  );
}
