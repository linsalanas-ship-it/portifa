/* =====================================================================
   CONTEÚDO DO SITE — este é o único arquivo que você precisa editar.

   • Imagens ficam na pasta assets/img/ (ex.: "assets/img/cieli-capa.jpg").
   • Para ACRESCENTAR um projeto: copie um bloco { ... } da lista
     "projetos", cole logo abaixo (não esqueça a vírgula entre os blocos)
     e troque os textos. O "id" vira o endereço da página:
     id "cieli"  →  projeto.html?p=cieli  (use só letras minúsculas,
     números e hífens, sem acento nem espaço).
   • A ordem da lista é a ordem em que os projetos aparecem no site.

   PÁGINA DO PROJETO EM BLOCOS (diagramação de revista)
   Cada projeto pode ter uma lista "blocos", montada na ordem que você
   quiser. Tipos de bloco:

     { tipo: "lide", texto: ["..."] }
         abertura em letra maior, uma coluna
     { tipo: "texto", texto: ["...", "..."] }
         texto corrido em uma coluna, alinhado à esquerda na largura toda
         (use sempre para texto corrido)
     { tipo: "texto", alinhamento: "centro", texto: ["..."] }
         uma coluna centralizada, sem capitular
     { tipo: "texto", colunas: 2, texto: ["..."] }
         duas colunas (uma no celular) — só para listas
     { tipo: "foto", src: "assets/img/...", legenda: "opcional" }
         foto de ponta a ponta da tela (sempre inteira, sem cortar)
     { tipo: "foto", src: "assets/img/....jpg", animacao: "assets/img/....mp4" }
         foto animada (como um gif): o vídeo .mp4 toca sozinho, sem som e em
         repetição; a foto .jpg aparece enquanto ele carrega
     { tipo: "foto", largura: "wide", src: "assets/img/..." }
         foto na largura do texto da página, sem ir até as bordas da tela
     { tipo: "fotos", src: ["assets/img/a.jpg", "assets/img/b.jpg"] }
         duas fotos lado a lado
     { tipo: "foto-solta", src: "assets/img/...", lado: "direita" }
         foto menor, deslocada para um lado (lado = "esquerda" ou "direita");
         alternando os lados, as fotos ficam desencontradas pela página
     { tipo: "foto-texto", src: "assets/img/...", texto: ["..."], lado: "direita" }
         foto numa coluna e texto na outra (lado = onde fica a foto)
     { tipo: "intertitulo", texto: "ESCUTA & DIAGNÓSTICO" }
         título de seção dentro da página
     { tipo: "itens", titulo: "opcional", itens: [{ titulo: "...", texto: "..." }] }
         lista em grade de duas colunas, cada item com título e texto
     { tipo: "topico", titulo: "...", frases: ["..."], palavras: ["..."], texto: ["..."] }
         subtópico centralizado; frases (grandes), palavras (em linha) e
         texto são todos opcionais. Os itens de "itens" aceitam os mesmos campos
     { tipo: "video", url: "https://youtu.be/..." }
         vídeo do YouTube, com link para assistir lá
     { tipo: "galeria", titulo: "opcional", src: ["a.jpg", "b.jpg", "c.jpg"] }
         várias imagens verticais lado a lado (até 3 por linha); no celular
         viram um carrossel com rolagem para o lado
     { tipo: "destaque", texto: "frase em destaque" }
         citação grande, como olho de revista
     { tipo: "botao", texto: "ler o livro", url: "https://..." }
         botão com link (abre em outra aba)


   PÁGINA DO PROJETO EM MESA DE FOLHAS (como a Cieli)
   Em vez de "blocos", o projeto pode ter "mesa": { ficha, abertura, folhas }.
     ficha: [["cliente", "..."], ["trabalho", "..."], ["entrega", "..."]]
         (a linha "projeto 01 de 04" é calculada pela ordem da lista)
     abertura: { src: "assets/img/....jpg", alt: "..." }
         imagem de destaque no topo, inclinada; com video: "....mp4" vira vídeo
     folhas: lista de folhas soltas. Toda folha tem:
         id (único), tipo, nome (aparece no visor e para leitores de tela),
         fundo ("pagina", "azul", "rosinha", "rosa", "lilas", "amarelo",
         "salvia"), proporcao (largura ÷ altura) e o lugar inicial na mesa:
         x, y e largura em frações da largura da mesa, giro (graus) e camada.
         meta: ["retranca · texto", "texto à direita"] é a linha pequena do alto.
       Tipos:
         lide        texto (+ selos: "CI01"), tamanho (opcional, em cqw)
         frase       texto, tamanho (opcional, em cqw); quadrada: true = post-it
         bilhete     titulo, itens (com clipe)
         tagline     texto, legenda
         manifesto   titulo, colunas: [[estrofes], [estrofes]], assinatura
                     (em qualquer texto: <br> quebra linha, <em>...</em> é itálico
                     e <b>...</b> deixa o trecho em 600)
         video-youtube  url do YouTube, titulo
         texto       titulo, texto: [parágrafos], colunas: 2 (opcional; o texto corre
                     nas duas colunas), corpo (tamanho do texto, em cqw)
                     ou colunas: [[...], [...]] montadas à mão, com parágrafos e
                     { forte: "..." } (em 600), { destaque: "..." } (letra grande),
                     { lista: ["...", "..."] } (com fio pontilhado);
                     no destaque, tamanho (cqw) e embaixo: true (alinhado no pé)
         formulario  titulo, subtitulo, colunas: ["a", "b"], linhas: [["...", "..."]], rodape
         tela        video, capa (1º quadro .jpg), link: { texto, url }
         passo       titulo (lugar), texto, foto, url (olho: "página de destino");
                     retrato: true deixa a foto 4:5 no celular; tamanho fixa a
                     letra (cqw); posicao: "49% 30%" escolhe o enquadramento da foto
         foto-texto  foto (16:9 em cima), texto (frase no pé), tamanho
         personalidade  texto (destaque), legenda, foto (à direita)
         naming      texto (o nome, enorme), legenda
         janela      barra ("fifi diz:"), texto (janela de bate-papo antiga)
         sumario     texto, itens: [["01", "capítulo", "personagem"]] (índice de livro)
         fio         titulo, texto (folha larga atravessada por um fio rosa)
       Opções extras: lide aceita pe (parágrafo menor) e link: { texto, url };
       frase aceita links: [{ texto, url }, { proximo: true }]; passo aceita
       capitulo: true, funcao, aspas: true, fotoEsquerda: true e colunas:
       "1.12fr 0.88fr"; personalidade aceita paragrafos, aspas: true, colunas, posicao e
       fotoEmCima: true (no celular).
         lista       titulo, itens
         creditos    pares: [["rótulo", "valor"]] ou texto (o link do próximo projeto é automático)
         foto        src, alt, espaco (proporção do espaço reservado: largura ×
                     espaco define a área; a foto fica na proporção original)
       As fotos e vídeos entram no visor na ordem da lista, depois da abertura.

   Projetos sem "blocos" nem "mesa" usam o modelo simples: banner + "texto".
   ===================================================================== */

const SITE = {
  /* ---------- Menu ---------- */
  lojaUrl: "#", // troque pelo link da sua loja, ex.: "https://minhaloja.com"

  /* ---------- Topo da página inicial ---------- */
  abertura: {
    nome: "Alana Lins", // vira o nome gigante: 1ª palavra à esquerda, 2ª à direita
    etiqueta: "jornalista,<br>estrategista<br>e redatora", // texto do post-it azul
    descricao: "jornalista, estrategista e redatora",
  },

  /* ---------- Seção Projetos ---------- */
  secaoProjetos: {
    titulo: "Dei a letra",
    descricao: "projetos de estratégia, verbal e conteúdo",
  },

  projetos: [
    {
      id: "cieli",
      titulo: "Cieli",
      resumo: "expressão verbal, arquitetura de conteúdo e copywriting para agência de viagens de luxo",
      capa: "assets/img/cieli/capa-grade.jpg", // imagem horizontal, 3:2 (grade de projetos)
      // Página em "mesa de folhas" (tipos de folha explicados no topo deste arquivo)
      mesa: {
        ficha: [
          ["cliente", "agência de viagens de luxo"],
          ["trabalho", "expressão verbal, arquitetura de conteúdo para site e copywriting"],
          ["entrega", "tagline principal, manifesto, arquitetura das páginas e conteúdo em texto para o site"],
        ],
        abertura: { src: "assets/img/cieli/abertura.jpg", alt: "Paisagem da Toscana com a assinatura Cieli" },
        folhas: [
          // ---------- apresentação ----------
          { id: "lide", tipo: "lide", nome: "apresentação", fundo: "pagina", proporcao: 1.32,
            x: 0.03, y: 0.02, largura: 0.42, giro: 1.5, camada: 2,
            meta: ["Cieli · agência de viagens de luxo", "folha 01"], selos: "CI01",
            texto: "A Cieli é uma agência ítalo-brasileira especialista em roteiros feitos sob medida. Apaixonada por descobrir o mundo, ela cria itinerários que vão além dos guias tradicionais e que acolhem os desejos, o tempo, o ritmo e a personalidade dos viajantes." },
          { id: "fr-2012", tipo: "frase", quadrada: true, nome: "frase: desde 2012", fundo: "amarelo", proporcao: 1, tamanho: 11.5,
            x: 0.47, y: 0.05, largura: 0.15, giro: -5, camada: 3,
            texto: "Explorando o infinito do mundo desde 2012" },
          { id: "objetivos", tipo: "bilhete", nome: "principais objetivos", fundo: "amarelo", proporcao: 0.82,
            x: 0.67, y: 0, largura: 0.2, giro: 5, camada: 4,
            titulo: "Principais objetivos",
            itens: ["posicionar a marca no mercado de luxo", "apresentar o serviço com mais clareza", "criar páginas para captação de leads com sofisticação", "gerar desejo no visitante do site"] },
          // ---------- marca ----------
          { id: "tagline", tipo: "tagline", nome: "tagline principal", fundo: "azul", proporcao: 1.45,
            x: 0.56, y: 0.28, largura: 0.36, giro: -2, camada: 5,
            meta: ["tagline principal", "Cieli"], texto: "Destinos Infinitos",
            legenda: "Reflete a personalidade apaixonada e exploradora da marca, que encontra as diferentes facetas e segredos de cada lugar, abrindo possibilidades infinitas para seus viajantes." },
          { id: "manifesto", tipo: "manifesto", nome: "manifesto", fundo: "lilas", proporcao: 0.98,
            x: 0.03, y: 0.4, largura: 0.42, giro: -1.2, camada: 6,
            meta: ["manifesto", "folha 02"], titulo: "Quem tem paixão vive o infinito.",
            colunas: [
              [
                "Todo coração vasto desbrava o profundo do mundo:<br>perde-se pelas ruelas de pedra,<br>saboreia o sagrado no prato,<br>é seduzido pelo estrondo dos mares.",
                "Cada lugar que existe guarda incontáveis destinos.<br>E é possível traçar caminhos únicos até o seu.<br>Por isso, vamos sempre além<br>— além-fronteiras, além-rotas, além-óbvio.<br>Para decifrar os segredos que se revelam apenas a olhares atentos.",
              ],
              [
                "Como verdadeiros <em>apassionati</em> por viagens,<br>desenhamos roteiros com cuidado e intenção.<br>E como bons anfitriões, falamos a mesma língua<br>e <em>compartilhamos as belezas secretas</em>.",
                "Em nosso mapa, a arte, os sabores e os cenários são mais do que uma foto.<br>São vivências genuínas que te fazem sentir o tempo e tocar o céu.",
              ],
            ],
            assinatura: "Cieli<br>Destinos infinitos" },
          { id: "video", tipo: "video-youtube", nome: "vídeo", fundo: "azul", proporcao: 1.45,
            x: 0.49, y: 0.57, largura: 0.38, giro: 1.5, camada: 7,
            meta: ["vídeo", "Cieli"], url: "https://www.youtube.com/watch?v=zt_v6TOYiZA", titulo: "Vídeo da Cieli" },
          { id: "fr-alem", tipo: "frase", nome: "frase: ir mais além", fundo: "pagina", proporcao: 1.5, tamanho: 8.6,
            x: 0.72, y: 0.84, largura: 0.2, giro: 3, camada: 8,
            meta: ["copywriting", "folha 03"], texto: "Cieli tem paixão por ir mais além" },
          // ---------- site ----------
          { id: "arquitetura", tipo: "texto", nome: "arquitetura de conteúdo e copywriting", fundo: "salvia", proporcao: 1.15,
            x: 0.52, y: 0.98, largura: 0.44, giro: 1.2, camada: 9,
            meta: ["arquitetura de conteúdo e copywriting", "folha 04"], titulo: "Arquitetura de conteúdo e copywriting",
            colunas: 2, // o texto corre em duas colunas
            texto: [
              "O site da Cieli precisava conciliar três demandas que costumam competir entre si: um tom sofisticado, simples e poético; textos otimizados para busca; e informações práticas que o visitante precisava entender antes de contratar.",
              "Para organizar tudo isso, estruturei o site em três camadas com funções distintas. A homepage apresenta a marca e seu modo de trabalhar, com diferenciais e depoimentos. As páginas de cada destino funcionam como landing pages: despertam desejo e captam buscas orgânicas, todas com o mesmo esqueleto: abertura, exemplo de roteiro dia a dia, experiências e FAQ. Já as páginas institucionais aprofundam a confiança e a autoridade.",
              "Mas informar não bastava: o visitante precisava captar a essência de cada lugar e se imaginar vivendo a viagem. Para isso, construí um campo semântico cinematográfico e literário, por exemplo: depoimentos semelhantes a reviews de cinema na homepage; linha narrativa própria para cada destino; citações literárias; e roteiros escritos como sequências de cenas.",
            ] },
          { id: "camadas", tipo: "formulario", nome: "três camadas do site", fundo: "pagina", proporcao: 1.2,
            x: 0.04, y: 1, largura: 0.4, giro: -1, camada: 10,
            titulo: "Três camadas", subtitulo: "Cieli · arquitetura do site", colunas: ["camada", "função"],
            linhas: [
              ["Homepage", "Apresenta a marca e seu modo de trabalhar, com diferenciais e depoimentos."],
              ["Destinos", "Funcionam como landing pages: despertam desejo e captam buscas orgânicas. Abertura, exemplo de roteiro dia a dia, experiências e FAQ."],
              ["Institucionais", "Aprofundam a confiança e a autoridade."],
            ],
            rodape: ["folha 05", "arquitetura de conteúdo"] },
          { id: "site-home", tipo: "tela", nome: "site da Cieli: homepage", fundo: "pagina", proporcao: 1.5,
            x: 0.5, y: 1.4, largura: 0.44, giro: -1, camada: 11,
            meta: ["site · homepage", "cielitravel.com"],
            video: "assets/video/cieli/home.mp4", capa: "assets/video/cieli/home.jpg",
            link: { texto: "ver o site", url: "https://cielitravel.com/" } },
          // ---------- destinos ----------
          { id: "fr-historia", tipo: "frase", nome: "frase: sentidos atentos", fundo: "azul", proporcao: 1.6, tamanho: 6.6,
            x: 0.08, y: 1.4, largura: 0.32, giro: 2, camada: 12,
            meta: ["copywriting", "folha 07"], texto: "Todo lugar do mundo conta uma história para quem tem sentidos atentos." },
          { id: "sardenha", tipo: "passo", nome: "Sardenha", fundo: "pagina", proporcao: 1.8,
            x: 0.03, y: 1.76, largura: 0.46, giro: -1.5, camada: 13,
            titulo: "Sardenha", foto: "assets/img/cieli/sardenha.jpg", url: "https://cielitravel.com/sardenha/",
            texto: "A Sardenha desafia a lei natural. Nela, as melhores coisas da vida ocupam o mesmo lugar." },
          { id: "provenca", tipo: "passo", nome: "Provence", fundo: "lilas", proporcao: 1.6,
            x: 0.51, y: 1.79, largura: 0.46, giro: 1.5, camada: 14,
            titulo: "Provence", foto: "assets/img/cieli/provence.jpg", url: "https://cielitravel.com/provence/",
            texto: "Aix-en-Provence, Saint-Rémy-de-Provence, Avignon e outros vilarejos exalam a boa vida de um jeito diferente de Paris: no amor pela terra, no equilíbrio da vida rural, no preparo das refeições e no aroma inconfundível dos campos de lavanda." },
          { id: "italia", tipo: "passo", nome: "Verão na Itália", fundo: "amarelo", proporcao: 1.8,
            x: 0.03, y: 2.1, largura: 0.46, giro: 1, camada: 15,
            titulo: "Verão na Itália", foto: "assets/img/cieli/italia.jpg", url: "https://cielitravel.com/verao-na-italia/",
            texto: "Dizem que amores de verão não duram. Mas o romance que você vive com o verão da Itália dura pra sempre." },
          { id: "fr-estacao", tipo: "frase", nome: "frase: Itália", fundo: "rosinha", proporcao: 1.4, tamanho: 7.4,
            x: 0.3, y: 2.38, largura: 0.22, giro: -3, camada: 16,
            meta: ["copywriting", "folha 06"], texto: "Não existe estação ruim para ser feliz na Itália." },
          { id: "site-toscana", tipo: "tela", nome: "site da Cieli: página de destino", fundo: "pagina", proporcao: 1.5,
            x: 0.53, y: 2.14, largura: 0.42, giro: -1.5, camada: 17,
            meta: ["site · página de destino", "cielitravel.com"],
            video: "assets/video/cieli/toscana.mp4", capa: "assets/video/cieli/toscana.jpg",
            link: { texto: "ver a página no site", url: "https://cielitravel.com/toscana/" } },
          { id: "cote", tipo: "passo", nome: "Côte d’Azur", fundo: "salvia", proporcao: 1.55,
            x: 0.51, y: 2.5, largura: 0.47, giro: -1.2, camada: 18,
            titulo: "Côte d’Azur", foto: "assets/img/cieli/cote-dazur.jpg", url: "https://cielitravel.com/cote-dazur/",
            texto: "Há um imaginário sobre a Côte d’Azur que nenhuma outra região da França consegue replicar. Brigitte Bardot em Saint-Tropez. Grace Kelly cruzando as Corniches rumo a Mônaco. Os iates de Monte-Carlo. O Festival de Cinema de Cannes. Grasse, a capital do perfume. Você já conhece esse cenário, agora é hora de ser o protagonista." },
          { id: "veneza", tipo: "passo", nome: "Veneza e Verona", fundo: "rosinha", proporcao: 1.5,
            x: 0.03, y: 2.6, largura: 0.46, giro: 1.5, camada: 19,
            titulo: "Veneza e Verona", foto: "assets/img/cieli/veneza.jpg", url: "https://cielitravel.com/veneza-e-verona/",
            texto: "Veneza é uma história de amor improvável: transformou a relação com as enchentes do Grande Canal em sua maior beleza, tornando-se “a cidade flutuante”. Já Verona é a cidade onde Shakespeare escolheu ambientar a tragédia de amor mais famosa do mundo. Juntas, elas formam um roteiro que atravessa gerações e nunca envelhece, como todo bom romance." },
          { id: "fr-tempo", tipo: "frase", nome: "frase: métrica da felicidade", fundo: "amarelo", proporcao: 1.3, tamanho: 8.4,
            x: 0.55, y: 2.84, largura: 0.21, giro: 3, camada: 20,
            meta: ["copywriting", "folha 09"], texto: "Conte o tempo na métrica da felicidade." },
          // ---------- fechamento ----------
          { id: "entrega", tipo: "lista", nome: "entrega", fundo: "rosa", proporcao: 1,
            x: 0.12, y: 3.04, largura: 0.24, giro: -3, camada: 21,
            titulo: "Entrega",
            itens: ["Manifesto", "Tagline principal", "Arquitetura de conteúdo do site", "Copywriting da homepage", "Copywriting das páginas institucionais", "Copywriting de 16 páginas de destinos", "Reescrita da FAQ"] },
          { id: "creditos", tipo: "creditos", nome: "créditos", fundo: "pagina", proporcao: 1.6,
            x: 0.46, y: 3.07, largura: 0.3, giro: 1, camada: 22,
            meta: ["créditos", "folha 08"],
            pares: [
              ["Projeto desenvolvido com", "Cluster Design & Branding"],
              ["Coordenação do projeto", "Rodrigo Meireles"],
              ["Design gráfico", "Roger Almeida"],
              ["Conteúdo e copywriting", "Alana Lins"],
            ] },
        ],
      },
    },
    {
      id: "purpose-paper",
      titulo: "Purpose Paper",
      resumo: "estratégia de marca e identidade verbal para papelaria e editora",
      capa: "assets/img/purpose-paper/capa-grade.jpg",
      mesa: {
        ficha: [
          ["cliente", "papelaria e editora"],
          ["trabalho", "estratégia, plataforma de marca e identidade verbal"],
          ["entrega", "brandbook com manual de identidade verbal e treinamento interno"],
        ],
        abertura: { video: "assets/video/purpose-paper/abertura.mp4", src: "assets/video/purpose-paper/abertura.jpg", alt: "Ilustração da Purpose Paper sobre fotos da marca" },
        folhas: [
          // ---------- apresentação ----------
          { id: "lide", tipo: "lide", nome: "apresentação", fundo: "pagina", proporcao: 1.32,
            x: 0.03, y: 0.02, largura: 0.42, giro: 1.5, camada: 2,
            meta: ["Purpose Paper · papelaria e editora", "folha 01"], selos: "PP02",
            texto: "A Purpose Paper é uma papelaria e editora brasileira que ajuda mulheres a cultivar bons hábitos. Seus produtos (planners, journals, livros, cadernos e acessórios) são ferramentas que simplificam práticas essenciais para uma vida significativa na sua totalidade, considerando relacionamentos, família, espiritualidade, vocação, trabalho e outras esferas." },
          { id: "objetivos", tipo: "bilhete", nome: "principais objetivos", fundo: "amarelo", proporcao: 0.82,
            x: 0.74, y: 0, largura: 0.2, giro: 5, camada: 3,
            titulo: "Principais objetivos",
            itens: ["Fortalecer o reconhecimento de marca", "Construir confiança como uma marca pioneira no nicho", "Definir personalidade da marca para ocupar um espaço próprio", "Incentivar o uso intencional dos produtos após a compra (reconhecimento de valor)"] },
          { id: "tagline", tipo: "tagline", nome: "tagline principal", fundo: "azul", proporcao: 1.45, tamanho: 8.6,
            x: 0.48, y: 0.2, largura: 0.32, giro: -2, camada: 4,
            meta: ["tagline principal", "Purpose Paper"], texto: "Habitar no Propósito & Realizar com papel" },
          // ---------- narrativa ----------
          { id: "narrativa", tipo: "texto", nome: "narrativa de marca", fundo: "rosinha", proporcao: 1.5, corpo: 2.3,
            x: 0.03, y: 0.5, largura: 0.52, giro: -1, camada: 5,
            meta: ["narrativa de marca", "folha 02"], titulo: "Narrativa de marca",
            colunas: [
              [
                { forte: "Nossa história de origem se conecta com muitas outras histórias." },
                { lista: [
                  "Para poupar pro casamento, May criou uma empresa do zero.",
                  "Helô se reconectou com seu hobby da infância e voltou a desenhar.",
                  "Para realizar o sonho de cursar Medicina, Vitória precisou reorganizar todo o seu calendário.",
                  "Como um ato de esperança depois de uma depressão pós-parto, Manu criou um livro de memórias da sua família.",
                ] },
              ],
              [
                { destaque: "A história da Purpose Paper é a história de muitas mulheres que planejam e realizam." },
                "Na mão delas, o papel vira ferramenta para estar com Deus na rotina, encontrar a beleza no ordinário e persistir em bons hábitos.",
                { forte: "A Purpose Paper é feita de mulheres que habitam no Propósito e realizam com papel." },
              ],
            ] },
          { id: "escrita", tipo: "foto", nome: "planner em uso", src: "assets/img/purpose-paper/escrita.jpg", alt: "Mãos escrevendo num planner da Purpose Paper",
            espaco: 1.5, x: 0.59, y: 0.52, largura: 0.36, giro: 1.5, camada: 6 },
          // ---------- manifesto ----------
          { id: "manifesto", tipo: "manifesto", nome: "manifesto", fundo: "lilas", proporcao: 0.86,
            x: 0.03, y: 0.94, largura: 0.44, giro: -1.2, camada: 8,
            meta: ["manifesto", "folha 03"], titulo: "Já pensou em quanta coisa cabe no papel?",
            colunas: [
              [
                "Cabe o fluxo do pensamento.<br>O lembrete pro dia.<br>A lista de compras — e a de gratidão.<br>Cabe o rascunho e a arte.<br>A oração silenciosa.",
                "Cabe a própria voz de Deus.",
                "No papel cabe o Propósito de uma vida inteira.<br>E os hábitos que a constroem a cada dia, um esboço do eterno.",
                "Nas nossas mãos, o papel vira ferramenta.<br>Nas folhas de diários, livros ou calendários, arquitetamos histórias.<br>Criamos santuários. Guardamos heranças intangíveis.",
              ],
              [
                "Ligamos os pontos entre futuro e presente.<br>Riscamos a lacuna entre o Divino e o comum.<br>Entre o já e o ainda não.",
                "Em agendas apertadas, nossa mente está no alto.<br>E entre as repetições da rotina, desejamos profundidade.<br>Não esperamos perfeição. Queremos permanecer.",
              ],
            ],
            assinatura: "Dia a dia.<br>Página a página.<br>Habitar no Propósito e realizar com papel." },
          { id: "video", tipo: "video-youtube", nome: "vídeo-manifesto", fundo: "azul", proporcao: 1.45,
            x: 0.51, y: 0.88, largura: 0.38, giro: 1.5, camada: 9,
            meta: ["vídeo-manifesto", "Purpose Paper"], url: "https://youtu.be/Mf1qoBb2ISo", titulo: "Vídeo-manifesto da Purpose Paper" },
          { id: "simbolo", tipo: "foto", nome: "rebranding do símbolo", src: "assets/img/purpose-paper/simbolo.jpg", alt: "Símbolo da Purpose Paper: a estrela que vira folha de papel, e a mão que segura a folha",
            espaco: 1.778, x: 0.5, y: 1.18, largura: 0.47, giro: -1.5, camada: 10 },
          { id: "ps-maos", tipo: "foto-texto", nome: "papel timbrado: em nossas mãos, o papel vira ferramenta", fundo: "pagina", proporcao: 1.12, tamanho: 6.6,
            x: 0.04, y: 1.5, largura: 0.3, giro: 2, camada: 11,
            foto: "assets/img/purpose-paper/papel.jpg", alt: "Papel timbrado com a ilustração da Purpose Paper",
            meta: ["copywriting", "folha 04"], texto: "Em nossas mãos, o papel vira ferramenta." },
          // ---------- estratégia ----------
          { id: "personalidade", tipo: "personalidade", nome: "personalidade: amiga conselheira", fundo: "rosa", proporcao: 1.3,
            x: 0.03, y: 1.84, largura: 0.44, giro: 1.2, camada: 12,
            meta: ["personalidade", "folha 05"], texto: "Amiga conselheira",
            legenda: "A Purpose Paper já era percebida como uma marca amiga. Aproveitamos uma oportunidade na paisagem competitiva para reposicioná-la como uma amiga conselheira: alguém que dialoga com leveza, mas que também tem autoridade no assunto. Esse ajuste trouxe mais firmeza à comunicação, alinhando-se à história de pioneirismo e à robustez dos produtos.",
            foto: "assets/img/purpose-paper/amigas.jpg", alt: "Duas mulheres sorrindo, abraçadas a cadernos da Purpose Paper" },
          { id: "estrategia", tipo: "texto", nome: "estratégia de marca e identidade verbal", fundo: "salvia", proporcao: 1.6,
            x: 0.5, y: 1.5, largura: 0.46, giro: -1, camada: 12,
            meta: ["estratégia de marca e identidade verbal", "folha 06"], titulo: "Estratégia de marca e identidade verbal",
            colunas: [
              ["O desafio deste projeto foi identificar e traduzir a voz real da Purpose Paper: uma marca que já falava com seu público há seis anos, mas carecia de identidade verbal sólida, narrativa estratégica e consistência nos pontos de contato."],
              ["A Purpose Paper vivia um momento de crescimento: de catálogo, presença digital, parcerias e equipe. A comunicação, no entanto, ainda refletia o estágio inicial da marca. Era hora de evoluir e assumir sua posição como uma editora sólida, com autoridade e autenticidade."],
            ] },
          { id: "pilares", tipo: "formulario", nome: "pilares do tom de voz", fundo: "pagina", proporcao: 1.12,
            x: 0.52, y: 1.84, largura: 0.42, giro: -1, camada: 13,
            titulo: "Pilares do tom de voz", subtitulo: "Purpose Paper · identidade verbal", colunas: ["pilar", "como soa"],
            linhas: [
              ["Feminino", "Nossa voz fala de mulher para mulher, no feminino. Valorizamos a escuta, o cuidado nos detalhes e a conexão que nasce da empatia."],
              ["Gentil", "Escolhemos palavras que acolhem. Mesmo ao ensinar ou corrigir, nossa fala é respeitosa e amável — como quem fala com uma amiga querida."],
              ["Maduro", "Não falamos por impulso. Trazemos reflexões bem pensadas, conselhos sábios e uma fé que é provada no cotidiano. Nossa maturidade dá firmeza à nossa voz."],
              ["Prático", "Nos comprometemos a traduzir a teoria para a prática. Por isso, nossa comunicação é fácil de entender, aplicável e voltada para a vida real."],
            ],
            rodape: ["folha 07", "uso interno · brandbook"] },
          { id: "fr-rotina", tipo: "frase", nome: "frase: rotina cheia de sentido", fundo: "amarelo", proporcao: 1.5, tamanho: 5.9,
            x: 0.14, y: 2.22, largura: 0.3, giro: 2, camada: 14,
            meta: ["copywriting", "folha 08"], texto: "A rotina pode ser cheia de tarefas, mas também pode ser cheia de sentido." },
          // ---------- aplicações ----------
          { id: "planner", tipo: "foto", nome: "The Purpose Planner", src: "assets/img/purpose-paper/planner.jpg", alt: "The Purpose Planner: um planner para quem sabe que toda a vida é espiritual",
            espaco: 1.778, x: 0.5, y: 2.27, largura: 0.46, giro: 1.2, camada: 16 },
          { id: "fr-agora", tipo: "frase", quadrada: true, nome: "frase: hábitos com Propósito", fundo: "rosinha", proporcao: 1, tamanho: 10,
            x: 0.47, y: 2.56, largura: 0.17, giro: 4, camada: 17,
            texto: "Seus hábitos com Propósito começam agora" },
          { id: "fr-hora", tipo: "frase", nome: "frase: planejar e realizar", fundo: "amarelo", proporcao: 1.3, tamanho: 8.4,
            x: 0.68, y: 2.58, largura: 0.22, giro: -3, camada: 17,
            meta: ["copywriting", "folha 09"], texto: "É hora de planejar e realizar!" },
          { id: "ps-dia", tipo: "passo", retrato: true, nome: "dia a dia, página a página", fundo: "salvia", proporcao: 1.3,
            x: 0.03, y: 2.48, largura: 0.42, giro: -1.2, camada: 18,
            olho: "copywriting", titulo: "assinatura", texto: "Dia a dia.<br>Página a página.",
            foto: "assets/img/purpose-paper/perfil.jpg", alt: "Mulher segurando um caderno lilás da Purpose Paper" },
          { id: "cartazes", tipo: "foto", nome: "cartazes", src: "assets/img/purpose-paper/cartazes.jpg", alt: "Cartazes da campanha da Purpose Paper na rua",
            espaco: 1.778, x: 0.5, y: 2.82, largura: 0.47, giro: -1.2, camada: 19 },
          { id: "loja", tipo: "foto", nome: "site: página Como tudo começou", src: "assets/img/purpose-paper/site.jpg", alt: "Página Como tudo começou do site da Purpose Paper",
            espaco: 1.778, x: 0.04, y: 2.88, largura: 0.43, giro: 1, camada: 20 },
          // ---------- fechamento ----------
          { id: "entrega", tipo: "lista", nome: "entrega", fundo: "rosa", proporcao: 1,
            x: 0.56, y: 3.14, largura: 0.26, giro: -2.5, camada: 21,
            titulo: "Entrega",
            itens: ["Estratégia e plataforma de marca", "Manifesto", "Tagline principal", "Redação para embalagens", "Redação para canais da marca", "Redação para comunidade", "Diretrizes de redação", "Manual de marca", "Treinamento com equipe"] },
          { id: "creditos", tipo: "creditos", nome: "créditos", fundo: "pagina", proporcao: 2.2,
            x: 0.1, y: 3.2, largura: 0.3, giro: 1, camada: 22,
            meta: ["créditos", "folha 10"],
            pares: [["Projeto desenvolvido por", "SALN Studio"]] },
        ],
      },
    },
    {
      id: "fifi",
      titulo: "Fifi",
      resumo: "naming e identidade verbal para marca de underwear",
      capa: "assets/img/fifi/capa-grade.jpg",
      mesa: {
        ficha: [
          ["cliente", "projeto pessoal"],
          ["trabalho", "estratégia de marca, naming e identidade verbal"],
          ["entrega", "apresentação de marca"],
        ],
        abertura: { src: "assets/img/fifi/abertura.jpg", alt: "Logo da Fifi sobre a foto de uma modelo de tranças, de costas" },
        // a marca escreve em minúsculas: as frases de copywriting ficam assim mesmo
        folhas: [
          // ---------- apresentação ----------
          { id: "lide", tipo: "lide", nome: "apresentação", fundo: "pagina", proporcao: 1.6, tamanho: 6.4,
            x: 0.03, y: 0.02, largura: 0.4, giro: 1.5, camada: 2,
            meta: ["fifi · underwear básico", "folha 01"], selos: "FI03",
            texto: "Fifi é uma marca de underwear básico pensada para o dia a dia real das mulheres." },
          { id: "gaze", tipo: "frase", nome: "frase: underwear no female gaze", fundo: "azul", proporcao: 1.45, tamanho: 9.6,
            x: 0.445, y: 0, largura: 0.28, giro: -2.5, camada: 6,
            meta: ["copywriting", "fifi"], texto: "underwear no female gaze" },
          { id: "criando", tipo: "texto", nome: "criando do zero", fundo: "rosinha", proporcao: 1.25, corpo: 3.05,
            x: 0.03, y: 0.32, largura: 0.44, giro: -1, camada: 4,
            meta: ["origem da marca", "folha 02"], titulo: "Criando do zero",
            texto: [
              "Vamos pensar lingerie sem cair no clichê da lingerie sensual e performática? Não é a lingerie sexy que acompanha as mulheres nos melhores e piores momentos, enquanto crescem e amadurecem no decorrer dos anos. É a calcinha — aquela básica, normalzinha.",
              "É ela que está com as mulheres enquanto elas veem um filme largadas no sofá, vão a uma consulta, correm atrás do ônibus ou passam pelo período menstrual. <b>E essa intimidade tem nome: amizade.</b>",
            ] },
          { id: "cacheada", tipo: "foto", nome: "modelo de cabelo cacheado", src: "assets/img/fifi/cacheada.jpg", alt: "Mulher de cabelo cacheado sorrindo, de regata branca e calcinha rosa e laranja",
            espaco: 1.833, x: 0.53, y: 0.172, largura: 0.46, giro: 1.5, camada: 5 },
          { id: "amiga", tipo: "frase", nome: "conceito: alma de melhor amiga", fundo: "amarelo", proporcao: 1.5, tamanho: 6.6,
            x: 0.55, y: 0.55, largura: 0.36, giro: -2, camada: 6,
            meta: ["conceito", "folha 03"], texto: "Se tem uma peça de roupa com alma e jeito de melhor amiga, é a calcinha." },
          // ---------- naming ----------
          { id: "naming", tipo: "naming", nome: "naming", fundo: "lilas", proporcao: 1.3,
            x: 0.04, y: 0.76, largura: 0.46, giro: 1.2, camada: 7,
            meta: ["naming", "folha 04"], texto: "Fifi",
            legenda: "Curto, memorável e com camadas de sentido. A repetição traz um quê de familiaridade, intimidade e carinho — poderia ser o apelido de uma amiga querida. Em alguns contextos, fifi também é um sinônimo para aquela fofoca despretensiosa e sem maldade que acontece em todo grupo de amigas(os) fiéis, onde se compartilha segredos e não é preciso fingir. Com essa escolha, a marca se torna próxima, quase personificada." },
          { id: "fr-confiavel", tipo: "frase", quadrada: true, nome: "frase: confiável, divertida, de boas", fundo: "rosa", proporcao: 1, tamanho: 11,
            x: 0.515, y: 0.88, largura: 0.16, giro: 4, camada: 8,
            texto: "confiável, divertida, de boas." },
          { id: "ps-suporte", tipo: "foto-texto", nome: "sua calcinha de suporte emocional", fundo: "pagina", proporcao: 1.12, tamanho: 7.4,
            x: 0.69, y: 0.83, largura: 0.3, giro: -1.5, camada: 9,
            foto: "assets/img/fifi/costas.jpg", alt: "Mulher de tranças, de costas, olhando por cima do ombro, de regata rosa e calcinha azul",
            meta: ["copywriting", "fifi"], texto: "sua calcinha de suporte emocional" },
          // ---------- tom de voz ----------
          { id: "tom", tipo: "texto", nome: "tom de voz", fundo: "salvia", proporcao: 1.5,
            x: 0.03, y: 1.16, largura: 0.5, giro: -1, camada: 10,
            meta: ["tom de voz", "folha 05"],
            colunas: [
              [{ destaque: "direta ao ponto sem ser seca,<br>divertida sem forçar a barra", tamanho: 5.4, embaixo: true }],
              [
                "Seu tom de voz é um equilíbrio entre o carinho e a irreverência. Uma voz direta ao ponto sem ser seca, divertida sem forçar a barra. Fifi acolhe, encoraja e faz rir com sua acidez na medida.",
                "Nada de floreios, eufemismos ou palavras “fantasiadas”. Aqui, calcinha é calcinha. <b>E às vezes é tudo que a gente precisa.</b>",
              ],
            ] },
          { id: "fr-svezes", tipo: "frase", nome: "frase: só quer uma calcinha", fundo: "amarelo", proporcao: 1.3, tamanho: 8.4,
            x: 0.58, y: 1.12, largura: 0.3, giro: 2, camada: 11,
            meta: ["copywriting", "folha 06"], texto: "às vezes a gente só quer uma calcinha :)" },
          { id: "minusculas", tipo: "janela", nome: "minúsculas e emojis", fundo: "pagina", proporcao: 1.5,
            x: 0.56, y: 1.38, largura: 0.4, giro: -1.2, camada: 12,
            barra: "fifi diz:", meta: ["identidade verbal", "folha 07"],
            texto: "Fifi escreve em minúsculas e usa emojis (coisas de quem é íntima) e até resgata certa nostalgia da forma como nos comunicávamos “no início da internet” (em comunidades, blogs, depoimentos e apps de mensagens)." },
          { id: "ps-lingerie", tipo: "foto-texto", nome: "lingerie não, calcinha ;)", fundo: "rosinha", proporcao: 1.12, tamanho: 8,
            x: 0.08, y: 1.53, largura: 0.34, giro: 1.5, camada: 13,
            foto: "assets/img/fifi/cores.jpg", alt: "Calcinhas básicas coloridas sobre fundo azul, uma delas segurada por uma mão",
            meta: ["copywriting", "fifi"], texto: "lingerie não, calcinha ;)" },
          // ---------- copywriting ----------
          { id: "fr-casamento", tipo: "frase", nome: "frase: pro casamento da sua irmã", fundo: "pagina", proporcao: 1.4, tamanho: 5.6,
            x: 0.5, y: 1.7, largura: 0.36, giro: 1.5, camada: 14,
            meta: ["copywriting", "folha 08"], texto: "pro casamento da sua irmã, todas as suas tpms, todos os esportes que você começa e pra fazer nada no sofá." },
          { id: "ps-bem", tipo: "passo", retrato: true, nome: "pra você se sentir bem (não eles)", fundo: "rosa", proporcao: 1.3, tamanho: 6.4,
            x: 0.04, y: 1.92, largura: 0.44, giro: -1.2, camada: 15,
            olho: "copywriting", titulo: "female gaze", texto: "pra você se sentir bem (não eles)",
            foto: "assets/img/fifi/madura.jpg", posicao: "49% 30%", alt: "Mulher madura rindo, de regata laranja e calcinha rosa de cintura alta" },
          { id: "fr-intimidade", tipo: "frase", quadrada: true, nome: "frase: só vou se você for", fundo: "rosinha", proporcao: 1, tamanho: 10,
            x: 0.52, y: 2, largura: 0.19, giro: -3.5, camada: 16,
            texto: "intimidade é: só vou se você for" },
          { id: "fr-tirar", tipo: "frase", nome: "frase: ninguém tirar", fundo: "azul", proporcao: 1.2, tamanho: 8,
            x: 0.72, y: 2.09, largura: 0.23, giro: 2.5, camada: 21,
            meta: ["copywriting", "folha 09"], texto: "essa não é pra ninguém tirar, mas se quiser pode!" },
          { id: "neutros", tipo: "foto", nome: "calcinhas em tons neutros", src: "assets/img/fifi/neutros.jpg", alt: "Calcinhas básicas em tons de nude, marrom e verde-oliva sobre fundo rosa",
            espaco: 1.5, x: 0.5, y: 2.25, largura: 0.42, giro: 1.2, camada: 18 },
          { id: "sem", tipo: "frase", quadrada: true, nome: "frase: sem cerimônia", fundo: "lilas", proporcao: 1, tamanho: 10.5,
            x: 0.1, y: 2.32, largura: 0.28, giro: -2, camada: 19,
            texto: "sem cerimônia.<br>sem desconforto.<br>sem fantasia." },
          // ---------- fechamento ----------
          { id: "creditos", tipo: "creditos", nome: "créditos", fundo: "pagina", proporcao: 2.2,
            x: 0.5, y: 2.58, largura: 0.38, giro: 1, camada: 20,
            meta: ["créditos", "folha 11"],
            texto: "Exercício de identidade verbal realizado por Alana Lins no curso <em>Desenhando com Palavras</em>, ministrado por Fernando Andreazi, na Aprender Design." },
        ],
      },
    },
    {
      id: "oito-vidas-de-um-vestido",
      titulo: "Oito vidas de um vestido",
      resumo: "livro-reportagem sobre a história de uma peça de roupa",
      capa: "assets/img/oito-vidas/capa-grade.jpg",
      mesa: {
        ficha: [
          ["cliente", "projeto de conclusão do curso de jornalismo na Universidade Federal do Ceará"],
          ["ano", "2017"],
          ["trabalho", "pesquisa e pauta, entrevistas, fotografia, escrita e direcionamento do projeto gráfico"],
          ["entrega", "livro-reportagem impresso aprovado com nota máxima pela banca avaliadora"],
        ],
        abertura: { src: "assets/img/oito-vidas/capa.jpg", alt: "Capa do livro Oito vidas de um vestido, com a ilustração de mãos formando um vestido, sobre uma mesa de madeira", nome: "capa do livro" },
        folhas: [
          // ---------- apresentação ----------
          { id: "lide", tipo: "lide", nome: "apresentação", fundo: "pagina", proporcao: 1.1, tamanho: 3.55,
            x: 0.03, y: 0.02, largura: 0.46, giro: 1.2, camada: 2,
            meta: ["Oito vidas de um vestido · livro-reportagem", "folha 01"], selos: "OV04",
            texto: "Oito vidas de um vestido é um livro-reportagem que acompanha a trajetória de uma peça de roupa, da ideia ao uso, passando pelo cultivo da matéria-prima, pela modelagem e pela costura. Entre a literatura e o jornalismo, o próprio vestido narra as histórias de sete profissionais da indústria da moda no Ceará, que não se conhecem na vida real mas se tornam parte de um mesmo fio.",
            pe: "Intercalados à narrativa, textos de apuração com especialistas aprofundam temas como agrotóxicos, transparência na moda, trabalho infantil e poluição por tecidos sintéticos.",
            link: { texto: "Ver o livro completo", url: "https://online.fliphtml5.com/ejvpj/rebh/index.html#p=83" } },
          { id: "intro", tipo: "personalidade", fotoEmCima: true, aspas: true, nome: "introdução", fundo: "azul", proporcao: 1.14, colunas: "1.25fr 0.75fr", corpo: 2.36,
            x: 0.52, y: 0, largura: 0.46, giro: -1.8, camada: 3,
            meta: ["introdução", "folha 02"], texto: "Em 80 anos, ainda estarei aqui.",
            paragrafos: [
              "Se nada fora do normal acontecer, em 100, talvez. Das pessoas que toquei e abracei restarão memórias. E cheiros. Algumas deixam cheiros, que não saem nem com todos os banhos. Talvez você não sinta. Mas, quando vem uma brisa, mesmo que por uma pequena fresta, consigo respirar o aroma da lavanda, um tanto amadeirado, por poucos segundos. Depois, já foi.",
              "Penso que já não sou tão belo, mas, ainda assim, me olham com certa admiração, afeto, até. Será que o tempo faz isso? Valoriza a história em detrimento da beleza? Mas, aqui, já estamos no fim. <b>Voltemos para o começo.</b>",
            ],
            foto: "assets/img/oito-vidas/guarda-roupa.jpg", posicao: "50% 60%", alt: "Vestido pendurado num guarda-roupa" },
          { id: "personagens", tipo: "sumario", nome: "personagens", fundo: "amarelo", proporcao: 1.22,
            x: 0.05, y: 0.46, largura: 0.38, giro: -1.5, camada: 4,
            meta: ["personagens", "folha 03"],
            texto: "Isa, Eliane, Marcelo, Maurília, Gorete, Larissa e Ruth dão vida a sete dos oito capítulos. São eles:",
            itens: [
              ["01", "A alma", "Isa"], ["02", "O corpo", "Eliane"], ["03", "A trama", "Marcelo"], ["04", "O molde", "Maurília"],
              ["05", "A costura", "Gorete"], ["06", "O momento", "—"], ["07", "O adeus", "Larissa"], ["08", "O depois", "Ruth"],
            ] },
          // ---------- capítulos (texto entre aspas; tamanho da letra por capítulo) ----------
          { id: "isa", tipo: "passo", capitulo: true, aspas: true, nome: "capítulo 1 · Isa de Paula", fundo: "rosinha", proporcao: 1.45, tamanho: 2.75, colunas: "1.12fr 0.88fr",
            x: 0.5, y: 0.46, largura: 0.47, giro: 1.5, camada: 5,
            olho: "capítulo 1", titulo: "A alma: Isa de Paula", funcao: "designer de moda",
            foto: "assets/img/oito-vidas/isa.jpg", posicao: "47% 40%", alt: "Isa de Paula, designer de moda",
            texto: "Lembro-me de me dar conta de existir. Num átimo, simplesmente sabia. Não tinha outras memórias, mas a partir dali comecei a criá-las. Ainda não era possível me tocar; era apenas a minha alma, permitam-me chamar assim. Depois eu soube que existia porque alguém me criou. <b>Isa me criou.</b>" },
          { id: "livro-isa", tipo: "foto", nome: "livro: fim do capítulo de Isa", src: "assets/img/oito-vidas/livro-isa.jpg", alt: "Página do livro com o fim do capítulo de Isa",
            espaco: 1.504, x: 0.56, y: 0.83, largura: 0.37, giro: -2, camada: 6 },
          { id: "eliane", tipo: "passo", capitulo: true, aspas: true, fotoEsquerda: true, nome: "capítulo 2 · Eliane Ramos", fundo: "salvia", proporcao: 1.4, tamanho: 2.6, colunas: "0.88fr 1.12fr",
            x: 0.03, y: 0.84, largura: 0.47, giro: 1, camada: 7,
            olho: "capítulo 2", titulo: "O corpo: Eliane Ramos", funcao: "agricultora de algodão",
            foto: "assets/img/oito-vidas/eliane.jpg", posicao: "50% 30%", alt: "Eliane Ramos, agricultora de algodão",
            texto: "De longe, vejo se aproximar quem me plantou. Na primeira vez que vi Maria Eliane, eu ainda era uma sementinha pequena aninhada nas mãos dela, que são cheias de linhas, parecem caminhos da terra. Agora, na flor desabrochada, continuo pequeno, mas já estou pronto para ser, de novo, tocado pelas mãos dela." },
          { id: "marcelo", tipo: "passo", capitulo: true, aspas: true, nome: "capítulo 3 · Marcelo Sampaio", fundo: "pagina", proporcao: 1.4, tamanho: 2.6, colunas: "1.12fr 0.88fr",
            x: 0.53, y: 1.12, largura: 0.44, giro: -1.5, camada: 8,
            olho: "capítulo 3", titulo: "A trama: Marcelo Sampaio", funcao: "vendedor de tecidos",
            foto: "assets/img/oito-vidas/marcelo.jpg", posicao: "50% 35%", alt: "Marcelo Sampaio, vendedor de tecidos",
            texto: "Começo a constatar que Marcelo tem uma casca dura, mas, no fundo, não é tão severo assim. Escuto todos chamarem por ele. ‘Marcelo, ei, Marcelo’. Ouço risadas, algumas contidas, outras extravagantes. Marcelo é o mais velho, mas entre os colegas vira menino." },
          { id: "maurilia", tipo: "passo", capitulo: true, aspas: true, fotoEsquerda: true, nome: "capítulo 4 · Maurília de Sousa", fundo: "amarelo", proporcao: 1.12, tamanho: 2.4, colunas: "0.88fr 1.12fr",
            x: 0.03, y: 1.23, largura: 0.47, giro: -1, camada: 9,
            olho: "capítulo 4", titulo: "O molde: Maurília de Sousa", funcao: "modelista",
            foto: "assets/img/oito-vidas/maurilia.jpg", posicao: "72% 45%", alt: "Maurília de Sousa, modelista, desenhando um molde",
            texto: "Enquanto Maurília fala, ela rabisca. Dali a pouco, o rabisco vira um esboço. E o esboço vira um desenho. Acostumou-se tanto a riscar o papel madeira, que virou até passatempo. Mas quando começam a fazer uma modelagem, as mãos rápidas de quem já fez centenas delas nem se demoram. Quando menos espero, chega minha vez. Maurília me examina, desenrola mais papel do grande rolo sobre a mesa e começa os rituais de medição. Vira dali, prende com os clipes aqui, risca, corta. Depois de alguns minutos, meu esqueleto está pronto. Milimetricamente pensado. Maurília me deu forma em alguns instantes." },
          { id: "gorete", tipo: "passo", capitulo: true, aspas: true, nome: "capítulo 5 · Gorete Santos", fundo: "lilas", proporcao: 1.2, tamanho: 2.5, colunas: "1.12fr 0.88fr",
            x: 0.52, y: 1.48, largura: 0.46, giro: 1.3, camada: 10,
            olho: "capítulo 5", titulo: "A costura: Gorete Santos", funcao: "costureira",
            foto: "assets/img/oito-vidas/gorete.jpg", posicao: "70% 45%", alt: "Gorete Santos, costureira, na máquina de costura",
            texto: "Espero, e torço com todas as minhas fibras, que dona Gorete jamais se sinta só. Mesmo com a casa vazia na maior parte do tempo. Mesmo com a companhia apenas das máquinas e da televisão durante a semana. Espero que ela perceba a si mesma como uma peça de fé, resiliência e gentileza que a vida está costurando. O melhor de tudo é que a costura ainda não acabou. O pé ainda está no pedal, o barulho veloz ainda não cessou e a agulha ainda transpassa o fio." },
          { id: "livro-gorete", tipo: "foto", nome: "livro: páginas 124 e 125", src: "assets/img/oito-vidas/livro-gorete.jpg", alt: "Livro aberto nas páginas 124 e 125, do capítulo de Gorete",
            espaco: 1.54, x: 0.04, y: 1.69, largura: 0.44, giro: 1.5, camada: 11 },
          { id: "livro-costura", tipo: "foto", nome: "livro: abertura de A costura", src: "assets/img/oito-vidas/livro-costura.jpg", alt: "Livro aberto na abertura do capítulo A costura",
            espaco: 1.563, x: 0.55, y: 1.91, largura: 0.38, giro: -1.8, camada: 12 },
          { id: "momento", tipo: "fio", nome: "capítulo 6 · O momento", fundo: "pagina", proporcao: 3.3,
            x: 0.05, y: 2.22, largura: 0.9, giro: -0.6, camada: 13,
            meta: ["capítulo 6", "folha 09"], titulo: "O momento",
            texto: "Este é um capítulo diferente, sem texto, apenas com um fio que atravessa as páginas. O leitor é convidado a imaginar que o vestido criado enfim ganhou um corpo para vestir e seguiu para viver suas aventuras. Por não ser nenhuma peça de roupa específica, e sim uma representação, o vestido pode ser qualquer um, de qualquer pessoa." },
          { id: "larissa", tipo: "passo", capitulo: true, aspas: true, fotoEsquerda: true, nome: "capítulo 7 · Larissa Barbosa", fundo: "rosa", proporcao: 1.2, tamanho: 2.32, colunas: "0.88fr 1.12fr",
            x: 0.03, y: 2.56, largura: 0.47, giro: 1.2, camada: 14,
            olho: "capítulo 7", titulo: "O adeus: Larissa Barbosa", funcao: "idealizadora do Brechó 55, em Fortaleza",
            foto: "assets/img/oito-vidas/larissa.jpg", posicao: "24% 40%", alt: "Larissa Barbosa, idealizadora do Brechó 55",
            texto: "Mas eu preciso dizer, Larissa me deu um lar, mesmo pequeno. Me dá esperança de voltar a vestir e ser o que fui feito para ser. Me dá senso de valor, e não falo apenas do dinheiro. Até porque, repito, dele entendo pouco. Falo do sentir, do viver, do criar algo novo com algo que novo já não é. Às 17h de todas as quintas, sextas e sábados, quando a música começa a tocar e os portões do Quintal se abrem, eu sei que há mais vida entrando aqui." },
          { id: "livro-brecho", tipo: "foto", nome: "livro: Brechó 55", src: "assets/img/oito-vidas/livro-brecho.jpg", alt: "Livro aberto na página com a foto do Brechó 55",
            espaco: 1.504, x: 0.07, y: 2.99, largura: 0.37, giro: -1.5, camada: 15 },
          { id: "ruth", tipo: "passo", capitulo: true, aspas: true, nome: "capítulo 8 · Ruth Andrade", fundo: "salvia", proporcao: 1.12, tamanho: 2.22, colunas: "1.12fr 0.88fr",
            x: 0.52, y: 2.58, largura: 0.46, giro: -1.2, camada: 16,
            olho: "capítulo 8", titulo: "O depois: Ruth Andrade", funcao: "a segunda dona do vestido",
            foto: "assets/img/oito-vidas/ruth.jpg", posicao: "64% 40%", alt: "Ruth Andrade, a segunda dona do vestido",
            texto: "A personalidade camaleoa de Ruth, é claro, não se manifesta apenas nos cabelos. Seu guarda-roupas é um caleidoscópio, capaz de desequilibrar os desavisados. É um espetáculo. Assim como a pessoa que as veste. Ruth é circense, sim, teatral. Provavelmente, as aulas de teatro que frequenta a ajudam a descobrir mais camadas de si mesma. O jeito de se vestir é uma das formas de revelá-las e, assim como um artista num tecido acrobático — modalidade, aliás, que Ruth pratica — para ela, o vestir é um constante movimento. Há dias de bege, dias de estampas escandalosas, dias de coturno preto. Seria impossível, portanto, ser uma Ruth só." },
          // ---------- fechamento ----------
          { id: "fim", tipo: "frase", nome: "fechamento", fundo: "azul", proporcao: 1.55, tamanho: 6.6,
            x: 0.53, y: 3.06, largura: 0.42, giro: 1.5, camada: 17,
            meta: ["fechamento", "folha 12"], texto: "Esse texto é sobre um vestido.<br>Esse vestido é um texto.",
            links: [{ texto: "Ver o livro completo", url: "https://online.fliphtml5.com/ejvpj/rebh/index.html#p=83" }, { proximo: true }] },
        ],
      },
    },
  ],

  /* ---------- Seção Sobre mim ---------- */
  sobre: {
    // abre como uma folha por cima da página, pelo link "sobre" do menu
    titulo: "Alana, Lana, Laninha",
    foto: "assets/img/alana.jpg", // foto vertical
    texto: [
      "Minha mãe me deu um nome fácil de aprender a escrever. Acho que com o tempo que sobrou, tomei gosto pelo restante do alfabeto.",
      "Ainda bem, porque toda boa ideia começa com as palavras. Por isso é preciso saber dançar, brincar e criar com elas, e esse é o meu trabalho.",
      "Sou nascida e criada na terra da luz, jornalista, redatora de marketing/branding e escritora por natureza.",
    ],
    // ícone: "instagram" ou "substack"
    redes: [
      { nome: "instagram", url: "https://www.instagram.com/eualanalins/", rotulo: "Instagram (@eualanalins)" },
      { nome: "substack", url: "https://bonecafalante.substack.com/", rotulo: "Substack (Boneca Falante)" },
    ],
  },


  /* ---------- Seção O que eu faço ---------- */
  /* ---------- Seção Sopa de letrinhas (o que eu faço) ----------
     Os nomes flutuam pela tela; ao clicar, aparece a descrição. */
  servicos: {
    titulo: "Sopa de letrinhas",
    // peso: de 200 (fininho) a 800 (bem grosso); no hover todos vão a 800
    lista: [
      {
        nome: "estratégia de marca",
        peso: 300,
        descricao: "Antes do texto, o porquê. Diagnóstico, posicionamento e a narrativa que sustenta tudo o que a marca diz.",
      },
      {
        nome: "identidade verbal",
        peso: 600,
        descricao: "Tom de voz, vocabulário e boas práticas de escrita: o jeito de a marca se comunicar, em qualquer canal.",
      },
      {
        nome: "naming",
        peso: 400,
        descricao: "Nomes fáceis de dizer, difíceis de esquecer e que já carregam um pedaço da história da marca.",
      },
      {
        nome: "planejamento de conteúdo",
        peso: 200,
        descricao: "Linhas editoriais, pautas e calendário para a marca ter sempre o que dizer — e dizer com constância.",
      },
      {
        nome: "redação criativa",
        peso: 500,
        descricao: "Campanhas, roteiros, conteúdos para as redes e textos institucionais que dão vontade de ler até o fim.",
      },
      {
        nome: "copywriting",
        peso: 700,
        descricao: "Sites, e-mails, anúncios e lançamentos: palavras que convencem sem empurrar.",
      },
    ],
  },


  /* ---------- Seção Contato ---------- */
  contato: {
    titulo: "Vamos colaborar?",
    email: "contatosalnstudio@gmail.com", // as mensagens do formulário vão para este e-mail
    // Opcional: para o formulário enviar sem abrir o programa de e-mail,
    // crie um formulário grátis em https://formspree.io e cole o link aqui
    // (ex.: "https://formspree.io/f/abcdwxyz"). Vazio = abre o e-mail da pessoa.
    formspree: "",
    redes: [
      // { nome: "instagram", url: "https://instagram.com/seuperfil" },
      // { nome: "linkedin", url: "https://linkedin.com/in/seuperfil" },
    ],
  },
};
