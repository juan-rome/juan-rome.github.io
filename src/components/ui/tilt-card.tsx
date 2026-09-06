"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uPointer;
  uniform vec3 uColor;
  void main() {
    float d = distance(vUv, uPointer);
    float glow = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, glow * 0.22);
  }
`;

/**
 * Wraps a card in a pointer-driven 3D tilt (a plain CSS transform) plus a
 * moving specular highlight rendered on a small Three.js canvas underneath
 * the content, so the highlight reads as a real light source instead of a
 * CSS gradient trick. Three.js is loaded via a dynamic import rather than a
 * static one: it's a hover-only enhancement, not needed for first paint,
 * and importing any of its renderer classes pulls in most of the library
 * regardless of which ones are named (~140kB), so keeping it out of the
 * initial bundle and off the main thread until a card actually mounts is
 * the difference between a light page and a heavy one. Only renders on
 * pointer events, not a continuous animation loop, so having several of
 * these on one page costs nothing at rest. Skips all of it under
 * prefers-reduced-motion.
 */
export function TiltCard({
  children,
  glowColor = "#38bdf8",
  className,
}: {
  children: ReactNode;
  glowColor?: string;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("three").then(
      ({
        Color,
        Mesh,
        OrthographicCamera,
        PlaneGeometry,
        Scene,
        ShaderMaterial,
        Vector2,
        WebGLRenderer,
      }) => {
        if (cancelled) return;

        const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
        const scene = new Scene();
        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const uniforms = {
          uPointer: { value: new Vector2(0.5, 0.4) },
          uColor: { value: new Color(glowColor) },
        };
        const material = new ShaderMaterial({
          uniforms,
          transparent: true,
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
        });
        const quad = new Mesh(new PlaneGeometry(2, 2), material);
        scene.add(quad);

        function render() {
          renderer.render(scene, camera);
        }

        function resize(w: number, h: number) {
          if (!w || !h) return;
          renderer.setSize(w, h, false);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          render();
        }

        const observer = new ResizeObserver((entries) => {
          const box = entries[0].contentBoxSize?.[0];
          resize(
            box ? box.inlineSize : card.clientWidth,
            box ? box.blockSize : card.clientHeight
          );
        });
        observer.observe(card);

        function handleMove(e: PointerEvent) {
          const rect = card!.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const rotY = (px - 0.5) * 10;
          const rotX = (0.5 - py) * 10;
          card!.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
          uniforms.uPointer.value.set(px, 1 - py);
          render();
        }

        function handleLeave() {
          card!.style.transform = "";
          uniforms.uPointer.value.set(0.5, 0.4);
          render();
        }

        card.addEventListener("pointermove", handleMove);
        card.addEventListener("pointerleave", handleLeave);

        cleanup = () => {
          card.removeEventListener("pointermove", handleMove);
          card.removeEventListener("pointerleave", handleLeave);
          observer.disconnect();
          renderer.dispose();
          material.dispose();
          quad.geometry.dispose();
        };
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [glowColor]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative h-full transition-transform duration-[400ms] ease-out will-change-transform",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full rounded-[inherit]"
      />
      {children}
    </div>
  );
}
