/* Abertura com o lápis: uma folha do mesmo papel cobre a tela, o lápis entra e
   desenha a bonequinha (assets/img/rosto-tracos.json) e depois a folha sobe,
   levando o site junto. Só na primeira visita da sessão e sem #âncora na URL
   (decidido no <head> do index.html, que marca <html class="com-abertura">).
   Não é preciso editar este arquivo. */
(function () {
  "use strict";

  var raiz = document.documentElement;
  var abertura = document.getElementById("abertura");
  if (!abertura) return;
  if (!raiz.classList.contains("com-abertura")) { abertura.remove(); return; }

  var AZUL = "#0000ec", CRU = "#f1ebe1";
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var temMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var folha = document.getElementById("abertura-folha");
  var cvRiscos = document.getElementById("abertura-riscos");
  var cvRosto = document.getElementById("abertura-rosto");
  var cvLapis = document.getElementById("abertura-lapis");
  var cxRiscos = cvRiscos.getContext("2d");
  var cxRosto = cvRosto.getContext("2d");
  var cx = cvLapis.getContext("2d");
  var menu = document.getElementById("menu");
  var main = document.querySelector("main");
  var W = 0, H = 0, dpr = 1;

  /* ---------- grafite (mesma técnica do js/lapis.js) ---------- */
  var tinta = null;
  function criarTinta() {
    var c = document.createElement("canvas");
    c.width = c.height = 96;
    var g = c.getContext("2d");
    g.fillStyle = AZUL;
    g.fillRect(0, 0, 96, 96);
    var img = g.getImageData(0, 0, 96, 96);
    for (var i = 3; i < img.data.length; i += 4) {
      img.data[i] = Math.random() < 0.3 ? 0 : Math.round(255 * (0.6 + 0.4 * Math.random()));
    }
    g.putImageData(img, 0, 0);
    var p = cxRiscos.createPattern(c, "repeat");
    if (p.setTransform && window.DOMMatrix) p.setTransform(new DOMMatrix().scale(1 / dpr));
    tinta = p;
  }

  // risca um trecho de curva suave entre os três últimos pontos de "buf"
  function riscarEm(g, buf, x, y, larg) {
    buf.push({ x: x, y: y, w: larg, f1: 0.35 + Math.random() * 0.35, f2: -(0.35 + Math.random() * 0.35) });
    if (buf.length < 3) return;
    if (buf.length > 3) buf.shift();
    var a = buf[0], b = buf[1], c = buf[2];
    var ini = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    var fim = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
    var dx = fim.x - ini.x, dy = fim.y - ini.y, len = Math.hypot(dx, dy) || 1;
    var nx = -dy / len, ny = dx / len;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.lineCap = "round";
    g.lineJoin = "round";
    function curva(ox, oy) {
      g.beginPath();
      g.moveTo(ini.x + ox, ini.y + oy);
      g.quadraticCurveTo(b.x + ox, b.y + oy, fim.x + ox, fim.y + oy);
      g.stroke();
    }
    // miolo denso + corpo granulado + fios finos nas bordas
    g.strokeStyle = AZUL; g.globalAlpha = 0.55; g.lineWidth = b.w * 0.45; curva(0, 0);
    g.strokeStyle = tinta; g.globalAlpha = 0.95; g.lineWidth = b.w; curva(0, 0);
    g.globalAlpha = 0.5; g.lineWidth = Math.max(b.w * 0.35, 0.6);
    curva(nx * b.w * b.f1, ny * b.w * b.f1);
    curva(nx * b.w * b.f2, ny * b.w * b.f2);
    g.globalAlpha = 1;
  }
  var rabisco = [];

  /* ---------- o lápis: só contorno azul e miolo cru ---------- */
  var M = { graf: 13, cone: 46, corpo: 262, fer: 292, bor: 318 }, R = 12;
  function tamanho() { return W < 600 ? 0.42 : 0.55; } // ~175 × 13 px (135 × 10 no celular)
  function desenharLapis(x, y, ang, esc, alfa) {
    cx.setTransform(1, 0, 0, 1, 0, 0);
    cx.clearRect(0, 0, cvLapis.width, cvLapis.height);
    if (alfa <= 0) return;
    cx.globalAlpha = alfa;
    esc *= tamanho();
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.translate(x, y);
    cx.rotate(ang);
    cx.scale(esc, esc);
    var c = M.cone, r = M.graf / M.cone * R;
    cx.lineJoin = "round";
    cx.lineCap = "round";
    cx.strokeStyle = AZUL;
    cx.lineWidth = 1.6 / esc;
    // silhueta: ponta em cone, corpo reto e borracha com cantos arredondados
    cx.beginPath();
    cx.moveTo(0, 0);
    cx.lineTo(c, -R);
    cx.lineTo(M.bor - 5, -R);
    cx.quadraticCurveTo(M.bor, -R, M.bor, -R + 5);
    cx.lineTo(M.bor, R - 5);
    cx.quadraticCurveTo(M.bor, R, M.bor - 5, R);
    cx.lineTo(c, R);
    cx.closePath();
    cx.fillStyle = CRU; cx.fill(); cx.stroke();
    // ponta de grafite cheia
    cx.beginPath();
    cx.moveTo(0, 0); cx.lineTo(M.graf, -r); cx.lineTo(M.graf, r); cx.closePath();
    cx.fillStyle = AZUL; cx.fill(); cx.stroke();
    // fim da madeira apontada e as duas bordas da ponteira
    [c, M.corpo, M.fer].forEach(function (xx) {
      cx.beginPath(); cx.moveTo(xx, -R); cx.lineTo(xx, R); cx.stroke();
    });
    cx.globalAlpha = 1;
  }

  /* ---------- a bonequinha, desenhada traço a traço ---------- */
  var ROSTO = null, rosto = null;
  function montarRosto() {
    var h = Math.min(H * 0.36, 280, W * 0.42 * ROSTO.h / ROSTO.w);
    var s = h / ROSTO.h, w = ROSTO.w * s, ox = W / 2 - w / 2, oy = H * 0.47 - h / 2;
    var rota = [], d = 3, ultimo = { x: W + 120, y: H + 160 }, comTinta = 0;
    function P(x, y) { return { x: ox + x * s, y: oy + y * s }; }
    // reamostra a cada 3 px; levantado (sem riscar) o lápis anda 3× mais rápido
    function linha(a, b, pena) {
      var n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / (pena ? d : d * 3)));
      for (var i = 1; i <= n; i++) rota.push({ x: a.x + (b.x - a.x) * i / n, y: a.y + (b.y - a.y) * i / n, pena: pena });
      if (pena) comTinta += n;
    }
    function tracar(lista) {
      var p0 = P(lista[0][0], lista[0][1]);
      linha(ultimo, p0, false);
      rota.push({ x: p0.x, y: p0.y, pena: true, ini: true });
      var ant = p0;
      for (var i = 1; i < lista.length; i++) { var q = P(lista[i][0], lista[i][1]); linha(ant, q, true); ant = q; }
      ultimo = ant;
    }
    ROSTO.tracos.forEach(tracar);
    // olhos e nariz: uma espiral pequena, de fora para dentro, que preenche a bolinha
    (ROSTO.pontos || ROSTO.bolinhas || []).forEach(function (c) {
      var lista = [], r = c[2] * 0.8, voltas = Math.max(1.5, r / 6);
      for (var t = 0; t <= 1.0001; t += 1 / (voltas * 16)) {
        var a = t * voltas * Math.PI * 2, rr = r * (1 - t * 0.9);
        lista.push([c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr]);
      }
      tracar(lista);
    });
    rosto = { rota: rota, i: 0, acc: 0, buf: [], ritmo: comTinta / 3.4, larg: ROSTO.traco * s * 0.62,
      ox: ox, oy: oy, w: w, h: h, feito: false, tFeito: 0 };
  }
  function avancarRosto(passos) {
    while (passos >= 1 && !rosto.feito) {
      passos--;
      var p = rosto.rota[rosto.i++];
      if (p.ini || !p.pena) rosto.buf = [];
      if (p.pena) riscarEm(cxRosto, rosto.buf, p.x, p.y, rosto.larg * (0.88 + Math.random() * 0.24));
      if (rosto.i >= rosto.rota.length) {
        rosto.feito = true;
        rosto.tFeito = performance.now();
        if (fase === "abertura" && !reduzido) balancarRosto();
      }
    }
  }
  function passoRosto(dt, mult) {
    if (!rosto || rosto.feito) return null;
    rosto.acc += rosto.ritmo * dt * mult;
    var n = Math.floor(rosto.acc);
    rosto.acc -= n;
    avancarRosto(n);
    return rosto.feito ? null : rosto.rota[rosto.i];
  }
  function completarRosto() { if (rosto && !rosto.feito) avancarRosto(1e9); }
  function refazerRosto() {
    var feitos = rosto ? rosto.i : 0, pronto = rosto && rosto.feito;
    cxRosto.setTransform(1, 0, 0, 1, 0, 0);
    cxRosto.clearRect(0, 0, cvRosto.width, cvRosto.height);
    montarRosto();
    if (pronto) { avancarRosto(1e9); rosto.tFeito = 0; } else avancarRosto(feitos);
  }
  // terminou: balança a cabeça uma vez, como no site antigo
  function balancarRosto() {
    cvRosto.style.transformOrigin = (rosto.ox + rosto.w / 2) + "px " + (rosto.oy + rosto.h * 0.85) + "px";
    cvRosto.animate([
      { transform: "rotate(0deg)" },
      { transform: "rotate(-7deg)", offset: 0.22 },
      { transform: "rotate(7deg) translateX(4px)", offset: 0.55 },
      { transform: "rotate(-3deg)", offset: 0.8 },
      { transform: "rotate(0deg)" }
    ], { duration: 1800, easing: "ease-in-out" });
  }
  // o lápis, levantado, vai descansar à direita, embaixo do rosto
  function descanso() { return { x: Math.min(W - 70, rosto.ox + rosto.w + 60), y: rosto.oy + rosto.h * 0.92 }; }

  function redimensionar() {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    [cvRiscos, cvRosto, cvLapis].forEach(function (c) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    });
    criarTinta();
    rabisco = [];
    if (fase === "abertura" && ROSTO) refazerRosto();
  }

  /* ---------- quem conduz o lápis ---------- */
  var mouse = null, ultimoInput = -1e9, toque = null, origemMouse = null;
  abertura.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse" && e.buttons === 0) return;
    // o navegador avisa a posição do mouse parado ao carregar: só conta quando ele anda de verdade
    if (e.pointerType === "mouse" && !mouse) {
      if (!origemMouse) { origemMouse = { x: e.clientX, y: e.clientY }; return; }
      if (Math.hypot(e.clientX - origemMouse.x, e.clientY - origemMouse.y) < 8) return;
    }
    mouse = { x: e.clientX, y: e.clientY };
    ultimoInput = performance.now();
  });
  abertura.addEventListener("pointerdown", function (e) {
    toque = { x: e.clientX, y: e.clientY, tipo: e.pointerType };
    mouse = { x: e.clientX, y: e.clientY };
    ultimoInput = performance.now();
  });
  // pular: clique, toque sem arrastar, rolagem ou tecla
  abertura.addEventListener("pointerup", function (e) {
    if (!toque) return;
    var parado = Math.hypot(e.clientX - toque.x, e.clientY - toque.y) < 10;
    if (toque.tipo === "mouse" || parado) sair();
    toque = null;
  });
  abertura.addEventListener("wheel", function () { sair(); }, { passive: true });
  window.addEventListener("keydown", function () { sair(); });
  window.addEventListener("resize", function () { if (fase === "abertura") redimensionar(); });

  /* ---------- o quadro a quadro ---------- */
  var fase = "abertura", t0 = 0, tSaida = 0, ultimoQuadro = 0;
  var pos = { x: 0, y: 0 }, alvoAnt = null, vx = 0, alfaLapis = 1, levantado = 0;

  function quadro(agora) {
    var dt = Math.min((agora - (ultimoQuadro || agora)) / 1000, 0.05);
    ultimoQuadro = agora;
    var decorrido = agora - t0;
    var sozinho = !reduzido && agora - ultimoInput > 1400;
    var alvo, pena = true, exato = false;
    // a bonequinha avança sozinha; se a pessoa pega o lápis, ela termina 3× mais rápido, sem o lápis
    var proximo = fase === "abertura" && !reduzido ? passoRosto(dt, sozinho ? 1 : 3) : null;
    if (reduzido) alvo = { x: W * 0.62, y: H * 0.6 };
    else if (sozinho && proximo) { alvo = proximo; pena = false; exato = true; }
    else if (sozinho && rosto) { alvo = descanso(); pena = false; }
    else if (sozinho) alvo = pos;
    else alvo = mouse || pos;
    if (alvoAnt && Math.hypot(alvo.x - alvoAnt.x, alvo.y - alvoAnt.y) > 100) { levantado = 14; rabisco = []; }
    alvoAnt = alvo;
    // segue com peso: anda 35% da distância a cada quadro (exato sobre o traço da bonequinha)
    var antes = { x: pos.x, y: pos.y }, k = reduzido ? 1 : 0.35;
    if (exato && Math.hypot(alvo.x - pos.x, alvo.y - pos.y) < 40) k = 1;
    else if (!pena) k = 0.12;
    pos.x += (alvo.x - pos.x) * k;
    pos.y += (alvo.y - pos.y) * k;
    var passo = Math.hypot(pos.x - antes.x, pos.y - antes.y);
    vx = vx * 0.85 + (pos.x - antes.x) * 0.15;
    if (fase === "abertura") {
      // quando é a pessoa quem conduz, o lápis risca a folha (o traço não some)
      if (levantado > 0) levantado--;
      else if (!pena || passo > 80) rabisco = [];
      else if (passo > 0.4) {
        var vel = passo / Math.max(dt * 1000, 1);
        riscarEm(cxRiscos, rabisco, pos.x, pos.y, 2.8 * Math.min(Math.max(1.3 - vel * 0.25, 0.5), 1.3));
      }
      // saída 1,9 s depois que a bonequinha termina (no máximo 11 s)
      var pronto = rosto && rosto.feito && agora - rosto.tFeito > 1900;
      if (reduzido ? decorrido > 2500 : (pronto || decorrido > 11000)) sair();
    }
    var esc = 1;
    if (fase !== "abertura") {
      // o lápis encolhe até o tamanho do cursor em 0,45 s e some
      var p = Math.min((agora - tSaida) / 450, 1);
      esc = 1 - 0.82 * (1 - Math.pow(1 - p, 3));
      alfaLapis = p < 1 ? 1 : Math.max(0, alfaLapis - dt * 6);
    }
    // ponta no cursor, corpo subindo para a direita (~56°, até 11° a mais ou a menos com a velocidade)
    var ang = -0.98 + Math.max(-0.2, Math.min(0.2, -vx * 0.02));
    desenharLapis(pos.x, pos.y, ang, esc, alfaLapis);
    if (fase === "site" && alfaLapis <= 0) return;
    requestAnimationFrame(quadro);
  }

  /* ---------- saída: o papel é empurrado para cima ---------- */
  function sair() {
    if (fase !== "abertura") return;
    completarRosto(); // se pulou antes do fim, o rosto é completado na hora
    fase = "saindo";
    tSaida = performance.now();
    try { sessionStorage.setItem("introVista", "1"); } catch (e) {}
    var fim;
    if (reduzido) {
      fim = abertura.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
    } else {
      // a folha sai pelo topo e o site sobe colado na borda de baixo dela: mesma duração e curva
      var mov = { duration: 1100, delay: 300, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" };
      fim = folha.animate([{ transform: "translateY(0)" }, { transform: "translateY(-" + H + "px)" }], mov);
      [main, menu].forEach(function (el) {
        el.animate([{ transform: "translateY(" + H + "px)" }, { transform: "translateY(0)" }], mov);
      });
    }
    fim.onfinish = function () {
      fase = "site";
      abertura.remove();
      [main, menu].forEach(function (el) { el.getAnimations().forEach(function (a) { a.cancel(); }); });
      raiz.classList.remove("com-abertura");
      // a assinatura do menu balança uma vez, como quem diz oi
      var assinatura = document.querySelector(".menu .assinatura");
      if (assinatura && !reduzido) {
        assinatura.animate([
          { transform: "rotate(0deg)" },
          { transform: "rotate(-9deg)", offset: 0.25 },
          { transform: "rotate(8deg)", offset: 0.6 },
          { transform: "rotate(0deg)" }
        ], { duration: 1100, delay: 250, easing: "ease-in-out" });
      }
    };
  }

  /* ---------- começa ---------- */
  abertura.classList.toggle("sem-cursor", temMouse);
  window.scrollTo(0, 0);
  redimensionar();
  pos = reduzido ? { x: W * 0.62, y: H * 0.6 } : { x: W + 120, y: H + 160 }; // entra pelo canto inferior direito
  t0 = performance.now();
  requestAnimationFrame(quadro);

  // os traços da bonequinha vêm do JSON extraído do rosto.png
  fetch("assets/img/rosto-tracos.json")
    .then(function (r) { return r.json(); })
    .then(function (dados) {
      ROSTO = dados;
      if (fase !== "abertura") return;
      montarRosto();
      if (reduzido) { avancarRosto(1e9); rosto.tFeito = 0; }
    })
    .catch(function () {
      // sem o JSON (ex.: arquivo aberto direto do computador): mostra o rosto pronto
      var img = new Image();
      img.onload = function () {
        var h = Math.min(H * 0.36, 280, W * 0.42 * 800 / 737), w = h * 737 / 800;
        cxRosto.setTransform(dpr, 0, 0, dpr, 0, 0);
        cxRosto.drawImage(img, W / 2 - w / 2, H * 0.47 - h / 2, w, h);
      };
      img.src = "assets/img/rosto.png";
      rosto = { feito: true, tFeito: performance.now(), ox: W / 2, oy: H * 0.4, w: 0, h: 100 };
    });
})();
