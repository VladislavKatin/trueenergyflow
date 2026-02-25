"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
};

const SUPPORT_TEXT = "You are supported. You can begin again.";
const COLOR = "#b7791f";
const POINTER_RADIUS = 120;
const REPULSE_FORCE = 3.2;
const RETURN_FORCE = 0.03;
const FRICTION = 0.9;

export function ParticleSupportBanner() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const pointer = { x: 0, y: 0, active: false, radius: POINTER_RADIUS };
    let particles: Particle[] = [];
    let rafId = 0;

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const buildParticles = () => {
      const rect = stage.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) {
        particles = [];
        return;
      }

      let fontSize = clamp(Math.floor(width * 0.07), 20, 52);
      offCtx.clearRect(0, 0, width, height);
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = COLOR;

      do {
        offCtx.font = `700 ${fontSize}px "Merriweather", Georgia, serif`;
        if (offCtx.measureText(SUPPORT_TEXT).width <= width * 0.92 || fontSize <= 16) break;
        fontSize -= 1;
      } while (fontSize > 16);

      offCtx.fillText(SUPPORT_TEXT, width / 2, height / 2);

      const image = offCtx.getImageData(0, 0, width, height).data;
      const gap = width < 640 ? 2 : 3;
      const nextParticles: Particle[] = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const alpha = image[(y * width + x) * 4 + 3];
          if (alpha > 120) {
            nextParticles.push({
              x,
              y,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              size: Math.max(1.1, gap * 0.7)
            });
          }
        }
      }

      particles = nextParticles;
    };

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const radiusSq = pointer.radius * pointer.radius;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = COLOR;
      ctx.globalAlpha = 0.95;

      for (const particle of particles) {
        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq) || 0.001;
            const force = 1 - dist / pointer.radius;
            particle.vx += (dx / dist) * force * REPULSE_FORCE;
            particle.vy += (dy / dist) * force * REPULSE_FORCE;
          }
        }

        particle.vx += (particle.baseX - particle.x) * RETURN_FORCE;
        particle.vy += (particle.baseY - particle.y) * RETURN_FORCE;
        particle.vx *= FRICTION;
        particle.vy *= FRICTION;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      ctx.globalAlpha = 1;
      rafId = window.requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const resizeObserver = new ResizeObserver(buildParticles);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerenter", onMove);
    stage.addEventListener("pointerleave", onLeave);
    resizeObserver.observe(stage);

    const fontReady = document.fonts?.ready || Promise.resolve();
    fontReady.then(buildParticles);
    buildParticles();
    draw();

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerenter", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="rounded-[2rem] border border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4 shadow-sm md:p-6">
      <h2 className="sr-only">Supportive interactive message</h2>
      <div
        ref={stageRef}
        className="h-[140px] overflow-hidden rounded-2xl border border-amber-200/70 bg-white/70 md:h-[170px]"
        aria-label={SUPPORT_TEXT}
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </section>
  );
}
