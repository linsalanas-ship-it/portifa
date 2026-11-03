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
         lide        texto (+ selos: "CI01")
         frase       texto, tamanho (opcional, em cqw); quadrada: true = post-it
         bilhete     titulo, itens (com clipe)
         tagline     texto, legenda
         manifesto   titulo, colunas: [[estrofes], [estrofes]], assinatura
                     (use <br> para quebrar linha e <em>...</em> para itálico)
         video-youtube  url do YouTube, titulo
         texto       titulo, texto: [parágrafos], colunas: 2 (opcional)
         formulario  titulo, subtitulo, colunas: ["a", "b"], linhas: [["...", "..."]], rodape
         tela        video, capa (1º quadro .jpg), link: { texto, url }
         passo       titulo (lugar), texto, foto, url (olho: "página de destino")
         lista       titulo, itens
         creditos    pares: [["rótulo", "valor"]] (o link do próximo projeto é automático)
         foto        src, alt
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
      subtitulo: "estratégia de marca e identidade verbal",
      blocos: [
        { tipo: "foto", src: "assets/img/purpose-paper/abertura.jpg", animacao: "assets/img/purpose-paper/abertura.mp4" },
        {
          tipo: "lide",
          texto: [
            "A Purpose Paper é uma papelaria e editora brasileira que ajuda mulheres a cultivar bons hábitos. Seus produtos — planners, journals, livros, cadernos e acessórios — são ferramentas úteis e belas que simplificam práticas essenciais para uma vida significativa integralmente, considerando relacionamentos, família, espiritualidade, vocação, trabalho e outras esferas.",
          ],
        },
        { tipo: "intertitulo", texto: "ESCUTA & DIAGNÓSTICO" },
        {
          tipo: "texto",
          texto: [
            "A primeira etapa foi de escuta ativa: conversas com a fundadora, equipe e clientes revelaram percepções, desejos e contradições sobre a marca. Essas trocas ajudaram a enriquecer o briefing e a delimitar o escopo real da entrega.",
            "A Purpose Paper vivia um momento de crescimento — de catálogo, presença digital, parcerias e equipe. A comunicação, no entanto, ainda refletia o estágio inicial da marca. Era hora de evoluir: deixar de parecer uma “lojinha fofa” e assumir sua posição como uma editora sólida, com autoridade e autenticidade.",
          ],
        },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/diagnostico.jpg" },
        {
          tipo: "itens",
          titulo: "Principais achados desse momento",
          itens: [
            { titulo: "Inconsistência de discurso", texto: "Embora existisse uma narrativa-base, ela se perdia nas comunicações do dia a dia. A marca se posicionava de formas diferentes a cada campanha, dificultando o reconhecimento e a construção de confiança." },
            { titulo: "Personalidade verbal em construção", texto: "Foi nesse momento que definimos, junto à cliente, qual seria o tom ideal — mantendo a delicadeza da marca, mas com mais clareza, maturidade e firmeza." },
            { titulo: "Mapeamento competitivo e diferencial", texto: "Identificamos concorrentes diretos e mapeamos como a Purpose Paper poderia ocupar um espaço próprio, valorizando seu caráter discipulador e seu cuidado estético." },
            { titulo: "Barreiras de uso e percepção de valor", texto: "Muitas clientes tinham “pena” de usar os produtos por serem bonitos demais. A nova identidade verbal precisava incentivar o uso intencional e cotidiano, mostrando que papel bonito também é ferramenta — e que papel guardado não transforma hábitos." },
          ],
        },
        { tipo: "intertitulo", texto: "NARRATIVA DA MARCA" },
        {
          tipo: "texto",
          texto: [
            "Ao mergulhar na essência da Purpose Paper, entendemos que sua origem era mais do que uma história para a aba “Quem somos” — era o coração da marca.",
            "Maeli, fundadora da empresa, criou a empresa antes de casar. O que começou como uma forma de financiar essa nova etapa da vida acabou se tornando um negócio: uma marca que ajudaria outras mulheres a também realizarem seus objetivos.",
            "Escolhemos trazer isso para o centro da marca: não apenas sonhar, desejar ou planejar, mas ir até o fim, realizar. O lugar onde isso acontece é o papel. É com papel (e no papel) que essas mulheres constroem a própria vida, página a página.",
          ],
        },
        {
          tipo: "texto",
          texto: [
            "A força dessa percepção orientou também os ajustes no logo (e nas demais expressões visuais). A estrela, que antes representava o Propósito, passou a simbolizar também uma folha de papel. O encontro entre ferramenta e Propósito, presente e futuro.",
          ],
        },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/simbolo.jpg" },
        { tipo: "destaque", texto: "É com papel (e no papel) que essas mulheres constroem a própria vida, página a página." },
        { tipo: "intertitulo", texto: "ESTRATÉGIA DE VOZ" },
        {
          tipo: "texto",
          texto: [
            "A Purpose Paper já era percebida como uma marca amiga: próxima, acolhedora e empática. Nosso trabalho foi aproveitar uma oportunidade na paisagem competitiva e reposicioná-la como uma amiga conselheira: alguém que dialoga com leveza, mas que também tem autoridade no assunto. Esse ajuste trouxe mais firmeza à comunicação, alinhando-se à história de pioneirismo e à robustez das entregas da marca.",
            "A nova identidade verbal oficializa essa postura já intuitiva: a de uma marca que orienta sem impor, que ensina com beleza e que inspira ação prática no dia a dia.",
          ],
        },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/personalidade.jpg" },
        {
          tipo: "itens",
          titulo: "Pilares do tom de voz",
          itens: [
            { titulo: "Feminino", texto: "Nossa voz fala de mulher para mulher, no feminino. Valorizamos a escuta, o cuidado nos detalhes e a conexão que nasce da empatia." },
            { titulo: "Gentil", texto: "Escolhemos palavras que acolhem. Mesmo ao ensinar ou corrigir, nossa fala é respeitosa e amável — como quem fala com uma amiga querida." },
            { titulo: "Maduro", texto: "Não falamos por impulso. Trazemos reflexões bem pensadas, conselhos sábios e uma fé que é provada no cotidiano. Nossa maturidade dá firmeza à nossa voz." },
            { titulo: "Prático", texto: "Nos comprometemos a traduzir a teoria para a prática. Por isso, nossa comunicação é fácil de entender, aplicável e voltada para a vida real." },
          ],
        },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/tom-de-voz.jpg" },
        { tipo: "intertitulo", texto: "TOM DE VOZ NA PRÁTICA" },
        {
          tipo: "texto",
          texto: [
            "Esses pilares se desdobram em diferentes tipos de linguagem prática, moldando a presença da marca nos pontos de contato.",
          ],
        },
        {
          tipo: "itens",
          itens: [
            {
              titulo: "Manifesto",
              texto: "O que defendemos com firmeza e anunciamos com beleza. Usado para expressar o coração da marca de forma poética e profunda, em apresentações institucionais e campanhas. Texto narrado no vídeo-manifesto pela fundadora da marca.",
            },
            {
              titulo: "Tagline principal",
              frases: ["Habitar no Propósito & Realizar com papel."],
              texto: "A síntese da marca. Presente em embalagens, redes sociais, site e abertura de produtos.",
            },
            {
              titulo: "Textos institucionais",
              texto: "Criados para materiais impressos e páginas institucionais do site, reforçando o posicionamento com mais objetividade.",
            },
            {
              titulo: "Chamadas à ação",
              frases: ["“Seus hábitos com Propósito começam agora.”", "“É hora de planejar e realizar!”", "“Dia a dia. Página a página.”"],
              texto: "Frases motivadoras que incentivam o uso intencional dos produtos. Aplicadas em campanhas, embalagens e canais digitais.",
            },
            {
              titulo: "Linguagem de comunidade",
              frases: ["“A história da Purpose é feita de muitas histórias.”", "“Em nossas mãos, o papel vira ferramenta.”", "“Clube das que planejam e realizam!”"],
              texto: "Frases que expressam pertencimento, afinidade e visão compartilhada.",
            },
            {
              titulo: "Palavras sagradas",
              palavras: ["Propósito", "Papel", "Ferramentas", "Hábitos", "Rotina", "Praticar", "Realizar"],
              texto: "Entre outras, essas são palavras que representam a essência da marca e são repetidas intencionalmente para reforçar posicionamento.",
            },
          ],
        },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/manifesto.jpg" },
        { tipo: "video", url: "https://youtu.be/Rbkx2lQS_wI" },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/frase-guia.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/outdoor.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/cartao.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/site.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/campanha-habitos.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/campanha-rotina.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/cartazes.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/purpose-paper/loja-planners.jpg" },
        {
          tipo: "texto",
          texto: [
            "O projeto foi concluído com a entrega de um brandbook detalhado e treinamentos práticos de expressão verbal e visual para o time interno. O objetivo era mais do que apresentar diretrizes: era garantir que cada pessoa envolvida com a Purpose Paper se sentisse parte da nova fase e soubesse como dar voz e forma ao Propósito da marca.",
          ],
        },
      ],
    },
    {
      id: "fifi",
      titulo: "FIFI",
      resumo: "naming e identidade verbal para marca de underwear",
      capa: "assets/img/fifi/capa-grade.jpg",
      subtitulo: "naming e identidade verbal",
      blocos: [
        { tipo: "foto", src: "assets/img/fifi/logo.jpg" },
        {
          tipo: "lide",
          texto: ["Fifi é uma marca de underwear básico pensada para o dia a dia real das mulheres."],
        },
        { tipo: "intertitulo", texto: "DESAFIO" },
        {
          tipo: "texto",
          texto: [
            "Criar naming e identidade verbal que fugissem do clichê da lingerie sensual e performática, ou da beleza associada ao bem-estar. A ideia era abrir espaço para falar da relação das mulheres com suas roupas íntimas, sobretudo as que realmente acompanham o dia a dia, sem olhares externos ou pressões estéticas.",
          ],
        },
        { tipo: "intertitulo", texto: "ESTRATÉGIA" },
        {
          tipo: "texto",
          texto: [
            "O ponto de partida foi pensar quais caminhos se abrem quando pensamos intimidade a partir do olhar feminino. A sensualidade ainda existe, mas não é a única associação possível.",
            "É preciso concordar que não é a lingerie sexy que acompanha as mulheres nos melhores e piores momentos, enquanto crescem e amadurecem no decorrer dos anos. Que tipo de intimidade se revela nessa peça de roupa que está com a gente quase o tempo todo de nossas vidas?",
            "Essa intimidade tem nome: amizade — mais especificamente, amizade feminina.",
            "Rir de si mesmas e dos perrengues. Ver um filme largadas no sofá. Acompanhar numa consulta. Ouvir as reclamações durante a TPM. Fazer nada juntas. Essas são as melhores amizades, as que não precisam ser impressionadas para permanecerem.",
            "E se tem uma peça de roupa com alma e jeito de melhor amiga, é a calcinha.",
          ],
        },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/territorios.jpg" },
        { tipo: "intertitulo", texto: "NAMING" },
        {
          tipo: "texto",
          texto: [
            "Fifi é curto, memorável e carrega camadas de sentido. A repetição traz um quê de familiaridade, intimidade, carinho — poderia facilmente ser o apelido de uma amiga querida.",
            "Em alguns contextos, fifi também é um sinônimo para aquela fofoca despretensiosa e sem maldade que acontece em todo grupo de amigas(os) fiéis, onde se compartilha segredos e não é preciso fingir.",
            "Com essa escolha, a marca se torna próxima, quase personificada. Fifi é a amiga confiável, divertida e de boas que toda mulher precisa ter.",
          ],
        },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/sem-cerimonia.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/confiavel.jpg" },
        { tipo: "intertitulo", texto: "IDENTIDADE VERBAL" },
        {
          tipo: "texto",
          texto: [
            "Se Fifi é como uma melhor amiga, ela precisa soar como uma. Por isso, ela escreve em minúsculas e usa emojis (coisas de quem é íntima) e até resgata certa nostalgia da forma como nos comunicávamos “no início da internet” — em comunidades, blogs, depoimentos e apps de mensagens.",
            "Seu tom de voz é um equilíbrio entre o carinho e a irreverência. Uma voz direto ao ponto sem ser seca, divertida sem forçar a barra. Fifi acolhe, encoraja e faz rir com sua acidez na medida.",
            "Nada de floreios, eufemismos ou palavras “fantasiadas”. Aqui, calcinha é calcinha. E às vezes é tudo que a gente precisa.",
          ],
        },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/melhor-amiga.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/suporte-emocional.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/so-vou-se-voce-for.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/female-gaze.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/lingerie-nao.jpg" },
        { tipo: "foto", largura: "wide", src: "assets/img/fifi/ninguem-tirar.jpg" },
        {
          tipo: "texto",
          texto: ["Exercício de identidade verbal realizado no curso Desenhando com Palavras, ministrado por Fernando Andreazi, na Aprender Design."],
        },
      ],
    },
    {
      id: "oito-vidas-de-um-vestido",
      titulo: "OITO VIDAS DE UM VESTIDO",
      resumo: "livro-reportagem sobre a história de uma peça de roupa",
      capa: "assets/img/oito-vidas/capa-grade.jpg",
      subtitulo: "livro-reportagem · trabalho de conclusão de curso em Jornalismo, UFC",
      blocos: [
        { tipo: "foto", src: "assets/img/oito-vidas/capa-livro.jpg" },
        {
          tipo: "lide",
          texto: [
            "O livro-reportagem Oito vidas de um vestido acompanha a história de uma peça de roupa desde a ideia, passando pelo nascimento da matéria-prima até o uso do vestido em que ela se torna.",
            "Nesse equilíbrio entre a literatura e o texto jornalístico, a própria peça de roupa é narradora das histórias de personagens que fazem parte da indústria da moda no Ceará. Este é um livro sobre trabalho, moda, sustentabilidade, criatividade e, sobretudo, pessoas.",
          ],
        },
        { tipo: "botao", texto: "folhear o livro", url: "https://online.fliphtml5.com/ejvpj/rebh/index.html" },
        {
          tipo: "fotos",
          src: ["assets/img/oito-vidas/abertura-capitulo.jpg", "assets/img/oito-vidas/detalhe-agulha.jpg"],
        },
        {
          tipo: "texto",
          texto: [
            "Em 2017, no último período da graduação em Jornalismo na Universidade Federal do Ceará, eu tinha certeza de que queria escrever um livro como trabalho de conclusão de curso. Saber se minha escrita teria fôlego para sustentar um longo texto era um desafio pessoal que eu gostaria de enfrentar.",
            "Na época, eu estava bastante apaixonada por livros, conteúdos e movimentos que tratavam sobre moda, criatividade e sustentabilidade. A ideia de escrever a história de uma peça de roupa surgiu durante uma das aulas de Projeto de TCC.",
            "A partir dessa ideia, precisei tomar decisões práticas para que o projeto acontecesse, pois eu seria responsável por toda a produção, sem equipe ou qualquer tipo de financiamento.",
            "Decidi abordar a pauta pela voz de profissionais que representassem etapas da cadeia produtiva da moda — como design, cultivo de matéria-prima, modelagem, costura, etc.",
            "Fiz toda a pesquisa, produção de pauta, roteiro para entrevistas, convites, entrevistas propriamente ditas, decupagem, escrita e direcionamento do projeto gráfico.",
          ],
        },
        {
          tipo: "foto-texto",
          src: "assets/img/oito-vidas/miolo-costura.jpg",
          lado: "esquerda",
          texto: [
            "Entre os personagens principais estão pessoas que conheço desde a infância, amigas de amigas e, ainda, gratas surpresas que a apuração me trouxe.",
            "Conversei a respeito do trabalho, dos hábitos e das memórias de cada pessoa em seu ambiente próprio. Nas entrevistas (que duravam aproximadamente duas horas e 30 minutos), enfrentei o desafio de ser três em uma: entrevistadora, fotógrafa e, quando o tempo ajudava, cinegrafista.",
            "A produção de todo o projeto levou aproximadamente 6 meses. O livro foi aprovado com nota máxima pela banca avaliadora.",
          ],
        },
        {
          tipo: "texto",
          texto: [
            "Isa, Eliane, Marcelo, Maurília, Gorete, Larissa e Ruth dão vida a sete dos oito capítulos. São eles: A alma; O corpo; A trama; O molde; A costura; O adeus e O depois.",
            "Eles não se conhecem na vida real, mas dentro da narrativa se tornam parte de um mesmo fio. O vestido que acompanhamos não é nenhum específico, por isso pode ser qualquer um — o meu, o seu, o de alguém que você conhece.",
            "De certo modo, o vestido também sou eu. Ouvindo a fala dos entrevistados, conhecendo suas rotinas, me apegando a suas particularidades e transformando essa experiência em escrita. Ao fim de tudo, a peça que se constrói são as palavras.",
          ],
        },
        { tipo: "destaque", texto: "Ao fim de tudo, a peça que se constrói são as palavras." },
        { tipo: "foto", src: "assets/img/oito-vidas/miolo-gorete.jpg" },
        {
          tipo: "texto",
          texto: [
            "Além da narração das histórias, há um segundo tipo de texto, destinado a compartilhar com o leitor as pesquisas simultâneas à escrita do livro. Eles tratam de temas como agrotóxicos, design, transparência na moda, trabalho infantil, poluição por tecidos sintéticos, entre outros assuntos, com entrevistas e opiniões de especialistas, aprofundando a reflexão.",
          ],
        },
        { tipo: "botao", texto: "folhear o livro", url: "https://online.fliphtml5.com/ejvpj/rebh/index.html" },
      ],
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
