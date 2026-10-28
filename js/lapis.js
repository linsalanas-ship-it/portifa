/* Rastro de lápis: por onde o mouse passa fica um traço que some em alguns
   segundos. Branco (rosa-claro) sobre o azul, azul sobre o rosa.
   No celular/tablet, o traço segue o dedo na tela (inclusive enquanto rola).
   Desligado para quem pede menos movimento. */
(function () {
  "use strict";

  var DURACAO = 2500; // ms até o traço sumir
  var ESPESSURA = 3; // px (espessura média; varia com a velocidade)
  var COR = { azul: "#FAE7EC", rosa: "#0000EC" }; // cor do traço sobre cada fundo

  var temMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var temToque = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  var menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ((!temMouse && !temToque) || menosMovimento) return;

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

  // Qual fundo está sob o ponteiro? Durante a abertura, depende da etapa.
  function fundoEm(x, y) {
    var intro = document.getElementById("intro");
    if (intro && document.documentElement.classList.contains("com-intro") &&
        !intro.classList.contains("intro--fim")) {
      if (intro.classList.contains("intro--cor-2")) return "rosa";
      return intro.classList.contains("intro--cor-1") ? "azul" : "rosa";
    }
    var el = document.elementFromPoint(x, y);
    var tema = el && el.closest(".tema-azul, .tema-rosa");
    return tema && tema.classList.contains("tema-azul") ? "azul" : "rosa";
  }

  // Pontos guardados em coordenadas da página, para o traço rolar junto
  var tracos = [];
  var atual = null;
  var ultimo = 0;
  var animando = false;

  // Textura de grafite: um ladrilho de grãos com transparência aleatória,
  // usado como "tinta" do traço. Um ladrilho por cor.
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
  var TINTA = { azul: grafite(COR.azul), rosa: grafite(COR.rosa) };

  // Registra um ponto do traço. Mouse: pontos na página (o traço rola junto).
  // Toque: pontos na tela, porque ao arrastar o dedo a página rola junto com ele
  // e, na página, o traço viraria um ponto só.
  function registrar(clientX, clientY, naTela) {
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
    var cor = fundoEm(clientX, clientY);
    // começa um traço novo se o mouse parou, pulou ou mudou de fundo
    if (!atual || agora - ultimo > 120 || atual.cor !== cor || atual.naTela !== naTela) {
      // emenda com o traço anterior (no mouse, como sempre; no toque, só dentro do mesmo arraste)
      var emenda = atual ? atual.naTela === naTela : !naTela;
      atual = { cor: cor, pontos: [], naTela: naTela };
      if (emenda && tracos.length && tracos[tracos.length - 1].pontos.length) {
        // emenda com o ponto anterior para não deixar buraco na troca de cor
        var prev = tracos[tracos.length - 1].pontos;
        if (agora - ultimo <= 120) atual.pontos.push(prev[prev.length - 1]);
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
    // cada toque começa um traço novo; só o primeiro dedo desenha
    document.addEventListener("touchstart", function (e) {
      atual = null;
      var t = e.touches[0];
      if (t) registrar(t.clientX, t.clientY, true);
    }, { passive: true });
    document.addEventListener("touchmove", function (e) {
      var t = e.touches[0];
      if (t) registrar(t.clientX, t.clientY, true);
    }, { passive: true });
    document.addEventListener("touchend", function () { atual = null; }, { passive: true });
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
      ctx.strokeStyle = TINTA[tr.cor];
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
        ctx.strokeStyle = COR[tr.cor];
        ctx.globalAlpha = 0.7 * alfa;
        ctx.lineWidth = b.w * 0.45;
        curva(ini, b, fim, 0, 0);
        ctx.strokeStyle = TINTA[tr.cor];
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
