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

### Página do projeto com diagramação de revista

Em vez de `banner` + `texto`, um projeto pode ter uma lista `blocos`, montada na ordem
que você quiser: `lide` (abertura em letra maior), `texto` (uma coluna alinhada à esquerda,
na largura toda, com capitular pixelada; `colunas: 2` só para listas), `foto` (de ponta a ponta, ou na largura do texto com `largura: "wide"`), `fotos` (duas lado a lado), `foto-solta` (menor, deslocada para um lado), `foto-texto`,
`destaque` (frase grande, como olho de revista), `intertitulo` (título de seção), `itens` (lista em grade com título e texto), `topico` (subtópico com frases ou palavras em destaque), `video` (YouTube), `galeria` (peças verticais lado a lado, carrossel no celular) e `botao` (link). Os exemplos de cada
tipo estão no topo de `js/conteudo.js`, e os projetos "Oito vidas de um vestido" e "Purpose Paper" servem de exemplo.

### Dicas para montar a página de um projeto

O "Oito vidas de um vestido" serve de modelo de ritmo, mas cada projeto pode ter a sua ordem:

- abra com a imagem mais forte (inteira), um texto curto e o botão para o trabalho original;
- alterne texto e imagem: evite duas imagens seguidas e espalhe as fotos pela página;
- texto corrido sempre em uma coluna, alinhado à esquerda; duas colunas só para listas;
- quebre textos longos em vários blocos `texto` para intercalar com as fotos;
- nas páginas de projeto, a letra pixelada aparece só como capitular (não use colchetes nos títulos);
- use no máximo um `destaque`, com uma frase forte do próprio texto;
- feche com um parágrafo de texto e repita o botão, se houver.

### Formulário de contato

Sem configuração, o botão “enviar” abre o programa de e-mail da pessoa com a mensagem
pronta para o endereço em `contato.email`. Para receber direto, sem abrir o e-mail,
crie um formulário grátis em [formspree.io](https://formspree.io) e cole o link no campo `formspree`.

## Depois de mudar CSS ou JavaScript

Os arquivos são carregados com um número de versão (`style.css?v=2026102813`) em
`index.html` e `projeto.html`. Ao alterar `css/` ou `js/`, troque esse número nos dois
arquivos (por exemplo, pela data do dia) para os visitantes não verem a versão antiga
guardada no navegador. Para editar só o `conteudo.js` não é preciso.

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
