import { ProjectGallery } from "@/components/project-gallery";
import { getProjetos } from "@/lib/data";

export default async function Home() {
  const projetos = await getProjetos();
  return <ProjectGallery projetos={projetos} />;
}
