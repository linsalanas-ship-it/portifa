/* Rastro de lápis: por onde o mouse passa fica um traço que some em alguns
   segundos. Branco (rosa-claro) sobre o azul, azul sobre o rosa.
   Desligado em telas de toque e para quem pede menos movimento. */
(function () {
  "use strict";

  var DURACAO = 2500; // ms até o traço sumir
  var ESPESSURA = 2.4; // px
  var COR = { azul: "#FAE7EC", rosa: "#0000EC" }; // cor do traço sobre cada fundo

  var semMouse = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (semMouse || menosMovimento) return;

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

  function aleatorio() {
    return Math.random() - 0.5;
  }

  document.addEventListener("mousemove", function (e) {
    var agora = performance.now();
    var ponto = {
      x: e.clientX + scrollX,
      y: e.clientY + scrollY,
      t: agora,
      // pequenas variações fixas por ponto dão a textura do grafite
      jx: aleatorio() * 1.2,
      jy: aleatorio() * 1.2,
      w: ESPESSURA * (0.8 + Math.random() * 0.4),
    };
    var cor = fundoEm(e.clientX, e.clientY);
    // começa um traço novo se o mouse parou, pulou ou mudou de fundo
    if (!atual || agora - ultimo > 120 || atual.cor !== cor) {
      atual = { cor: cor, pontos: [] };
      if (tracos.length && tracos[tracos.length - 1].pontos.length) {
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
  }, { passive: true });

  document.addEventListener("mouseleave", function () { atual = null; });

  function desenhar() {
    var agora = performance.now();
    ctx.setTransform(dpr, 0, 0, dpr, -scrollX * dpr, -scrollY * dpr);
    ctx.clearRect(scrollX, scrollY, innerWidth, innerHeight);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    tracos = tracos.filter(function (tr) {
      tr.pontos = tr.pontos.filter(function (p) { return agora - p.t < DURACAO; });
      return tr.pontos.length > 1 || tr === atual;
    });

    tracos.forEach(function (tr) {
      ctx.strokeStyle = COR[tr.cor];
      for (var i = 1; i < tr.pontos.length; i++) {
        var a = tr.pontos[i - 1];
        var b = tr.pontos[i];
        var vida = 1 - (agora - b.t) / DURACAO;
        if (vida <= 0) continue;
        var alfa = vida * vida; // some devagar no começo, rápido no fim
        // traço principal
        ctx.globalAlpha = 0.9 * alfa;
        ctx.lineWidth = b.w;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        // granulado do grafite: um segundo traço fino e deslocado
        ctx.globalAlpha = 0.35 * alfa;
        ctx.lineWidth = b.w * 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x + a.jx, a.y + a.jy);
        ctx.lineTo(b.x + b.jx, b.y + b.jy);
        ctx.stroke();
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

  // Se a página rolar com o traço na tela, redesenha na nova posição
  window.addEventListener("scroll", function () {
    if (!animando && tracos.length) {
      animando = true;
      requestAnimationFrame(desenhar);
    }
  }, { passive: true });
})();
