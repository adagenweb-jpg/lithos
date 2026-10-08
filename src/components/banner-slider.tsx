"use client";

import Image from "next/image";
import { useState } from "react";
import type { Imagem } from "@/lib/types";

type Slide = { titulo: string; texto: string; imagem: Imagem };

/** Banner "Sócios / Equipe" da tela Sobre (1920×680, troca por bolinhas). */
export function BannerSlider({ slides }: { slides: Slide[] }) {
  const [atual, setAtual] = useState(0);

  return (
    <section aria-roledescription="carrossel" aria-label="Sócios e equipe" className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${atual * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={s.titulo}
            className="relative min-h-[480px] w-full shrink-0 md:aspect-[1920/680] md:min-h-0"
            aria-hidden={i !== atual}
          >
            <Image src={s.imagem.src} alt="" fill sizes="100vw" className="object-cover" />
            <div className="relative mx-auto flex h-full max-w-[1088px] items-center px-4 md:px-0">
              <div className="max-w-[540px]">
                <h3 className="text-[34px] font-medium leading-[32px] tracking-xd-25">{s.titulo}</h3>
                <p className="mt-6 text-[18px] leading-[28px] tracking-xd-25">{s.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-[1088px] gap-3 px-4 md:bottom-[34px] md:px-0">
        {slides.map((s, i) => (
          <button
            key={s.titulo}
            type="button"
            onClick={() => setAtual(i)}
            aria-label={`Mostrar ${s.titulo}`}
            aria-current={i === atual}
            className={`size-[10px] rounded-full border border-preto transition-colors ${
              i === atual ? "bg-preto" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
