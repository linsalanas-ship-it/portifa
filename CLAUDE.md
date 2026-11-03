# Portfólio Alana Lins — guia para o Claude

Site estático (HTML + CSS + JS puro, sem build). Conteúdo editável só em `js/conteudo.js`;
`js/main.js` monta as páginas; `js/mesa.js` monta as páginas de projeto em mesa de folhas; `css/style.css` tem tokens e layout; `js/lapis.js` é o cursor/rastro.
Escreva para a Alana em português do Brasil, em linguagem simples.

## Identidade (não mudar sem pedido)

- Cores: papel cru `#F1EBE1` em todo o site (sem alternância de fundos) e azul `#0000EC` para
  texto, fios, bordas e botões. Rosinha `#F7D5DE` só no balão da sopa de letrinhas. Textura de
  papel na camada `.grao`, por cima de tudo e abaixo do canvas do lápis.
- Fonte: só a Switzer (`assets/fonts/Switzer-200…800.woff2` e `Switzer-400-italic.woff2`), em vários pesos. Sem fonte pixelada;
  colchetes antigos em `conteudo.js` são apenas removidos pelo `formatar()`.
- Página inicial: o nome (`abertura.nome`) é gigante, em duas linhas que enchem a largura (tamanho
  calculado no `main.js`), com o post-it azul arrastável (`abertura.etiqueta`). O nome e os títulos
  de seção alternam caixa alta e caixa mista letra a letra a cada 3,2 s; na caixa mista os títulos
  ficam como estão escritos no `conteudo.js` (por isso lá eles são escritos em caixa mista).
  Menus, subtítulos e textos em caixa baixa.
- Abertura (`js/abertura.js`, só na 1ª visita da sessão e sem #âncora): folha cru com um lápis
  mínimo (contorno azul, miolo cru) que desenha a bonequinha a partir de
  `assets/img/rosto-tracos.json` (linha central dos traços do `rosto.png`, em coordenadas 737×800,
  `pontos` = bolinhas x, y, raio). Depois a folha sobe e o site sobe colado nela. Durante a abertura
  o rastro do `lapis.js` fica pausado.
- Menu: "alana lins" à esquerda com a assinatura (a bonequinha como máscara do `rosto.png`, balança
  no hover), links à direita.
- Sobre: não é seção; abre como folha azul (texto cru, foto ao lado) por cima da página ao clicar
  em "sobre" no menu ou com `#sobre` na URL (fecha no ×, Esc ou clicando fora). Texto e redes em
  `sobre` no `conteudo.js`.
- Sopa de letrinhas: cada serviço tem um `peso` de fonte (200–700) e vai a 800 no hover/seleção;
  a descrição abre num balão rosinha. Cards da grade: no hover a capa sobe 4px e um risco de lápis
  (SVG + filtro `#grafite`) se desenha sob o título. Cada seção sobe 70px→0 ao entrar na tela.
- Contato: depois de enviar, os campos se dobram, um aviãozinho voa e aparece "Mensagem enviada!".
- Páginas de projeto: mesmo papel cru. Nas páginas em revista não há rastro de lápis (o cursor de
  lápis continua); na mesa de folhas o rastro liga, mas não risca sobre folhas, fotos e textos nem
  durante o arrasto.
- Rastro de lápis (`js/lapis.js`): no computador segue o mouse (pontos na página); no celular segue
  o dedo (pontos na tela, porque arrastar rola a página). Não mudar o comportamento do computador.

## Página de projeto em mesa de folhas (referência: Cieli)

Formato novo, que vai substituir a revista projeto a projeto (próxima: Purpose Paper). O projeto tem
`mesa: { ficha, abertura, folhas }` no `conteudo.js` (tipos de folha documentados no topo do arquivo).

- **Imagem de destaque** (vale para todos os projetos): `abertura` fica fora da mesa, logo abaixo do
  cabeçalho, na largura do conteúdo (até 84rem), `rotate(-1.2deg)`, sem moldura, inteira (max-height
  82svh). Vídeo toca em loop sem som. É a 1ª imagem do visor e mostra o "↗" no hover.
- **Cabeçalho**: título grande à esquerda e ficha à direita (cliente, trabalho, entrega; "projeto
  01 de 04" é calculado pela ordem da lista); valores com no máximo 19rem.
- **Folhas**: cada uma com `x`, `y`, `largura` (frações da largura da mesa), `giro`, `camada`,
  `proporcao` e `fundo`. A mesa é lida de cima para baixo em blocos; no arranjo inicial nenhuma
  folha cobre o texto de outra. Arrastáveis (mouse e teclado), botão "reorganizar", visor com setas
  (fotos e vídeos na ordem da lista). Abaixo de 760px ou com menos movimento, viram pilha.
- Links dentro das folhas abrem num clique, mas não depois de arrastar a folha.
- Vídeos de tela: `assets/video/<id>/`, .mp4 H.264, 1600px, 30 fps, CRF 21, sem áudio, faststart,
  com um .jpg do primeiro quadro como `capa`.

## Modelo da página de projeto em revista (referência: "Oito vidas de um vestido")

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
   para cada etapa, `itens` para listas de achados, pilares, princípios etc.,
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
