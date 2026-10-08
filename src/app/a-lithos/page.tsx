import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BannerSlider } from "@/components/banner-slider";
import { getServicos, premios, sobreTexto } from "@/lib/data";

export const metadata: Metadata = { title: "A Lithos" };

const escritorio = (n: number) => `/images/escritorio/escritorio-${n}.jpg`;

function Texto({ paragrafos }: { paragrafos: string[] }) {
  return (
    <div className="space-y-8 text-[20px] leading-[30px] tracking-xd-25 md:text-[24px] md:leading-[32px]">
      {paragrafos.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default async function SobrePage() {
  const servicos = await getServicos();

  return (
    <>
      <h1 className="sr-only">A Lithos</h1>

      {/* Intro + fotos do escritório (coluna de 1088px) */}
      <section className="mx-auto max-w-[1088px] px-4 pt-14 md:px-0 md:pt-[100px]">
        <Texto paragrafos={sobreTexto} />

        <div className="mt-16 grid gap-4 md:mt-[100px] md:grid-cols-[398fr_674fr]">
          <Foto src={escritorio(1)} className="md:col-span-2 md:aspect-[1088/495]" />
          <Foto src={escritorio(3)} className="md:aspect-[398/495]" />
          <Foto src={escritorio(4)} className="md:aspect-[674/495]" />
          <Foto src={escritorio(2)} className="md:col-span-2 md:aspect-[1088/495]" />
        </div>

        <div className="mt-16 md:mt-[100px]">
          <Texto paragrafos={sobreTexto.slice(0, 2)} />
        </div>
      </section>

      {/* O que fazemos */}
      <section id="o-que-fazemos" className="mx-auto max-w-[1159px] scroll-mt-[94px] px-4 pt-20 md:px-0 md:pt-[300px]">
        <h2 className="text-center text-[34px] font-medium leading-[32px] tracking-xd-25 md:text-left md:pl-[35px]">
          O que fazemos
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-[59px] md:grid-cols-3">
          {servicos.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/o-que-fazemos/${s.slug}`}
                className="group relative grid aspect-square place-items-center overflow-hidden bg-preto"
              >
                <Image
                  src={s.imagem.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 373px, 100vw"
                  className="object-cover opacity-50 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-35"
                />
                <span className="relative max-w-[300px] px-6 text-center text-[28px] font-medium leading-[34px] tracking-xd-25 text-branco">
                  {s.titulo}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20 md:mt-[100px]">
        <BannerSlider
          slides={[
            { titulo: "Sócios", texto: sobreTexto[0], imagem: { src: "/images/banners/socios.jpg", width: 1920, height: 680 } },
            { titulo: "Equipe", texto: sobreTexto[0], imagem: { src: "/images/banners/equipe.jpg", width: 1920, height: 680 } },
          ]}
        />
      </div>

      {/* Prêmios */}
      <section className="mx-auto max-w-[1158px] px-4 py-20 md:px-0 md:pt-[132px] md:pb-[150px]">
        <h2 className="text-center text-[34px] font-medium leading-[32px] tracking-xd-25">Prêmios</h2>
        <ul className="mt-14 grid gap-x-10 gap-y-16 md:mt-[67px] md:grid-cols-2 md:gap-y-[82px]">
          {premios.map((p, i) => (
            <li key={i} className="flex gap-6">
              <span className="w-[48px] shrink-0 pt-px text-[16px] leading-[15px] tracking-xd-100">{p.ano}</span>
              <span className="w-px shrink-0 self-stretch bg-preto" aria-hidden="true" />
              <div>
                <p className="text-[20px] font-medium leading-[24px] tracking-xd-25">{p.titulo}</p>
                <p className="mt-4 text-[16px] leading-[20px] tracking-xd-25 text-cinza-texto">{p.descricao}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Foto({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-cinza-fundo ${className}`}>
      <Image src={src} alt="Escritório Lithos" fill sizes="(min-width: 1088px) 1088px, 100vw" className="object-cover" />
    </div>
  );
}
