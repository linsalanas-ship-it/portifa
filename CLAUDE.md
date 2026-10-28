# Portfólio Alana Lins — guia para o Claude

Site estático (HTML + CSS + JS puro, sem build). Conteúdo editável só em `js/conteudo.js`;
`js/main.js` monta as páginas; `css/style.css` tem tokens e layout; `js/lapis.js` é o cursor/rastro.
Escreva para a Alana em português do Brasil, em linguagem simples.

## Identidade (não mudar sem pedido)

- Cores: azul `#0000EC` e rosa `#FAE7EC`. Texto rosa sobre azul, azul sobre rosa. Nada além disso
  (fotos à parte).
- Fontes: Switzer (todo o texto) e Retrogression (pixelada). Na página inicial, a pixelada marca
  letras de destaque nos títulos, com colchetes em `conteudo.js` (`"AL[A]NA LINS"`). **Nas páginas de
  projeto não há Retrogression** (sem capitulares, sem colchetes em títulos, intertítulos ou itens).
- Títulos em caixa alta; menus, subtítulos e textos em caixa baixa.
- Páginas de projeto: fundo rosa, sem rastro de lápis (o cursor de lápis continua).
- Rastro de lápis (`js/lapis.js`): no computador segue o mouse (pontos na página); no celular segue
  o dedo (pontos na tela, porque arrastar rola a página). Não mudar o comportamento do computador.

## Modelo da página de projeto (referência: "Oito vidas de um vestido")

É um **modelo de ritmo, não um gabarito**. Cada projeto deve ganhar sua própria sequência de blocos
a partir do material que tiver (quantidade de texto, número e formato das fotos). Os tipos de bloco
estão documentados no topo de `js/conteudo.js`.

Princípios que valem para todo projeto:

1. **Abertura**: título + subtítulo (o que é, para quem/onde). Em seguida, a imagem mais forte do
   projeto inteira (`foto`), depois um `lide` (alinhado à esquerda) de 1–2 parágrafos que explica o projeto
   em poucas linhas, e o `botao` para o trabalho original quando existir.
2. **Alternar texto e imagem**: nunca duas imagens (ou blocos de imagem) seguidas; sempre texto
   entre elas. Espalhar as fotos ao longo da página em vez de agrupá-las.
3. **Texto corrido sempre em uma coluna, alinhado à esquerda** (`texto`, sem capitular), ocupando
   a largura toda do conteúdo — as mesmas bordas das fotos `wide`, de `itens` e das colunas. Isso
   vale também para o `lide` e o parágrafo final. Duas colunas (`colunas: 2` ou `itens`) **só para
   listas**, bullet points, achados, pilares etc. Quebrar textos longos em vários blocos para
   intercalar com imagens.
   Subseções paralelas (ex.: Manifesto, Tagline, Chamadas…) vão juntas num `itens` em duas
   colunas; as imagens dessas subseções vêm depois, uma após a outra, todas com a mesma largura
   (`wide`). Imagens em sequência ficam mais próximas (espaço `--entre-imagens` no CSS).
4. **Fotos sempre inteiras**: nunca cortar nem esticar; `foto` respeita a proporção e cabe na tela.
   Fotos horizontais boas → `foto` ou `foto-texto`; pares de detalhes → `fotos`; uma foto pequena
   para quebrar o ritmo → `foto-solta` (alternar `lado`); peças verticais (posts, e-mails) →
   `galeria` com `titulo`.
5. **Projetos de estratégia/branding** (ex.: Purpose Paper) costumam ter etapas: usar `intertitulo`
   para cada etapa (sem letra pixelada), `itens` para listas de achados, pilares, princípios etc.,
   e `topico` para subtópicos (com `frases` grandes ou `palavras` em linha). Vídeos: bloco `video`.
   Projetos editoriais/narrativos (ex.: Oito vidas) funcionam melhor como texto corrido.
6. **Alinhamento**: `foto-texto` e `fotos` seguem a mesma grade de duas colunas de `itens` e
   `colunas: 2`.
7. **Destaque**: no máximo um `destaque` (olho) por página, com uma frase forte tirada do próprio
   texto, perto do fim.
8. **Fechamento**: último parágrafo como texto corrido e o `botao` repetido se houver link.
9. **Texto da Alana**: não reescrever o conteúdo dela. Só corrigir erros evidentes e avisar. Textos
   que não vieram dela (resumo da grade, texto do botão) devem ser apontados para ela revisar.

Preferências já dadas pela Alana por projeto:
- **Purpose Paper**: nenhuma imagem dentro de colunas (sem `foto-texto`/`fotos`); todas em `foto`
  (full) ou `foto` com `largura: "wide"`. Peças verticais seguem em `galeria`.

Variações bem-vindas conforme o material: começar por `foto-texto` em vez de `foto`, usar
`foto-solta` em vez de pares, omitir o `destaque`, inverter o `lado`, etc.

## Imagens

- Ficam em `assets/img/<id-do-projeto>/`. Converter para JPG (qualidade ~88) com ImageMagick.
- A `capa` da grade é horizontal (3:2, ~1200×800): recortar do material, sem bordas de fundo.
- GIFs: converter para .mp4 sem som (ffmpeg, H.264, ~1920px, crf ~23, `-movflags +faststart`) e também .webm com o mesmo nome (VP9, crf ~36); usar
  `animacao` no bloco `foto`, com um .jpg do primeiro quadro em `src`.
- Avisar a Alana quando a foto for pequena (< ~1400px de largura) e pedir o original.

## Ao mudar CSS ou JS

- Trocar o `?v=` em `index.html`, `projeto.html` e no `README.md` (cache do navegador).
- Conferir com Playwright (Chromium em `/opt/pw-browsers`) em 1280px e 390px antes de enviar.
- A prévia no Claude (artifact) é uma cópia em scratchpad: fontes embutidas em base64, sem
  `<html>/<head>/<body>`, e links `projeto.html#id` no lugar de `?p=id`.
