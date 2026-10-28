/* =====================================================================
   CONTEÚDO DO SITE — este é o único arquivo que você precisa editar.

   • Letras entre colchetes viram a letra pixelada (fonte Retrogression):
     "[A]LANA [L]INS"  →  a primeira letra de cada palavra fica pixelada.
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
         texto corrido em duas colunas (uma no celular); a 1ª letra do
         bloco vira capitular pixelada
     { tipo: "texto", colunas: 1, texto: ["..."] }
         o mesmo, em uma coluna só
     { tipo: "foto", src: "assets/img/...", legenda: "opcional" }
         foto de ponta a ponta da tela
     { tipo: "fotos", src: ["assets/img/a.jpg", "assets/img/b.jpg"] }
         duas fotos lado a lado
     { tipo: "foto-solta", src: "assets/img/...", lado: "direita" }
         foto menor, deslocada para um lado (lado = "esquerda" ou "direita");
         alternando os lados, as fotos ficam desencontradas pela página
     { tipo: "foto-texto", src: "assets/img/...", texto: ["..."], lado: "direita" }
         foto numa coluna e texto na outra (lado = onde fica a foto)
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
    nome: "[A]LANA [L]INS",
    descricao: "jornalista, estrategista e redatora",
  },

  /* ---------- Seção Projetos ---------- */
  secaoProjetos: {
    titulo: "DEI A LET[R]A",
    descricao: "projetos de estratégia, verbal e conteúdo",
  },

  projetos: [
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
          src: "assets/img/oito-vidas/miolo-gorete.jpg",
          lado: "esquerda",
          texto: [
            "Entre os personagens principais estão pessoas que conheço desde a infância, amigas de amigas e, ainda, gratas surpresas que a apuração me trouxe.",
            "Conversei a respeito do trabalho, dos hábitos e das memórias de cada pessoa em seu ambiente próprio. Nas entrevistas (que duravam aproximadamente duas horas e 30 minutos), enfrentei o desafio de ser três em uma: entrevistadora, fotógrafa e, quando o tempo ajudava, cinegrafista.",
            "A produção de todo o projeto levou aproximadamente 6 meses. O livro foi aprovado com nota máxima pela banca avaliadora.",
          ],
        },
        { tipo: "foto-solta", src: "assets/img/oito-vidas/abertura-capitulo.jpg", lado: "direita" },
        {
          tipo: "texto",
          texto: [
            "Isa, Eliane, Marcelo, Maurília, Gorete, Larissa e Ruth dão vida a sete dos oito capítulos. São eles: A alma; O corpo; A trama; O molde; A costura; O adeus e O depois.",
            "Eles não se conhecem na vida real, mas dentro da narrativa se tornam parte de um mesmo fio. O vestido que acompanhamos não é nenhum específico, por isso pode ser qualquer um — o meu, o seu, o de alguém que você conhece.",
            "De certo modo, o vestido também sou eu. Ouvindo a fala dos entrevistados, conhecendo suas rotinas, me apegando a suas particularidades e transformando essa experiência em escrita. Ao fim de tudo, a peça que se constrói são as palavras.",
          ],
        },
        { tipo: "foto-solta", src: "assets/img/oito-vidas/detalhe-agulha.jpg", lado: "esquerda" },
        { tipo: "destaque", texto: "Ao fim de tudo, a peça que se constrói são as palavras." },
        { tipo: "foto", src: "assets/img/oito-vidas/miolo-costura.jpg" },
        {
          tipo: "texto",
          colunas: 1,
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
      capa: "assets/img/placeholder-capa.png", // imagem vertical (grade de projetos)
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
      capa: "assets/img/placeholder-capa.png",
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
    titulo: "ALANA, LANA, LANINHA",
    foto: "assets/img/placeholder-sobre.jpg", // imagem vertical ao lado do texto
    texto: [
      "Lorem ipsum dolor sit amet consectetur. Interdum tincidunt elit ut non phasellus. Consequat est diam fermentum aliquam amet nibh. Maecenas porttitor morbi nunc sit risus. Morbi id morbi leo urna id pharetra. Blandit ut est non cras lectus viverra tellus elementum. Mauris nunc bibendum senectus blandit eu lorem. Molestie tortor dui at nisl malesuada commodo viverra. Lacus ornare dictum faucibus sed sit vitae in.",
      "Quis ultricies et mi diam ac. Odio tellus pulvinar neque bibendum senectus pellentesque nisl proin. Ullamcorper laoreet tincidunt vel urna sit diam nibh vitae. Ut tristique nisi orci adipiscing dictumst faucibus elementum. Posuere potenti id curabitur sem. Neque augue non non aenean euismod adipiscing mollis.",
    ],
  },

  /* ---------- Seção O que eu faço ---------- */
  servicos: {
    titulo: "O QUE [E]U FAÇO",
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
    titulo: "VAMOS [C]OLABORAR?",
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
