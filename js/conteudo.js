/* =====================================================================
   CONTEÚDO DO SITE — este é o único arquivo que você precisa editar.

   • Letras entre colchetes viram a letra pixelada (fonte Retrogression):
     "AL[A]NA LINS"  →  a letra entre colchetes fica pixelada.
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
         texto corrido em uma coluna, alinhado à esquerda na largura toda,
         com capitular pixelada na primeira letra (use sempre para texto corrido;
         a capitular só aparece se o primeiro parágrafo tiver 3 linhas ou mais)
     { tipo: "texto", alinhamento: "centro", texto: ["..."] }
         uma coluna centralizada, sem capitular
     { tipo: "texto", colunas: 2, texto: ["..."] }
         duas colunas (uma no celular), com capitular — só para listas
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

   Projetos sem "blocos" usam o modelo simples: banner + "texto".
   ===================================================================== */

const SITE = {
  /* ---------- Menu ---------- */
  lojaUrl: "#", // troque pelo link da sua loja, ex.: "https://minhaloja.com"

  /* ---------- Header 1, 2 e 3 ---------- */
  abertura: {
    frase: "TUDO COMEÇA<br>COM A [E]SCRITA", // <br> = quebra de linha
    nome: "AL[A]NA LINS",
    descricao: "jornalista, estrategista e redatora",
  },

  /* ---------- Seção Projetos ---------- */
  secaoProjetos: {
    titulo: "DEI A LET[R]A",
    descricao: "projetos de estratégia, verbal e conteúdo",
  },

  projetos: [
    {
      id: "purpose-paper",
      titulo: "PURPOSE PAPER",
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
    {
      id: "cieli",
      titulo: "CIELI",
      resumo: "copywriting e redação criativa para agência de viagens de luxo",
      capa: "assets/img/placeholder-capa-horizontal.jpg", // imagem horizontal, 3:2 (grade de projetos)
      banner: "assets/img/placeholder-banner.jpg", // imagem larga (topo da página do projeto)
      texto: [
        "Lorem ipsum dolor sit amet consectetur. Interdum tincidunt elit ut non phasellus. Consequat est diam fermentum aliquam amet nibh. Maecenas porttitor morbi nunc sit risus. Morbi id morbi leo urna id pharetra. Blandit ut est non cras lectus viverra tellus elementum. Mauris nunc bibendum senectus blandit eu lorem. Molestie tortor dui at nisl malesuada commodo viverra. Lacus ornare dictum faucibus sed sit vitae in.",
        "Quis ultricies et mi diam ac. Odio tellus pulvinar neque bibendum senectus pellentesque nisl proin. Ullamcorper laoreet tincidunt vel urna sit diam nibh vitae. Ut tristique nisi orci adipiscing dictumst faucibus elementum. Posuere potenti id curabitur sem. Neque augue non non aenean euismod adipiscing mollis rhoncus blandit. Aenean id auctor fermentum nibh sed consectetur cursus. Vitae venenatis scelerisque sed quis fames nisl. Mauris duis sit cursus sed pellentesque enim faucibus elit. Posuere id odio sed orci hendrerit neque sed et tincidunt. Vestibulum ultricies nibh quis id arcu amet montes sodales. Nisl ac erat amet nulla sed. Convallis ridiculus vel maecenas pulvinar sit nunc.",
        "Vel at nullam urna felis gravida erat porta. Leo vitae nibh mauris felis sed pretium. Ornare tristique feugiat a diam erat. In.",
      ],
      galeria: [], // opcional: ["assets/img/cieli-1.jpg", "assets/img/cieli-2.jpg"]
    },
    {
      id: "j-simoes",
      titulo: "J. SIMÕES",
      resumo: "produção de conteúdo para lançamento comercial",
      capa: "assets/img/placeholder-capa-horizontal.jpg",
      banner: "assets/img/placeholder-banner.jpg",
      texto: [
        "Lorem ipsum dolor sit amet consectetur. Interdum tincidunt elit ut non phasellus. Consequat est diam fermentum aliquam amet nibh. Maecenas porttitor morbi nunc sit risus. Morbi id morbi leo urna id pharetra. Blandit ut est non cras lectus viverra tellus elementum. Mauris nunc bibendum senectus blandit eu lorem.",
        "Quis ultricies et mi diam ac. Odio tellus pulvinar neque bibendum senectus pellentesque nisl proin. Ullamcorper laoreet tincidunt vel urna sit diam nibh vitae. Ut tristique nisi orci adipiscing dictumst faucibus elementum. Posuere potenti id curabitur sem. Neque augue non non aenean euismod adipiscing mollis rhoncus blandit.",
        "Vel at nullam urna felis gravida erat porta. Leo vitae nibh mauris felis sed pretium. Ornare tristique feugiat a diam erat. In.",
      ],
      galeria: [],
    },
  ],

  /* ---------- Seção Sobre mim ---------- */
  sobre: {
    titulo: "ALANA, LANA, LANIN[H]A",
    foto: "assets/img/placeholder-sobre.jpg", // imagem vertical ao lado do texto
    texto: [
      "Lorem ipsum dolor sit amet consectetur. Interdum tincidunt elit ut non phasellus. Consequat est diam fermentum aliquam amet nibh. Maecenas porttitor morbi nunc sit risus. Morbi id morbi leo urna id pharetra. Blandit ut est non cras lectus viverra tellus elementum. Mauris nunc bibendum senectus blandit eu lorem. Molestie tortor dui at nisl malesuada commodo viverra. Lacus ornare dictum faucibus sed sit vitae in.",
      "Quis ultricies et mi diam ac. Odio tellus pulvinar neque bibendum senectus pellentesque nisl proin. Ullamcorper laoreet tincidunt vel urna sit diam nibh vitae. Ut tristique nisi orci adipiscing dictumst faucibus elementum. Posuere potenti id curabitur sem. Neque augue non non aenean euismod adipiscing mollis.",
    ],
  },

  /* ---------- Seção O que eu faço ---------- */
  servicos: {
    titulo: "SOPA DE L[E]TRINHAS",
    lista: [
      "estratégia de marca",
      "identidade verbal",
      "planejamento de conteúdo",
      "redação criativa",
      "copywriting",
      "sopa de letrinhas",
    ],
  },

  /* ---------- Seção Contato ---------- */
  contato: {
    titulo: "VAMOS COLAB[O]RAR?",
    email: "seuemail@exemplo.com", // troque pelo seu e-mail — as mensagens do formulário vão para este e-mail
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
