"use client";

/*
 * Le fotografie passano dall'ottimizzatore di Next e non da un `<img>` nudo.
 * Con i file originali il corridoio scaricava 5,6 MB e decodificava 54,3
 * megapixel — 207 MB di bitmap in memoria — per disegnarli in riquadri da
 * 243x329: ventiquattro volte i pixel necessari, tutti insieme nell'istante in
 * cui la sezione entra in campo. Era li' che lo scorrimento si inceppava.
 */

import * as React from "react";
import Image from "next/image";

export type CorridorPath = {
  perspective?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  birthHeight?: number;
  exitHeight?: number;
  railBirth?: number;
  railExit?: number;
  fan?: number;
  turnBirth?: number;
  turnExit?: number;
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

function keyframes(direction: 1 | -1, name: string, path: Required<CorridorPath>) {
  const steps: string[] = [];

  for (let step = 0; step <= path.stops; step += 1) {
    const progress = step / path.stops;
    const scale = (path.birthHeight / path.cardHeight) * Math.pow(path.exitHeight / path.birthHeight, progress);
    const depth = path.perspective * (1 - 1 / scale);
    const rail = path.railExit - (path.railExit - path.railBirth) * Math.pow(1 - progress, path.fan);
    const turn = path.turnBirth + (path.turnExit - path.turnBirth) * progress;

    steps.push(
      `${(progress * 100).toFixed(2)}%{transform:translate3d(calc(${(direction * rail).toFixed(2)} * var(--unita)),0,calc(${depth.toFixed(2)} * var(--unita))) rotateY(${(-direction * turn).toFixed(2)}deg)}`,
    );
  }

  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = { src: string; alt?: string };

type ImageStreamHeroProps = React.ComponentProps<"div"> & {
  images: StreamImage[];
  cards?: number;
  speed?: number;
  axis?: number;
  path?: CorridorPath;
  children?: React.ReactNode;
};

export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className = "",
  style,
  ...props
}: ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `image-stream-right-${id}`;
  const left = `image-stream-left-${id}`;
  const cardClass = `image-stream-card-${id}`;
  const geometry = React.useMemo(() => ({ ...PATH, ...path }), [path]);
  const animationCss = React.useMemo(
    () => `${keyframes(1, right, geometry)}${keyframes(-1, left, geometry)}@media(prefers-reduced-motion:reduce){.${cardClass}{animation-play-state:paused!important}}`,
    [right, left, cardClass, geometry],
  );

  return (
    <div className={`image-stream-hero ${className}`.trim()} {...props} style={{ containerType: "inline-size", ...style }}>
      <style>{animationCss}</style>
      <div
        className="image-stream-perspective"
        aria-hidden="true"
        style={{ perspective: `calc(${geometry.perspective} * var(--unita))`, perspectiveOrigin: `50% ${axis}%` }}
      >
        <div className="image-stream-plane">
          {[right, left].map((animationName, directionIndex) =>
            Array.from({ length: cards }, (_, index) => {
              /* Le due corsie pescano immagini alternate: in questo modo il
                 corridoio può mostrare l'intero archivio senza duplicare ogni
                 fotografia su entrambi i lati. */
              const image = images.length ? images[(index * 2 + directionIndex) % images.length] : undefined;
              return (
                <div
                  className={`image-stream-card ${cardClass}`}
                  key={`${animationName}-${index}`}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `calc(${geometry.cardWidth} * var(--unita))`,
                    height: `calc(${geometry.cardHeight} * var(--unita))`,
                    marginLeft: `calc(${-geometry.cardWidth / 2} * var(--unita))`,
                    marginTop: `calc(${-geometry.cardHeight / 2} * var(--unita))`,
                    borderRadius: `calc(${geometry.cardRadius} * var(--unita))`,
                    animation: `${animationName} ${speed}s linear infinite`,
                    animationDelay: `${-((index + directionIndex * 0.5) * speed) / cards}s`,
                  }}
                >
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt ?? ""}
                      fill
                      /* La scheda e' larga 17 unita' del contenitore, che qui e'
                         largo quanto la finestra: chiedere 18vw lascia un margine
                         e non fa scaricare il doppio del necessario. */
                      sizes="(max-width: 600px) 46vw, 18vw"
                      draggable={false}
                    />
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
