"use client";

import * as React from "react";

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
      `${(progress * 100).toFixed(2)}%{transform:translate3d(${(direction * rail).toFixed(2)}cqw,0,${depth.toFixed(2)}cqw) rotateY(${(-direction * turn).toFixed(2)}deg)}`,
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
        style={{ perspective: `${geometry.perspective}cqw`, perspectiveOrigin: `50% ${axis}%` }}
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
                    width: `${geometry.cardWidth}cqw`,
                    height: `${geometry.cardHeight}cqw`,
                    marginLeft: `${-geometry.cardWidth / 2}cqw`,
                    marginTop: `${-geometry.cardHeight / 2}cqw`,
                    borderRadius: `${geometry.cardRadius}cqw`,
                    animation: `${animationName} ${speed}s linear infinite`,
                    animationDelay: `${-((index + directionIndex * 0.5) * speed) / cards}s`,
                  }}
                >
                  {image ? <img src={image.src} alt={image.alt ?? ""} loading="lazy" decoding="async" draggable={false} /> : null}
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
