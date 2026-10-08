import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getParceiros } from "@/lib/data";

export const metadata: Metadata = { title: "Parceiros" };

export default async function ParceirosPage() {
  const parceiros = await getParceiros();

  return (
    <section className="px-[10px] pt-10 pb-24 md:px-[59px] md:pt-[60px] md:pb-[100px]">
      <h1 className="sr-only">Parceiros</h1>
      <ul className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
        {parceiros.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/parceiros/${p.slug}`}
              className="group relative grid aspect-[443/399] place-items-center overflow-hidden bg-preto"
            >
              <Image
                src={p.capa.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-40 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-25"
              />
              <Image
                src={p.logo.src}
                alt={p.nome}
                width={90}
                height={90}
                className="relative size-[90px] object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
