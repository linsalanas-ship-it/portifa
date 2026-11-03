/* Abertura: uma folha do mesmo papel cobre a tela, a bonequinha aparece inteira e
   balança de um lado para o outro; depois a folha sobe, levando o site junto.
   Só na primeira visita da sessão e sem #âncora na URL (decidido no <head> do
   index.html, que marca <html class="com-abertura">).
   Não é preciso editar este arquivo. */
(function () {
  "use strict";

  var raiz = document.documentElement;
  var abertura = document.getElementById("abertura");
  if (!abertura) return;
  if (!raiz.classList.contains("com-abertura")) { abertura.remove(); return; }

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var folha = document.getElementById("abertura-folha");
  var boneca = document.getElementById("abertura-boneca");
  var menu = document.getElementById("menu");
  var main = document.querySelector("main");
  var fase = "abertura";

  // pular: clique, toque, rolagem ou tecla
  abertura.addEventListener("pointerup", sair);
  abertura.addEventListener("wheel", sair, { passive: true });
  window.addEventListener("keydown", sair);

  /* ---------- a bonequinha aparece inteira e balança ---------- */
  window.scrollTo(0, 0);
  var duracao;
  if (reduzido) {
    duracao = 1600;
  } else {
    boneca.animate([{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "none" }],
      { duration: 400, easing: "ease-out" });
    // de um lado para o outro, como no balanço da assinatura do menu
    boneca.animate([
      { transform: "rotate(0deg)" },
      { transform: "rotate(-8deg)", offset: 0.16 },
      { transform: "rotate(8deg) translateX(0.12em)", offset: 0.38 },
      { transform: "rotate(-6deg)", offset: 0.6 },
      { transform: "rotate(5deg) translateX(0.08em)", offset: 0.8 },
      { transform: "rotate(0deg)" }
    ], { duration: 2400, delay: 350, easing: "ease-in-out" });
    duracao = 3000;
  }
  setTimeout(sair, duracao);

  /* ---------- saída: o papel é empurrado para cima ---------- */
  function sair() {
    if (fase !== "abertura") return;
    fase = "saindo";
    try { sessionStorage.setItem("introVista", "1"); } catch (e) {}
    var H = window.innerHeight, fim;
    if (reduzido) {
      fim = abertura.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
    } else {
      // a folha sai pelo topo e o site sobe colado na borda de baixo dela: mesma duração e curva
      var mov = { duration: 1100, delay: 150, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" };
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
})();
