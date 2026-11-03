/* Página de projeto em "mesa de folhas": as folhas do projeto (conteudo.js → mesa)
   ficam espalhadas sobre o papel cru e podem ser arrastadas; "reorganizar" volta
   ao arranjo inicial; fotos e vídeos abrem num visor com setas. No celular (e para
   quem pede menos movimento) as folhas viram uma pilha. Não é preciso editar este
   arquivo: o conteúdo fica todo no conteudo.js. */
(function () {
  "use strict";

  var raiz = document.getElementById("projeto");
  if (!raiz || typeof SITE === "undefined") return;
  var id = new URLSearchParams(location.search).get("p");
  var indice = -1;
  SITE.projetos.forEach(function (p, i) { if (p.id === id) indice = i; });
  var projeto = SITE.projetos[indice];
  if (!projeto || !projeto.mesa) return;

  var M = projeto.mesa;
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var html = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---------- utilidades de texto ----------
  function esc(t) {
    return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  // permite só <br>, <em> e </em>
  function fmt(t) {
    return esc(t).replace(/&lt;br\s*\/?&gt;/gi, "<br>").replace(/&lt;(\/?)em&gt;/gi, "<$1em>");
  }
  function puro(t) { return String(t == null ? "" : t).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
  function dois(n) { return (n < 10 ? "0" : "") + n; }
  function meta(m) {
    if (!m) return "";
    var esq = String(m[0] || ""), i = esq.indexOf(" · ");
    var e = i < 0 ? "<b>" + fmt(esq) + "</b>" : "<b>" + fmt(esq.slice(0, i)) + "</b> · " + fmt(esq.slice(i + 3));
    return '<p class="meta"><span>' + e + "</span><span>" + fmt(m[1] || "") + "</span></p>";
  }
  function link(texto, url, classe) {
    return '<a class="' + (classe || "passo__link") + '" href="' + esc(url) + '" target="_blank" rel="noopener"><span>' +
      fmt(texto) + '</span><span aria-hidden="true">↗</span></a>';
  }
  function idYoutube(url) {
    var m = String(url).match(/(?:youtu\.be\/|v=|embed\/)([\w-]{6,})/);
    return m ? m[1] : "";
  }
  function video(src, capa, rotulo) {
    return '<video data-video src="' + esc(src) + '"' + (capa ? ' poster="' + esc(capa) + '"' : "") +
      ' muted loop autoplay playsinline preload="metadata" aria-label="' + esc(rotulo) + '"></video>';
  }

  // ---------- cada tipo de folha ----------
  var proximo = SITE.projetos[(indice + 1) % SITE.projetos.length];
  var TIPOS = {
    lide: function (f) {
      return '<div class="pad">' + meta(f.meta) + '<p class="lide">' + fmt(f.texto) + "</p>" +
        (f.selos ? '<div class="selos empurra" aria-hidden="true">' + String(f.selos).split("").map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>" : "") +
        "</div>";
    },
    frase: function (f) {
      return '<div class="pad">' + (f.quadrada ? "" : meta(f.meta)) + '<p class="frase">' + fmt(f.texto) + "</p></div>";
    },
    bilhete: function (f) {
      return '<svg class="clipe" viewBox="0 0 20 44" aria-hidden="true"><path d="M7 30 V8 a4 4 0 0 1 8 0 V34 a6 6 0 0 1 -12 0 V12"/></svg>' +
        '<div class="pad"><h3>' + fmt(f.titulo) + "</h3><ul>" +
        (f.itens || []).map(function (t) { return '<li><span class="cheio"></span>' + fmt(t) + "</li>"; }).join("") + "</ul></div>";
    },
    tagline: function (f) {
      return '<div class="pad">' + meta(f.meta) + '<p class="tag-grande">' + fmt(f.texto) + "</p>" +
        (f.legenda ? '<p class="leg empurra">' + fmt(f.legenda) + "</p>" : "") + "</div>";
    },
    manifesto: function (f) {
      var cols = f.colunas || [];
      return '<div class="pad">' + meta(f.meta) + '<h2 class="titulo-m">' + fmt(f.titulo) + '</h2><div class="versos">' +
        cols.map(function (c, i) {
          return "<div>" + c.map(function (e) { return "<p>" + fmt(e) + "</p>"; }).join("") +
            (i === cols.length - 1 && f.assinatura ? '<p class="assina">' + fmt(f.assinatura) + "</p>" : "") + "</div>";
        }).join("") + "</div></div>";
    },
    "video-youtube": function (f) {
      var vid = idYoutube(f.url);
      return '<div class="pad">' + meta(f.meta) + '<div class="video-quadro">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(vid) + '" title="' + esc(f.titulo || f.nome || "vídeo") +
        '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        "</div></div>";
    },
    texto: function (f) {
      return '<div class="pad">' + meta(f.meta) + (f.titulo ? '<h2 class="inter">' + fmt(f.titulo) + "</h2>" : "") +
        '<div class="corrido' + (f.colunas === 2 ? " corrido--duas" : "") + '">' +
        (f.texto || []).map(function (t) { return "<p>" + fmt(t) + "</p>"; }).join("") + "</div></div>";
    },
    formulario: function (f) {
      var c = f.colunas || ["", ""];
      return '<div class="pad"><div><p class="titulo-form">' + fmt(f.titulo) + '</p><p class="sub-form">' + fmt(f.subtitulo) + "</p></div>" +
        '<table class="tabela"><thead><tr><th></th><th>' + fmt(c[0]) + "</th><th>" + fmt(c[1]) + "</th></tr></thead><tbody>" +
        (f.linhas || []).map(function (l) {
          return '<tr><td><span class="radio"></span></td><td class="pilar">' + fmt(l[0]) + "</td><td>" + fmt(l[1]) + "</td></tr>";
        }).join("") + "</tbody></table>" +
        (f.rodape ? '<p class="meta empurra"><span>' + fmt(f.rodape[0]) + "</span><span>" + fmt(f.rodape[1] || "") + "</span></p>" : "") + "</div>";
    },
    tela: function (f) {
      return '<div class="pad">' + meta(f.meta) +
        '<figure class="midia tela" data-nome="' + esc(f.nome) + '">' + video(f.video, f.capa, f.nome) + "</figure>" +
        (f.link ? link(f.link.texto, f.link.url) : "") + "</div>";
    },
    passo: function (f) {
      return '<div class="lado"><p class="passo__olho">' + fmt(f.olho || "página de destino") + "</p>" +
        '<h3 class="passo__titulo">' + fmt(f.titulo) + "</h3>" +
        '<span class="passo__marca" aria-hidden="true"></span>' +
        '<p class="passo__texto">' + fmt(f.texto) + "</p>" +
        (f.url ? link(f.link || "ver a página no site", f.url) : "") + "</div>" +
        '<figure class="midia" data-nome="' + esc(f.nome || f.titulo) + '"><img src="' + esc(f.foto) + '" alt="' + esc(puro(f.titulo)) + '" draggable="false"></figure>';
    },
    lista: function (f) {
      return '<div class="pad"><h3>' + fmt(f.titulo) + "</h3><ul>" +
        (f.itens || []).map(function (t) { return "<li>" + fmt(t) + "</li>"; }).join("") + "</ul></div>";
    },
    creditos: function (f) {
      return '<div class="pad">' + meta(f.meta) + '<dl class="creditos">' +
        (f.pares || []).map(function (p) { return "<dt>" + fmt(p[0]) + "</dt><dd>" + fmt(p[1]) + "</dd>"; }).join("") + "</dl>" +
        (proximo && proximo !== projeto ? '<a class="proximo empurra" href="projeto.html?p=' + encodeURIComponent(proximo.id) + '"><span>próximo projeto: ' +
          esc(puro(proximo.titulo)) + '</span><span aria-hidden="true">→</span></a>' : "") + "</div>";
    },
    foto: function (f) {
      return '<figure class="midia midia--cheia" data-nome="' + esc(f.nome) + '"><img src="' + esc(f.src) + '" alt="' + esc(f.alt || f.nome) + '" draggable="false"></figure>';
    }
  };
  var CLASSES = {
    lide: "f-lide", frase: "f-frase", bilhete: "f-achados", tagline: "f-tag", manifesto: "f-manifesto",
    "video-youtube": "f-video", texto: "f-texto", formulario: "f-pilares", tela: "f-tela", passo: "f-passo",
    lista: "f-pratica f-entrega", creditos: "f-creditos", foto: "f-foto"
  };
  var FUNDOS = { pagina: 1, azul: 1, rosinha: 1, rosa: 1, lilas: 1, amarelo: 1, salvia: 1 };

  function folhaHTML(f) {
    var fundo = FUNDOS[f.fundo] ? f.fundo : "pagina";
    var estilo = "--ar:" + (f.proporcao || 1.3) + ";--fundo:var(--f-" + fundo + ")" +
      (fundo === "azul" ? ";--tinta:var(--f-pagina)" : "") + (f.tamanho ? ";--fs:" + f.tamanho + "cqw" : "");
    var classe = "folha " + (CLASSES[f.tipo] || "") + (f.quadrada ? " f-quadrada" : "");
    var corpo = (TIPOS[f.tipo] || TIPOS.texto)(f);
    return '<article class="' + classe + '" data-f="' + esc(f.id) + '" style="' + estilo + '">' + corpo + "</article>";
  }

  // ---------- monta a página ----------
  html.classList.add("com-mesa");
  raiz.classList.add("projeto--mesa");
  var total = SITE.projetos.length;
  var ficha = (M.ficha || []).concat([["projeto", dois(indice + 1) + " de " + dois(total)]]);
  var resumo = $("#projeto-resumo");
  var dl = document.createElement("dl");
  dl.className = "ficha";
  dl.innerHTML = ficha.map(function (l) { return "<dt>" + fmt(l[0]) + "</dt><dd>" + fmt(l[1]) + "</dd>"; }).join("");
  resumo.replaceWith(dl);

  var a = M.abertura || {};
  var area = document.createElement("div");
  area.className = "mesa-area";
  area.innerHTML =
    (a.src || a.video ? '<figure class="heroi midia" id="heroi" data-nome="' + esc(a.nome || "abertura") + '" tabindex="0" aria-label="' +
      esc((a.alt || "Imagem de abertura do projeto") + ". Enter abre em tamanho maior.") + '">' +
      (a.video ? video(a.video, a.src, a.alt || "abertura") : '<img src="' + esc(a.src) + '" alt="' + esc(a.alt || "") + '" draggable="false">') +
      "</figure>" : "") +
    '<div class="mesa" id="mesa">' + (M.folhas || []).map(folhaHTML).join("") + "</div>";
  raiz.appendChild(area);

  var extra = document.createElement("div");
  extra.innerHTML =
    '<div class="acoes" id="acoes"><span>arraste as folhas</span><button class="botao" type="button" id="reorganizar">reorganizar</button></div>' +
    '<div class="visor" id="visor" tabindex="-1" role="dialog" aria-modal="true" aria-label="Imagens do projeto" hidden>' +
      '<div class="visor__topo"><span>imagens do projeto</span><button class="botao" type="button" id="visor-fechar">voltar ao projeto</button></div>' +
      '<button class="visor__seta visor__seta--ant" type="button" id="visor-ant" aria-label="imagem anterior">←</button>' +
      '<div class="visor__palco" id="visor-palco"></div>' +
      '<button class="visor__seta visor__seta--prox" type="button" id="visor-prox" aria-label="próxima imagem">→</button>' +
      '<p class="visor__rodape"><b id="visor-nome"></b><span id="visor-conta" aria-live="polite"></span></p>' +
    "</div>";
  while (extra.firstChild) document.body.appendChild(extra.firstChild);

  // ---------- arranjo e arrasto ----------
  var mesa = $("#mesa"), els = {}, pos = {}, ar = {}, INICIO = {}, NOMES = {}, W = 0, topo = 0, alturaMin = 0;
  (M.folhas || []).forEach(function (f) {
    INICIO[f.id] = { x: f.x || 0, y: f.y || 0, w: f.largura || 0.3, r: f.giro || 0, z: f.camada || 1 };
    NOMES[f.id] = puro(f.nome || f.titulo || f.id);
  });
  $$(".folha", mesa).forEach(function (el) {
    var k = el.getAttribute("data-f");
    els[k] = el;
    el.tabIndex = 0;
    el.setAttribute("aria-label", NOMES[k] + ". Arraste, ou use as setas do teclado, para mudar de lugar." +
      (el.querySelector(".midia") ? " Enter abre a imagem em tamanho maior." : ""));
  });
  function copiaInicio() {
    topo = 0;
    Object.keys(INICIO).forEach(function (k) {
      var i = INICIO[k];
      pos[k] = { x: i.x, y: i.y, r: i.r };
      els[k].style.zIndex = String(i.z);
      topo = Math.max(topo, i.z);
    });
  }
  function modoPilha() { return reduzido || window.innerWidth < 760; }
  function larg(k) { return INICIO[k].w; }
  function alt(k) { return larg(k) / ar[k]; }
  function aplicar(k) {
    var p = pos[k];
    els[k].style.transform = "translate(" + (p.x * W).toFixed(1) + "px," + (p.y * W).toFixed(1) + "px) rotate(" + p.r + "deg)";
  }
  function altura() {
    var max = 0;
    Object.keys(pos).forEach(function (k) { max = Math.max(max, pos[k].y + alt(k)); });
    return Math.max(alturaMin, max + 0.03);
  }
  function medir() {
    var pilha = modoPilha();
    html.classList.toggle("pilha", pilha);
    if (pilha) {
      mesa.style.height = "";
      Object.keys(els).forEach(function (k) { els[k].style.transform = ""; });
      return;
    }
    W = mesa.clientWidth;
    Object.keys(INICIO).forEach(function (k) {
      ar[k] = parseFloat(els[k].style.getPropertyValue("--ar")) || 1.3;
      els[k].style.setProperty("--lw", (larg(k) * W).toFixed(1) + "px");
      aplicar(k);
    });
    if (!alturaMin) alturaMin = altura();
    mesa.style.height = (altura() * W).toFixed(0) + "px";
  }

  // o arrasto só começa depois de alguns pixels: um clique simples continua sendo
  // clique (abre o link ou a foto)
  var arrasto = null;
  Object.keys(els).forEach(function (k) {
    var el = els[k];
    el.addEventListener("pointerdown", function (e) {
      if (modoPilha() || e.button !== 0) return;
      if (e.pointerType === "mouse") e.preventDefault(); // sem selecionar texto
      el.dataset.arrastou = "";
      arrasto = { k: k, el: el, id: e.pointerId, x0: e.clientX, y0: e.clientY, px: pos[k].x, py: pos[k].y, moveu: false };
    });
    el.addEventListener("click", function (e) {
      if (el.dataset.arrastou === "1") { e.preventDefault(); el.dataset.arrastou = ""; return; }
      if (e.target.closest("a")) return;
      var m = e.target.closest(".midia");
      if (m) abrirVisor(m);
    });
    el.addEventListener("keydown", function (e) {
      if (e.target !== el) return;
      var m0 = el.querySelector(".midia");
      if (e.key === "Enter" && m0) { e.preventDefault(); abrirVisor(m0); return; }
      if (modoPilha()) return;
      var passo = e.shiftKey ? 0.04 : 0.01;
      var mv = { ArrowLeft: [-passo, 0], ArrowRight: [passo, 0], ArrowUp: [0, -passo], ArrowDown: [0, passo] }[e.key];
      if (!mv) return;
      e.preventDefault();
      el.style.zIndex = String(++topo);
      pos[k].x += mv[0];
      pos[k].y = Math.max(pos[k].y + mv[1], -0.02);
      aplicar(k);
      mesa.style.height = (altura() * W).toFixed(0) + "px";
    });
  });
  window.addEventListener("pointermove", function (e) {
    if (!arrasto || e.pointerId !== arrasto.id) return;
    var dx = e.clientX - arrasto.x0, dy = e.clientY - arrasto.y0;
    if (!arrasto.moveu) {
      if (Math.abs(dx) + Math.abs(dy) <= 4) return;
      arrasto.moveu = true;
      arrasto.el.dataset.arrastou = "1";
      arrasto.el.style.zIndex = String(++topo);
      arrasto.el.classList.add("arrastando");
      html.classList.add("arrastando");
    }
    var k = arrasto.k, w = larg(k);
    pos[k].x = Math.min(Math.max(arrasto.px + dx / W, -w * 0.3), 1 - w * 0.7);
    pos[k].y = Math.max(arrasto.py + dy / W, -0.02);
    aplicar(k);
  });
  function soltar(e) {
    if (!arrasto || (e && e.pointerId !== arrasto.id)) return;
    var a = arrasto;
    arrasto = null;
    if (!a.moveu) return;
    a.el.classList.remove("arrastando");
    html.classList.remove("arrastando");
    mesa.style.height = (altura() * W).toFixed(0) + "px";
    // se o ponteiro não terminar sobre a folha, não haverá clique para limpar a marca
    setTimeout(function () { a.el.dataset.arrastou = ""; }, 400);
  }
  window.addEventListener("pointerup", soltar);
  window.addEventListener("pointercancel", soltar);

  $("#reorganizar").addEventListener("click", function () {
    copiaInicio();
    Object.keys(els).forEach(aplicar);
    mesa.style.height = (alturaMin * W).toFixed(0) + "px";
  });

  // a barra "arraste as folhas / reorganizar" só aparece com a mesa na tela
  var acoes = $("#acoes");
  var pedidoAcoes = false;
  function verAcoes() {
    pedidoAcoes = false;
    var r = mesa.getBoundingClientRect();
    acoes.classList.toggle("acoes--fora", !(r.top < window.innerHeight * 0.75 && r.bottom > window.innerHeight * 0.25));
  }
  function pedirAcoes() { if (!pedidoAcoes) { pedidoAcoes = true; requestAnimationFrame(verAcoes); } }
  window.addEventListener("scroll", pedirAcoes, { passive: true });
  window.addEventListener("resize", pedirAcoes);
  window.addEventListener("load", pedirAcoes);
  verAcoes();

  // ---------- visor ----------
  var visor = $("#visor"), palco = $("#visor-palco"), naVisor = 0, origem = null;
  var heroi = $("#heroi");
  function listaFotos() { return $$("#heroi, .mesa .midia"); }
  listaFotos().forEach(function (el) {
    var m = document.createElement("span");
    m.className = "ampliar";
    m.setAttribute("aria-hidden", "true");
    m.textContent = "↗";
    el.appendChild(m);
  });
  if (heroi) {
    heroi.addEventListener("click", function () { abrirVisor(heroi); });
    heroi.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); abrirVisor(heroi); } });
  }
  function mostrar(i) {
    var lista = listaFotos(), n = lista.length;
    naVisor = (i + n) % n;
    var el = lista[naVisor], fonte = el.querySelector("img, video"), novo;
    if (fonte.tagName === "VIDEO") {
      novo = document.createElement("video");
      novo.src = fonte.currentSrc || fonte.src;
      novo.muted = true; novo.loop = true; novo.autoplay = true; novo.playsInline = true; novo.controls = true;
      novo.setAttribute("playsinline", "");
    } else {
      novo = document.createElement("img");
      novo.src = fonte.currentSrc || fonte.src;
      novo.alt = fonte.alt || "";
    }
    palco.replaceChildren(novo);
    if (novo.play) novo.play().catch(function () {});
    $("#visor-nome").textContent = el.getAttribute("data-nome") || "";
    $("#visor-conta").textContent = (naVisor + 1) + " / " + n;
    $("#visor-ant").hidden = $("#visor-prox").hidden = n < 2;
  }
  function abrirVisor(m) {
    origem = m.closest(".folha") || m;
    visor.hidden = false;
    html.classList.add("visor-aberto");
    mostrar(Math.max(listaFotos().indexOf(m), 0));
    visor.focus();
  }
  function fecharVisor() {
    if (visor.hidden) return;
    visor.hidden = true;
    palco.replaceChildren();
    html.classList.remove("visor-aberto");
    var m = listaFotos()[naVisor], alvo = (m && (m.closest(".folha") || m)) || origem;
    if (alvo) alvo.focus({ preventScroll: false });
  }
  $("#visor-fechar").addEventListener("click", fecharVisor);
  $("#visor-ant").addEventListener("click", function () { mostrar(naVisor - 1); });
  $("#visor-prox").addEventListener("click", function () { mostrar(naVisor + 1); });
  visor.addEventListener("click", function (e) { if (e.target === visor || e.target === palco) fecharVisor(); });
  document.addEventListener("keydown", function (e) {
    if (visor.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); fecharVisor(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); mostrar(naVisor + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); mostrar(naVisor - 1); }
    else if (e.key === "Tab") {
      var focaveis = $$("button:not([hidden])", visor), pri = focaveis[0], ult = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
      else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
    }
  });
  var toqueX = null;
  palco.addEventListener("touchstart", function (e) { toqueX = e.touches[0].clientX; }, { passive: true });
  palco.addEventListener("touchend", function (e) {
    if (toqueX === null) return;
    var dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50) mostrar(naVisor + (dx < 0 ? 1 : -1));
    toqueX = null;
  });

  // folha de foto assume a proporção original da imagem
  $$(".f-foto img", mesa).forEach(function (img) {
    function ok() {
      var folha = img.closest(".folha");
      folha.style.setProperty("--ar", (img.naturalWidth / img.naturalHeight).toFixed(4));
      alturaMin = 0;
      medir();
    }
    if (img.complete && img.naturalWidth) ok(); else img.addEventListener("load", ok);
  });

  // ---------- copy dos destinos: o maior tamanho que cabe (de 4,4 a 1,9cqw) ----------
  function ajustarCopys() {
    $$(".passo__texto", mesa).forEach(function (p) {
      if (modoPilha()) { p.style.fontSize = ""; return; }
      var fs = 4.4;
      p.style.justifyContent = "flex-start";
      p.style.fontSize = fs + "cqw";
      while (fs > 1.9 && p.scrollHeight > p.clientHeight + 1) { fs -= 0.1; p.style.fontSize = fs.toFixed(2) + "cqw"; }
      p.style.justifyContent = "";
    });
  }

  copiaInicio();
  medir();
  ajustarCopys();
  var tResize;
  window.addEventListener("resize", function () {
    medir();
    clearTimeout(tResize);
    tResize = setTimeout(ajustarCopys, 60);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { medir(); ajustarCopys(); });
})();
