/* Rastro de lápis: por onde o mouse passa fica um traço que some em alguns
   segundos, sempre em azul (o site é todo em papel cru).
   No celular/tablet, o traço segue o dedo na tela (inclusive enquanto rola).
   Desligado para quem pede menos movimento. */
(function () {
  "use strict";

  var DURACAO = 2500; // ms até o traço sumir
  var ESPESSURA = 3; // px (espessura média; varia com a velocidade)
  var COR_TRACO = "#0000EC"; // cor do traço sobre o papel cru
  var COR_CLARA = "#FBF7EF"; // cor do traço sobre as seções azuis (.tema-azul)

  var temMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var temToque = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  var menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ((!temMouse && !temToque) || menosMovimento) return;
  // nas páginas de projeto, o rastro só aparece na mesa de folhas (js/mesa.js)
  var naMesa = document.documentElement.classList.contains("com-mesa");
  if (document.getElementById("projeto") && !naMesa) return;
  // na mesa, o lápis não risca em cima de folhas, fotos e textos, nem durante o arrasto
  var SOBRE_CONTEUDO = ".folha, .heroi, img, video, iframe, h1, h2, h3, p, a, button, li, dt, dd, .acoes, .menu, .visor";
  function sobreConteudo(x, y) {
    if (!naMesa) return false;
    if (document.documentElement.classList.contains("arrastando")) return true;
    var el = document.elementFromPoint(x, y);
    return !!(el && el.closest && el.closest(SOBRE_CONTEUDO));
  }

  var canvas = document.createElement("canvas");
  canvas.className = "rastro";
  canvas.setAttribute("aria-hidden", "true");
  // estilo aplicado aqui mesmo, para funcionar ainda que o CSS esteja em cache
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:30;pointer-events:none";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var dpr = 1;

  function redimensionar() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
  }
  redimensionar();
  window.addEventListener("resize", redimensionar);

  // Pontos guardados em coordenadas da página, para o traço rolar junto
  var tracos = [];
  var atual = null;
  var ultimo = 0;
  var animando = false;

  // Textura de grafite: um ladrilho de grãos com transparência aleatória,
  // usado como "tinta" do traço.
  function grafite(cor) {
    var lado = 96;
    var c = document.createElement("canvas");
    c.width = c.height = lado;
    var g = c.getContext("2d");
    g.fillStyle = cor;
    g.fillRect(0, 0, lado, lado);
    var img = g.getImageData(0, 0, lado, lado);
    for (var i = 3; i < img.data.length; i += 4) {
      var r = Math.random();
      // muitos grãos fortes, alguns fracos e alguns vazios (o papel aparecendo)
      img.data[i] = r < 0.3 ? 0 : Math.round(255 * (0.6 + 0.4 * Math.random()));
    }
    g.putImageData(img, 0, 0);
    var padrao = ctx.createPattern(c, "repeat");
    // grão do tamanho de um pixel da tela, também em telas de alta densidade
    if (padrao.setTransform && window.DOMMatrix) padrao.setTransform(new DOMMatrix().scale(1 / dpr));
    return padrao;
  }
  var TINTAS = {};
  TINTAS[COR_TRACO] = grafite(COR_TRACO);
  TINTAS[COR_CLARA] = grafite(COR_CLARA);
  // sobre fundo azul o traço fica claro
  function corEm(x, y) {
    var el = document.elementFromPoint(x, y);
    return el && el.closest && el.closest(".tema-azul") ? COR_CLARA : COR_TRACO;
  }

  // Registra um ponto do traço. Mouse: pontos na página (o traço rola junto).
  // Toque: pontos na tela, porque ao arrastar o dedo a página rola junto com ele
  // e, na página, o traço viraria um ponto só.
  function registrar(clientX, clientY, naTela) {
    // durante a abertura quem risca é o lápis dela (js/abertura.js)
    if (document.documentElement.classList.contains("com-abertura")) return;
    if (sobreConteudo(clientX, clientY)) { atual = null; return; }
    var ox = naTela ? 0 : scrollX;
    var oy = naTela ? 0 : scrollY;
    var agora = performance.now();
    var anterior = atual && atual.pontos[atual.pontos.length - 1];
    // "pressão": devagar o traço fica mais grosso, rápido fica mais fino
    var largura = ESPESSURA;
    if (anterior) {
      var dt = Math.max(agora - anterior.t, 1);
      var vel = Math.hypot(clientX + ox - anterior.x, clientY + oy - anterior.y) / dt;
      var alvo = ESPESSURA * Math.min(Math.max(1.3 - vel * 0.3, 0.5), 1.3);
      largura = anterior.w * 0.6 + alvo * 0.4;
    }
    var ponto = {
      x: clientX + ox,
      y: clientY + oy,
      t: agora,
      w: largura,
      // afastamento dos fios finos que acompanham o traço, fixo por ponto
      f1: 0.35 + Math.random() * 0.35,
      f2: -(0.35 + Math.random() * 0.35),
    };
    var cor = corEm(clientX, clientY);
    // começa um traço novo se o mouse parou, pulou ou mudou de fundo
    if (!atual || agora - ultimo > 120 || atual.naTela !== naTela || atual.cor !== cor) {
      // emenda com o traço anterior (no mouse, como sempre; no toque, só dentro do mesmo arraste)
      var emenda = atual ? atual.naTela === naTela : !naTela;
      var trocouCor = atual && atual.cor !== cor;
      atual = { pontos: [], naTela: naTela, cor: cor };
      if (emenda && tracos.length && tracos[tracos.length - 1].pontos.length) {
        // emenda com o ponto anterior para não deixar buraco entre os traços
        var prev = tracos[tracos.length - 1].pontos;
        if (agora - ultimo <= 120 && !trocouCor) atual.pontos.push(prev[prev.length - 1]);
      }
      tracos.push(atual);
    }
    atual.pontos.push(ponto);
    ultimo = agora;
    if (!animando) {
      animando = true;
      requestAnimationFrame(desenhar);
    }
  }

  if (temMouse) {
    document.addEventListener("mousemove", function (e) {
      registrar(e.clientX, e.clientY, false);
    }, { passive: true });
    document.addEventListener("mouseleave", function () { atual = null; });
  }

  if (temToque) {
    // No celular, o gesto decide: se o dedo começa andando na horizontal, é rabisco
    // (a página fica parada e o lápis risca); se começa na vertical, é rolagem
    // (a página rola e o lápis não risca). Só o primeiro dedo conta.
    var gesto = null; // { x0, y0, pontos, modo: null | "rabisco" | "rolar" }
    // onde o dedo já tem outra função: arrastar o post-it, o visor, campos de texto
    var LIVRES = ".etiqueta, .visor, input, textarea, select, iframe, .sobre";
    document.addEventListener("touchstart", function (e) {
      atual = null;
      var t = e.touches[0];
      if (!t || e.touches.length > 1) { gesto = null; return; }
      var alvo = e.target && e.target.closest ? e.target.closest(LIVRES) : null;
      gesto = alvo ? null : { x0: t.clientX, y0: t.clientY, modo: null };
    }, { passive: true });
    document.addEventListener("touchmove", function (e) {
      if (!gesto) return;
      var t = e.touches[0];
      if (!t || e.touches.length > 1) { gesto = null; return; }
      if (!gesto.modo) {
        // decide já no primeiro movimento: o iPhone só deixa travar a rolagem
        // se o primeiro movimento do dedo for bloqueado
        var dx = Math.abs(t.clientX - gesto.x0), dy = Math.abs(t.clientY - gesto.y0);
        if (dx === 0 && dy === 0) return;
        gesto.modo = dx > dy ? "rabisco" : "rolar";
        if (gesto.modo === "rabisco") {
          registrar(gesto.x0, gesto.y0, true); // o traço começa onde o dedo tocou
        }
      }
      if (gesto.modo === "rabisco") {
        if (e.cancelable) e.preventDefault(); // trava a página enquanto rabisca
        registrar(t.clientX, t.clientY, true);
      }
    }, { passive: false });
    document.addEventListener("touchend", function () { atual = null; gesto = null; }, { passive: true });
    document.addEventListener("touchcancel", function () { atual = null; gesto = null; }, { passive: true });
  }


  function desenhar() {
    var agora = performance.now();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "butt"; // sem pontas redondas sobrepostas (evita "nós" escuros)
    ctx.lineJoin = "round";

    tracos = tracos.filter(function (tr) {
      tr.pontos = tr.pontos.filter(function (p) { return agora - p.t < DURACAO; });
      return tr.pontos.length > 1 || tr === atual;
    });

    tracos.forEach(function (tr) {
      // traço do mouse acompanha a página; traço do dedo fica fixo na tela
      if (tr.naTela) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      else ctx.setTransform(dpr, 0, 0, dpr, -scrollX * dpr, -scrollY * dpr);
      var cor = tr.cor || COR_TRACO, tinta = TINTAS[cor];
      ctx.strokeStyle = tinta;
      var pts = tr.pontos;
      for (var i = 1; i < pts.length; i++) {
        var a = pts[i - 1];
        var b = pts[i];
        var vida = 1 - (agora - b.t) / DURACAO;
        if (vida <= 0) continue;
        var alfa = vida * vida; // some devagar no começo, rápido no fim

        // curva suave: de meio a meio dos segmentos, passando pelo ponto
        var c = pts[i + 1] || b;
        var ini = i === 1 ? a : { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        var fim = c === b ? b : { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
        var dx = fim.x - ini.x, dy = fim.y - ini.y;
        var len = Math.hypot(dx, dy) || 1;
        var nx = -dy / len, ny = dx / len; // perpendicular ao traço

        // miolo denso (cor lisa, mais fino) + corpo granulado com bordas ásperas
        ctx.strokeStyle = cor;
        ctx.globalAlpha = 0.7 * alfa;
        ctx.lineWidth = b.w * 0.45;
        curva(ini, b, fim, 0, 0);
        ctx.strokeStyle = tinta;
        ctx.globalAlpha = alfa;
        ctx.lineWidth = b.w;
        curva(ini, b, fim, 0, 0);
        // fios finos nas bordas, como a ponta gasta do lápis
        ctx.globalAlpha = 0.55 * alfa;
        ctx.lineWidth = Math.max(b.w * 0.35, 0.6);
        curva(ini, b, fim, nx * b.w * b.f1, ny * b.w * b.f1);
        curva(ini, b, fim, nx * b.w * b.f2, ny * b.w * b.f2);
      }
    });
    ctx.globalAlpha = 1;

    var restam = tracos.some(function (tr) { return tr.pontos.length > 0; });
    if (restam) {
      requestAnimationFrame(desenhar);
    } else {
      animando = false;
    }
  }

  function curva(ini, meio, fim, ox, oy) {
    ctx.beginPath();
    ctx.moveTo(ini.x + ox, ini.y + oy);
    ctx.quadraticCurveTo(meio.x + ox, meio.y + oy, fim.x + ox, fim.y + oy);
    ctx.stroke();
  }

  // Se a página rolar com o traço na tela, redesenha na nova posição
  window.addEventListener("scroll", function () {
    if (!animando && tracos.length) {
      animando = true;
      requestAnimationFrame(desenhar);
    }
  }, { passive: true });
})();
