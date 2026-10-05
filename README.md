# Alana Lins — portfólio

Site estático (HTML + CSS + JavaScript, sem instalação nem build).

## Como editar o conteúdo

**Tudo o que muda fica em um arquivo só: [`js/conteudo.js`](js/conteudo.js).**
Abra no editor do GitHub (ícone de lápis), altere e salve (“Commit changes”).

- **Letra pixelada:** coloque a letra entre colchetes → `"[A]LANA [L]INS"`.
- **Quebra de linha** num título: `<br>`.
- **Link da loja:** campo `lojaUrl`.
- **E-mail e redes:** bloco `contato`.

### Acrescentar um projeto

1. Envie as imagens para a pasta `assets/img/` (no GitHub: *Add file → Upload files*).
   - **capa**: vertical, proporção ~3:4 (ex.: 820 × 1125 px), aparece na grade.
   - **banner**: horizontal, ~2,7:1 (ex.: 2120 × 780 px), aparece no topo da página do projeto.
2. Em `js/conteudo.js`, copie um bloco `{ ... },` da lista `projetos`, cole abaixo e troque:
   ```js
   {
     id: "novo-projeto",            // endereço: projeto.html?p=novo-projeto
     titulo: "NOVO PROJETO",
     resumo: "uma linha sobre o projeto",
     capa: "assets/img/novo-capa.jpg",
     banner: "assets/img/novo-banner.jpg",
     texto: ["primeiro parágrafo", "segundo parágrafo"],
     galeria: [],                   // opcional: mais imagens no fim da página
   },
   ```
   O `id` deve ter só letras minúsculas, números e hífens.
3. Pronto: o projeto aparece na grade e ganha a própria página automaticamente.
   Para mudar a ordem, mude a ordem dos blocos.

### Formulário de contato

Sem configuração, o botão “enviar” abre o programa de e-mail da pessoa com a mensagem
pronta para o endereço em `contato.email`. Para receber direto, sem abrir o e-mail,
crie um formulário grátis em [formspree.io](https://formspree.io) e cole o link no campo `formspree`.

## Ver no computador

Abra `index.html` no navegador, ou rode `npx serve .` na pasta e acesse o endereço exibido.

## Publicar (GitHub Pages)

*Settings → Pages → Branch:* escolha a branch principal e a pasta `/ (root)` → *Save*.

## Estrutura

```
index.html        página única (aberturas, projetos, sobre, o que faço, contato)
projeto.html      modelo da página interna de cada projeto
js/conteudo.js    ← conteúdo editável
js/main.js        monta as páginas a partir do conteúdo
css/style.css     cores, tipografia e layout responsivo
assets/fonts/     Switzer e Retrogression
assets/img/       imagens (as "placeholder-*" são provisórias)
```

A abertura (headers 1 e 2) aparece uma vez por visita; clique, role ou aperte uma tecla para pular.
