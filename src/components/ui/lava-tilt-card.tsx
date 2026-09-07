"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uCameraPosition;
  uniform vec3 uBackgroundColor;
  uniform vec3 uLavaColor;
  uniform vec2 uPointer;

  float opSmoothUnion(float d1, float d2, float k) {
    float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
    return mix(d2, d1, h) - k * h * (1.0 - h);
  }

  float getDist(vec3 raypos) {
    float time = uTime * 0.125;
    float botPlane = raypos.y + 2.0;
    float topPlane = 2.0 - raypos.y;

    float sphereMiddle = length(raypos - vec3(0.0, sin(time + 2.0) * 3.0, sin(time))) - 1.5;
    float sphereRight = length(raypos - vec3(-1.0, sin(time) * 2.0, 4.0 + cos(time))) - 1.5;
    float sphereLeft = length(raypos - vec3(-1.0, sin(time + 4.0) * 2.0, -4.0 - cos(time))) - 1.5;
    float sphereBackRight = length(raypos - vec3(3.0, sin(time * 0.75 + 6.0) * 2.0, 2.5 - cos(time * 0.75))) - 2.0;
    float sphereBackLeft = length(raypos - vec3(3.0, sin(time * 0.75 + 9.0) * 2.0, -2.5 + cos(time * 0.75 + 3.0))) - 2.0;

    float dist = opSmoothUnion(botPlane, topPlane, 1.0);
    dist = opSmoothUnion(dist, sphereMiddle, 1.0);
    dist = opSmoothUnion(dist, sphereRight, 1.0);
    dist = opSmoothUnion(dist, sphereLeft, 1.0);
    dist = opSmoothUnion(dist, sphereBackRight, 1.0);
    dist = opSmoothUnion(dist, sphereBackLeft, 1.0);
    return dist;
  }

  vec3 getNormal(vec3 p) {
    return normalize(-p);
  }

  float getLight(vec3 p) {
    vec3 lightpos = vec3(-30.0 + uPointer.x * 16.0, 2.0 + uPointer.y * 12.0, 0.0);
    vec3 lightdir = normalize(lightpos - p);
    vec3 normal = getNormal(p);
    return dot(normal, lightdir);
  }

  float raymarch(vec3 camera, vec3 dir) {
    float dist = 1.5;
    for (int i = 0; i < 30; i++) {
      vec3 pos = camera + dir * dist;
      float stepdist = getDist(pos);
      dist += stepdist;
      if (dist > 30.0 || dist < 1.5) break;
    }
    return dist;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - uResolution.xy * 0.5) / uResolution.y;
    vec3 camera = uCameraPosition;
    vec3 ray = vec3(1.0, uv.y, uv.x);
    float d = raymarch(camera, normalize(ray));
    vec3 p = camera + ray * d;
    float diff = getLight(p);
    vec3 col = vec3(1.0 - diff) * 0.5;
    gl_FragColor = vec4(mix(uBackgroundColor, uLavaColor, col), 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/**
 * A raymarched signed-distance-field lava lamp: blob shapes smooth-unioned
 * together in a distance field, the same technique that gives lava lamps
 * their actual gooey merging, rendered live on a WebGL canvas and wrapped
 * in the site's usual pointer-tilt. Ported from
 * https://github.com/brybrant/lava-lamp (MIT); the two hardcoded colors
 * became uniforms so one shader serves any theme, and a pointer uniform
 * was added so tilting sweeps the light across the surface instead of the
 * shader running independent of the card's own interaction.
 *
 * Plain WebGL rather than Three.js (unlike TiltCard's canvas glow):
 * a single full-screen-quad shader doesn't need a scene graph, so there's
 * no library weight worth deferring here.
 */
export function LavaTiltCard({
  children,
  background,
  lava,
  className,
}: {
  children: ReactNode;
  background: [number, number, number];
  lava: [number, number, number];
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertexShader || !fragmentShader || !program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uCameraPosition: gl.getUniformLocation(program, "uCameraPosition"),
      uBackgroundColor: gl.getUniformLocation(program, "uBackgroundColor"),
      uLavaColor: gl.getUniformLocation(program, "uLavaColor"),
      uPointer: gl.getUniformLocation(program, "uPointer"),
    };

    const pointer = { x: 0, y: 0 };
    const startTime = Math.random() * 100;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId: number | null = null;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    function draw(time: number) {
      gl!.uniform1f(uniforms.uTime, startTime + time * 1e-3);
      gl!.uniform2f(uniforms.uResolution, canvas!.width, canvas!.height);
      gl!.uniform3f(uniforms.uCameraPosition, -6, 0, 0);
      gl!.uniform3f(
        uniforms.uBackgroundColor,
        background[0],
        background[1],
        background[2]
      );
      gl!.uniform3f(uniforms.uLavaColor, lava[0], lava[1], lava[2]);
      gl!.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    function render(time: number) {
      draw(time);
      rafId = requestAnimationFrame(render);
    }

    if (reduceMotion) {
      draw(0);
    } else {
      rafId = requestAnimationFrame(render);
    }

    function handleMove(e: PointerEvent) {
      const rect = card!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * 10;
      const rotX = (0.5 - py) * 10;
      card!.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
      card!.style.setProperty("--mx", `${px * 100}%`);
      card!.style.setProperty("--my", `${py * 100}%`);
      pointer.x = px - 0.5;
      pointer.y = 0.5 - py;
    }
    function handleLeave() {
      card!.style.transform = "";
      card!.style.setProperty("--mx", "50%");
      card!.style.setProperty("--my", "50%");
      pointer.x = 0;
      pointer.y = 0;
    }

    if (!reduceMotion) {
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerleave", handleLeave);
    };
  }, [background, lava]);

  return (
    <div
      className={cn(
        "border-border-strong relative overflow-hidden rounded-3xl border",
        className
      )}
    >
      <div
        ref={cardRef}
        className="relative flex h-full items-center justify-center rounded-3xl transition-transform duration-[70ms] ease-linear will-change-transform"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full rounded-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.14), transparent 60%)",
          }}
        />
        <div className="relative z-[3]">{children}</div>
      </div>
    </div>
  );
}
