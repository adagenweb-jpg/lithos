import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project-gallery";
import { getParceiro, getParceiros, getProjetosDoParceiro } from "@/lib/data";

export async function generateStaticParams() {
  const parceiros = await getParceiros();
  return parceiros.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/parceiros/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const parceiro = await getParceiro(slug);
  return { title: parceiro?.nome ?? "Parceiro" };
}

export default async function ParceiroPage({ params }: PageProps<"/parceiros/[slug]">) {
  const { slug } = await params;
  const parceiro = await getParceiro(slug);
  if (!parceiro) notFound();

  const projetos = await getProjetosDoParceiro(slug);

  return (
    <>
      <header className="flex justify-center pt-10 pb-12 md:pt-[52px] md:pb-[60px]">
        {/* Logos de parceiros vêm em branco; invertidos para o fundo claro */}
        <div className="grid size-[60px] place-items-center bg-preto">
          <Image src={parceiro.logo.src} alt={parceiro.nome} width={60} height={60} className="size-[52px] object-contain" />
        </div>
        <h1 className="sr-only">{parceiro.nome}</h1>
      </header>
      <ProjectGallery projetos={projetos} semFiltro />
    </>
  );
}
