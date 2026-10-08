# Lithos — site institucional

Site da Lithos Arquitetura & Engenharia, feito em **Next.js 16 (App Router) + Tailwind CSS 4**, seguindo o layout do Adobe XD _Site - Lithos_.
Depois virá um painel (`/admin`) só para o CRUD de projetos.

## Rodando

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de produção
```

## Páginas (telas do XD)

| Rota | Tela do XD |
| --- | --- |
| `/` | Home — galeria em alvenaria com filtro por categoria |
| `/portfolio` | Portfólio (mesma galeria) |
| `/portfolio/[slug]` | Portfólio - Detalhes |
| `/a-lithos` | Sobre (texto, fotos do escritório, O que fazemos, Sócios/Equipe, Prêmios) |
| `/o-que-fazemos/[slug]` | O que fazemos |
| `/parceiros` | Parceiros |
| `/parceiros/[slug]` | Parceiros – Detalhes |
| `/contato` | Contato (formulário com Server Action) |

## Estrutura

```
src/
  app/                 rotas (uma pasta por tela)
  components/          header, footer, galerias, cards, slider, formulário
  lib/
    types.ts           Projeto, Parceiro, Serviço, categorias
    data.ts            funções getProjetos/getProjeto/... (hoje mock; amanhã banco)
    site.ts            contatos, menu, textos do rodapé
  data/projetos.json   projetos de exemplo
  fonts/               Roboto variável (auto-hospedada, licença OFL)
public/
  brand/               logo-branco.png e logo-preto.png
  images/              fotos de exemplo (placeholders)
```

## Design tokens (do XD)

Definidos em `src/app/globals.css` (`@theme`):

- Fonte: **Roboto** 400 / 500 / 700
- Cores: `preto #000`, `branco #fff`, `cinza-claro #bebebe`, `cinza-medio #8f8f8f`, `cinza-texto #747474`, `cinza-escuro #5b5b5b`, `cinza-fundo #e6e6e6`
- Letter-spacing do XD → `tracking-xd-25 / 50 / 100 / 200`
- Canvas de 1920px; margens laterais `px-gutter` (140px) e `px-gutter-lg` (278px)

## Pendências

- [ ] Logo definitivo (hoje: `public/brand/logo-*.png` gerados do PNG branco)
- [ ] Trocar as fotos placeholder em `public/images/` pelas reais (exportar do XD)
- [ ] Textos reais (Sobre, rodapé, prêmios — ainda lorem ipsum no XD)
- [ ] Envio do formulário de contato (`src/app/contato/actions.ts`)
- [ ] Painel `/admin` com CRUD de projetos → plugar em `src/lib/data.ts`
