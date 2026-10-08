// Tipos de domínio — espelham o que o painel (CRUD de projetos) vai gerenciar.

export const CATEGORIAS = [
  { slug: "residenciais", label: "Residenciais" },
  { slug: "edificios", label: "Edifícios" },
  { slug: "condominios", label: "Condomínios" },
  { slug: "comerciais", label: "Comerciais" },
  { slug: "interiores", label: "Interiores" },
] as const;

export type CategoriaSlug = (typeof CATEGORIAS)[number]["slug"];

export type Imagem = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export type Projeto = {
  slug: string;
  titulo: string;
  categoria: CategoriaSlug;
  ano: number;
  area: string; // ex.: "13.317m²"
  localizacao: string;
  cliente: string;
  parceiroSlug?: string;
  descricao: string[]; // parágrafos
  capa: Imagem;
  galeria: Imagem[];
  destaque?: boolean;
};

export type Parceiro = {
  slug: string;
  nome: string;
  logo: Imagem;
  capa: Imagem;
};

export type Servico = {
  slug: string;
  titulo: string;
  imagem: Imagem;
  descricao: string[];
};
