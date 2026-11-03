# Alana Lins — portfólio

Site estático (HTML + CSS + JavaScript, sem instalação nem build).

## Como editar o conteúdo

**Tudo o que muda fica em um arquivo só: [`js/conteudo.js`](js/conteudo.js).**
Abra no editor do GitHub (ícone de lápis), altere e salve (“Commit changes”).

- **Quebra de linha** num título: `<br>`.
- **Link da loja:** campo `lojaUrl` (vazio = o menu mostra "em breve").
- **E-mail e redes:** bloco `contato`.

### Acrescentar um projeto

1. Envie as imagens para a pasta `assets/img/` (no GitHub: *Add file → Upload files*).
   - **capa**: horizontal, proporção 3:2 (ex.: 1200 × 800 px), aparece na grade.
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
na largura toda; `colunas: 2` só para listas), `foto` (de ponta a ponta, ou na largura do texto com `largura: "wide"`; com `animacao: "....mp4"` vira um "gif" em vídeo, bem mais leve que um .gif), `fotos` (duas lado a lado), `foto-solta` (menor, deslocada para um lado), `foto-texto`,
`destaque` (frase grande, como olho de revista), `intertitulo` (título de seção), `itens` (lista em grade com título e texto), `topico` (subtópico com frases ou palavras em destaque), `video` (YouTube), `galeria` (peças verticais lado a lado, carrossel no celular) e `botao` (link). Os exemplos de cada
tipo estão no topo de `js/conteudo.js`, e o projeto "Oito vidas de um vestido" serve de exemplo.

### Página do projeto em mesa de folhas

Um projeto pode ter `mesa` em vez de `blocos` (todos os projetos já usam esse formato): as folhas ficam espalhadas sobre o
papel, podem ser arrastadas, e o botão "reorganizar" volta ao arranjo inicial. Fotos e vídeos abrem
num visor com setas. No celular, as folhas viram uma pilha. A primeira imagem (`abertura`) aparece
em destaque no topo, levemente inclinada. Os tipos de folha estão explicados no topo de
`js/conteudo.js`. Vídeos ficam em `assets/video/<id-do-projeto>/`.

### Dicas para montar a página de um projeto

O "Oito vidas de um vestido" serve de modelo de ritmo, mas cada projeto pode ter a sua ordem:

- abra com a imagem mais forte (inteira), um texto curto e o botão para o trabalho original;
- alterne texto e imagem: evite duas imagens seguidas e espalhe as fotos pela página;
- texto corrido sempre em uma coluna, alinhado à esquerda; duas colunas só para listas;
- quebre textos longos em vários blocos `texto` para intercalar com as fotos;
- use no máximo um `destaque`, com uma frase forte do próprio texto;
- feche com um parágrafo de texto e repita o botão, se houver.

### Sopa de letrinhas (o que eu faço)

Em `servicos.lista`, cada serviço tem `nome` (a palavra que flutua), `peso` (a grossura da letra,
de 200 a 700) e `descricao` (o texto do balão rosinha). Para acrescentar um serviço, copie um bloco
`{ nome: ..., peso: ..., descricao: ... },`.

### Sobre

O "sobre" abre como uma folha azul por cima da página (pelo menu ou pelo endereço `#sobre`).
O texto, a foto e os links das redes ficam no bloco `sobre` do `conteudo.js`.

### Contato

A seção "Vamos colaborar?" tem um botão "fale comigo" que abre o programa de e-mail da pessoa,
já endereçado para `contato.email` e com o assunto de `contato.assunto`. O texto do botão fica em
`contato.botao`.

## Depois de mudar CSS ou JavaScript

Os arquivos são carregados com um número de versão (`style.css?v=2026110315`) em
`index.html` e `projeto.html`. Ao alterar `css/` ou `js/`, troque esse número nos dois
arquivos (por exemplo, pela data do dia) para os visitantes não verem a versão antiga
guardada no navegador. Para editar só o `conteudo.js` não é preciso.

## Ver no computador

Abra `index.html` no navegador, ou rode `npx serve .` na pasta e acesse o endereço exibido.

## Publicar (GitHub Pages)

*Settings → Pages → Branch:* escolha a branch principal e a pasta `/ (root)` → *Save*.

## Estrutura

```
index.html        página única (nome, projetos, sopa de letrinhas, contato; o sobre abre por cima)
projeto.html      modelo da página interna de cada projeto
js/conteudo.js    ← conteúdo editável
js/main.js        monta as páginas a partir do conteúdo
js/mesa.js        monta as páginas de projeto em mesa de folhas
js/lapis.js       rastro de lápis
js/abertura.js    abertura com o lápis desenhando a bonequinha
css/style.css     cores, tipografia e layout responsivo
assets/fonts/     Switzer (vários pesos)
assets/img/       imagens (as "placeholder-*" são provisórias)
assets/video/     vídeos das páginas de projeto
```

A abertura (a bonequinha balançando) aparece uma vez por visita; clique, role ou aperte uma tecla para pular.
