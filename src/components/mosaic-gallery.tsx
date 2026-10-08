import Image from "next/image";
import type { Imagem } from "@/lib/types";

/**
 * Mosaico de 6 fotos das telas "Portfólio - Detalhes" e "O que fazemos":
 * 4 colunas de 391px — alta | baixa+alta | alta | baixa+alta (altura total 774px).
 */
const COLUNAS: number[][] = [[774], [293, 471], [774], [266, 498]];

export function MosaicGallery({ imagens, alt }: { imagens: Imagem[]; alt: string }) {
  let i = 0;
  const colunas = COLUNAS.map((alturas) =>
    alturas.map((h) => ({ img: imagens[i++ % imagens.length], h })),
  );

  return (
    <div className="mx-auto grid max-w-[1595px] grid-cols-2 gap-[10px] px-[10px] lg:grid-cols-4">
      {colunas.map((col, c) => (
        <div key={c} className="flex flex-col gap-[10px]">
          {col.map(({ img, h }, k) => (
            <div
              key={k}
              className="relative overflow-hidden bg-cinza-fundo"
              style={{ aspectRatio: `391 / ${h}` }}
            >
              <Image
                src={img.src}
                alt={img.alt ?? alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
