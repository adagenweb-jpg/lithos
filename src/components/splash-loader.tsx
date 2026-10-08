"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TEMPO_MINIMO_MS = 1600; // tempo mínimo de exibição, para a animação do logo completar

type Estado = "visivel" | "saindo" | "oculto";

/**
 * Tela de carregamento com o logo da Lithos (preto) ao abrir o site.
 * Fica no layout raiz, então aparece só na primeira carga — navegar entre
 * páginas depois não mostra de novo.
 */
export function SplashLoader() {
  const [estado, setEstado] = useState<Estado>("visivel");

  useEffect(() => {
    let cancelado = false;
    const html = document.documentElement;
    html.style.overflow = "hidden";

    const minimo = new Promise((r) => setTimeout(r, TEMPO_MINIMO_MS));
    const carregado =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true }));

    Promise.all([minimo, carregado]).then(() => {
      if (cancelado) return;
      html.style.overflow = "";
      setEstado("saindo");
    });

    return () => {
      cancelado = true;
      html.style.overflow = "";
    };
  }, []);

  if (estado === "oculto") return null;

  return (
    <div
      role="status"
      aria-label="Carregando"
      onTransitionEnd={() => estado === "saindo" && setEstado("oculto")}
      className={`splash fixed inset-0 z-50 grid place-items-center bg-branco transition-opacity duration-700 ease-out ${
        estado === "saindo" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-[180px] md:w-[220px]">
        {/* logo "apagado" ao fundo */}
        <Image src="/brand/logo-preto.png" alt="" width={828} height={265} priority className="h-auto w-full opacity-10" />
        {/* logo preto sendo "preenchido" da esquerda para a direita */}
        <Image
          src="/brand/logo-preto.png"
          alt="Lithos"
          width={828}
          height={265}
          priority
          className="splash-logo absolute inset-0 h-auto w-full"
        />
      </div>
    </div>
  );
}
