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
      id: "cieli",
      titulo: "CIELI",
      resumo: "copywriting e redação criativa para agência de viagens de luxo",
      capa: "assets/img/placeholder-capa.jpg", // imagem vertical (grade de projetos)
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
      capa: "assets/img/placeholder-capa.jpg",
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
    titulo: "[A]LANA, [L]ANA, [L]ANINHA",
    texto: [
      "Lorem ipsum dolor sit amet consectetur. Interdum tincidunt elit ut non phasellus. Consequat est diam fermentum aliquam amet nibh. Maecenas porttitor morbi nunc sit risus. Morbi id morbi leo urna id pharetra.",
      "Blandit ut est non cras lectus viverra tellus elementum. Mauris nunc bibendum senectus blandit eu lorem. Molestie tortor dui at nisl malesuada commodo viverra.",
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
