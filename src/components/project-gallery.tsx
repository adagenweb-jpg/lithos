"use client";

import { useState } from "react";
import { CATEGORIAS, type CategoriaSlug, type Projeto } from "@/lib/types";
import { ProjectCard } from "./project-card";

type Filtro = CategoriaSlug | "todos";

const FILTROS: { slug: Filtro; label: string }[] = [
  { slug: "todos", label: "Todos" },
  ...CATEGORIAS,
];

type Props = {
  projetos: Projeto[];
  /** Esconde a barra de categorias (ex.: página de um parceiro). */
  semFiltro?: boolean;
};

/** Galeria em alvenaria (4 colunas de 443px + 10px de respiro no XD). */
export function ProjectGallery({ projetos, semFiltro }: Props) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const visiveis =
    filtro === "todos" ? projetos : projetos.filter((p) => p.categoria === filtro);

  return (
    <section className="pb-24">
      {!semFiltro && (
        <nav aria-label="Categorias de projetos" className="px-4 pt-10 pb-6 md:pt-[55px] md:pb-[19px]">
          <ul className="flex flex-wrap justify-center gap-x-[35px] gap-y-3">
            {FILTROS.map((f) => (
              <li key={f.slug}>
                <button
                  type="button"
                  onClick={() => setFiltro(f.slug)}
                  aria-pressed={filtro === f.slug}
                  className={`nav-link cursor-pointer transition-opacity hover:opacity-60 ${
                    filtro === f.slug ? "font-bold" : ""
                  }`}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="px-[10px] md:px-[59px]">
        {visiveis.length === 0 ? (
          <p className="py-24 text-center text-cinza-medio">Nenhum projeto nesta categoria ainda.</p>
        ) : (
          <ul className="columns-1 gap-[10px] sm:columns-2 lg:columns-4">
            {visiveis.map((p) => (
              <li key={p.slug} className="mb-[10px] break-inside-avoid">
                <ProjectCard
                  href={`/portfolio/${p.slug}`}
                  imagem={p.capa}
                  titulo={p.titulo}
                  subtitulo={p.cliente}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
