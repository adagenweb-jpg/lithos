import Image from "next/image";
import Link from "next/link";
import type { Imagem } from "@/lib/types";

type Props = {
  href: string;
  imagem: Imagem;
  titulo: string;
  subtitulo?: string;
  sizes?: string;
};

/** Tile da galeria: foto P&B com overlay preto + título no hover (estado "hover" do XD). */
export function ProjectCard({ href, imagem, titulo, subtitulo, sizes }: Props) {
  return (
    <Link href={href} className="group relative block overflow-hidden bg-cinza-fundo">
      <Image
        src={imagem.src}
        alt={imagem.alt ?? titulo}
        width={imagem.width}
        height={imagem.height}
        sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        className="h-auto w-full grayscale transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-preto/0 text-center text-branco opacity-0 transition-all duration-300 group-hover:bg-preto/60 group-hover:opacity-100 group-focus-visible:bg-preto/60 group-focus-visible:opacity-100">
        <span className="text-[22px] font-medium uppercase leading-[27px] tracking-xd-100">
          {titulo}
        </span>
        {subtitulo && (
          <span className="mt-1 text-[18px] leading-[22px] tracking-xd-100">{subtitulo}</span>
        )}
      </div>
    </Link>
  );
}
