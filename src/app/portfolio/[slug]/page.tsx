import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MosaicGallery } from "@/components/mosaic-gallery";
import { getProjeto, getProjetos } from "@/lib/data";

export async function generateStaticParams() {
  const projetos = await getProjetos();
  return projetos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const projeto = await getProjeto(slug);
  return { title: projeto?.titulo ?? "Projeto" };
}

export default async function ProjetoPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const projeto = await getProjeto(slug);
  if (!projeto) notFound();

  const ficha = [
    ["Ano", String(projeto.ano)],
    ["Área", projeto.area],
    ["Localização", projeto.localizacao],
    ["Cliente", projeto.cliente],
  ];

  return (
    <article className="pb-14">
      <header className="grid gap-10 px-gutter-lg pt-16 md:pt-[143px] lg:grid-cols-[1fr_minmax(0,666px)] lg:gap-20">
        <div>
          <h1 className="text-[24px] leading-[32px] tracking-xd-100">{projeto.titulo}</h1>
          <dl className="mt-8 text-[18px] leading-[32px] tracking-xd-25">
            {ficha.map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="inline font-medium">{rotulo}</dt> <dd className="inline">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-6 text-[15px] leading-[24px]">
          {projeto.descricao.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </header>

      <div className="mt-16 md:mt-[150px]">
        <MosaicGallery imagens={projeto.galeria} alt={projeto.titulo} />
      </div>

      <div className="px-gutter-lg pt-16 md:pt-[133px]">
        <Link href="/portfolio" className="text-[14px] leading-[17px] tracking-xd-100 hover:opacity-60">
          &lt; todos os projetos
        </Link>
      </div>
    </article>
  );
}
