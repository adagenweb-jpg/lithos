import type { Metadata } from "next";
import { ProjectGallery } from "@/components/project-gallery";
import { getProjetos } from "@/lib/data";

export const metadata: Metadata = { title: "Portfólio" };

export default async function PortfolioPage() {
  const projetos = await getProjetos();
  return (
    <>
      <h1 className="sr-only">Portfólio</h1>
      <ProjectGallery projetos={projetos} />
    </>
  );
}
