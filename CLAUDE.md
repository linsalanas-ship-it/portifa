# Portfólio Alana Lins — guia para o Claude

Site estático (HTML + CSS + JS puro, sem build). Conteúdo editável só em `js/conteudo.js`;
`js/main.js` monta as páginas; `css/style.css` tem tokens e layout; `js/lapis.js` é o cursor/rastro.
Escreva para a Alana em português do Brasil, em linguagem simples.

## Identidade (não mudar sem pedido)

- Cores: azul `#0000EC` e rosa `#FAE7EC`. Texto rosa sobre azul, azul sobre rosa. Nada além disso
  (fotos à parte).
- Fontes: Switzer (todo o texto) e Retrogression (pixelada) só como capitular/letra de destaque,
  marcada em `conteudo.js` com colchetes: `"[A]LANA"`.
- Títulos em caixa alta; menus, subtítulos e textos em caixa baixa.
- Páginas de projeto: fundo rosa, sem rastro de lápis (o cursor de lápis continua).

## Modelo da página de projeto (referência: "Oito vidas de um vestido")

É um **modelo de ritmo, não um gabarito**. Cada projeto deve ganhar sua própria sequência de blocos
a partir do material que tiver (quantidade de texto, número e formato das fotos). Os tipos de bloco
estão documentados no topo de `js/conteudo.js`.

Princípios que valem para todo projeto:

1. **Abertura**: título + subtítulo (o que é, para quem/onde). Em seguida, a imagem mais forte do
   projeto inteira (`foto`), depois um `lide` centralizado de 1–2 parágrafos que explica o projeto
   em poucas linhas, e o `botao` para o trabalho original quando existir.
2. **Alternar texto e imagem**: nunca duas imagens (ou blocos de imagem) seguidas; sempre texto
   entre elas. Espalhar as fotos ao longo da página em vez de agrupá-las.
3. **Texto corrido** em `texto` de duas colunas, com capitular pixelada. Quebrar textos longos em
   vários blocos para intercalar com imagens. Uma coluna (`colunas: 1`) é centralizada e sem
   capitular — usar no parágrafo final.
4. **Fotos sempre inteiras**: nunca cortar nem esticar; `foto` respeita a proporção e cabe na tela.
   Fotos horizontais boas → `foto` ou `foto-texto`; pares de detalhes → `fotos`; uma foto pequena
   para quebrar o ritmo → `foto-solta` (alternar `lado`).
5. **Alinhamento**: `foto-texto` e `fotos` seguem as mesmas duas colunas do texto corrido.
6. **Destaque**: no máximo um `destaque` (olho) por página, com uma frase forte tirada do próprio
   texto, perto do fim.
7. **Fechamento**: último parágrafo em uma coluna, centralizado, e o `botao` repetido se houver link.
8. **Texto da Alana**: não reescrever o conteúdo dela. Só corrigir erros evidentes e avisar. Textos
   que não vieram dela (resumo da grade, texto do botão) devem ser apontados para ela revisar.

Variações bem-vindas conforme o material: começar por `foto-texto` em vez de `foto`, usar
`foto-solta` em vez de pares, omitir o `destaque`, inverter o `lado`, etc.

## Imagens

- Ficam em `assets/img/<id-do-projeto>/`. Converter para JPG (qualidade ~88) com ImageMagick.
- A `capa` da grade é vertical (~3:4): recortar do material, sem bordas de fundo.
- Avisar a Alana quando a foto for pequena (< ~1400px de largura) e pedir o original.

## Ao mudar CSS ou JS

- Trocar o `?v=` em `index.html`, `projeto.html` e no `README.md` (cache do navegador).
- Conferir com Playwright (Chromium em `/opt/pw-browsers`) em 1280px e 390px antes de enviar.
- A prévia no Claude (artifact) é uma cópia em scratchpad: fontes embutidas em base64, sem
  `<html>/<head>/<body>`, e links `projeto.html#id` no lugar de `?p=id`.
