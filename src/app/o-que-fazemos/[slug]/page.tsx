import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MosaicGallery } from "@/components/mosaic-gallery";
import { getProjetos, getServico, getServicos } from "@/lib/data";

export async function generateStaticParams() {
  const servicos = await getServicos();
  return servicos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/o-que-fazemos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const servico = await getServico(slug);
  return { title: servico?.titulo ?? "O que fazemos" };
}

export default async function ServicoPage({ params }: PageProps<"/o-que-fazemos/[slug]">) {
  const { slug } = await params;
  const servico = await getServico(slug);
  if (!servico) notFound();

  // Por enquanto a galeria usa fotos de projetos; depois o painel pode vincular fotos ao serviço.
  const fotos = (await getProjetos()).slice(0, 6).map((p) => p.capa);

  return (
    <article className="pb-20 md:pb-[90px]">
      <div className="flex flex-col gap-10 px-gutter pt-16 lg:flex-row lg:justify-between lg:pt-[122px] lg:pr-[3%] lg:pl-[26.6%]">
        <header className="lg:pt-[11px]">
          <p className="text-[24px] leading-[32px] tracking-xd-100">O que fazemos</p>
          <h1 className="mt-10 max-w-[420px] text-[32px] font-bold leading-[42px] md:mt-[100px] md:text-[39px] md:leading-[50px]">
            {servico.titulo}
          </h1>
        </header>
        <div className="max-w-[420px] space-y-6 text-[18px] leading-[22px] text-cinza-medio lg:w-[24%] lg:max-w-none">
          {servico.descricao.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-16 md:mt-[80px]">
        <MosaicGallery imagens={fotos} alt={servico.titulo} />
      </div>
    </article>
  );
}
