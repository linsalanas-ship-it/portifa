/* Monta o site a partir de js/conteudo.js. Não é preciso editar este arquivo. */
(function () {
  "use strict";

  var menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- utilidades ----------
  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // "[A]LANA" → <span class="cap">A</span>LANA ; "<br>" vira quebra de linha
  function formatar(texto) {
    return escapar(texto)
      .replace(/&lt;br\s*\/?&gt;/gi, "<br>")
      .replace(/\[([^\]]+)\]/g, '<span class="cap">$1</span>');
  }

  // Versão sem marcações, para títulos de aba e textos alternativos
  function textoPuro(texto) {
    return String(texto).replace(/<br\s*\/?>/gi, " ").replace(/[[\]]/g, "");
  }

  function valor(caminho) {
    return caminho.split(".").reduce(function (obj, chave) {
      return obj == null ? obj : obj[chave];
    }, SITE);
  }

  function paragrafos(lista) {
    return (lista || []).map(function (p) {
      return "<p>" + formatar(p) + "</p>";
    }).join("");
  }

  function $(id) {
    return document.getElementById(id);
  }

  // ---------- comum às duas páginas ----------
  document.querySelectorAll("[data-campo]").forEach(function (el) {
    var v = valor(el.getAttribute("data-campo"));
    if (v != null) el.innerHTML = formatar(v);
  });

  document.querySelectorAll("[data-loja]").forEach(function (el) {
    el.href = SITE.lojaUrl || "#";
  });

  // O menu fixo assume a cor da seção que está passando por baixo dele
  var menu = $("menu");
  var secoes = Array.prototype.slice.call(document.querySelectorAll(".secao"));
  function atualizarMenu() {
    var y = menu.offsetHeight / 2;
    var tema = "tema-azul";
    for (var i = 0; i < secoes.length; i++) {
      var r = secoes[i].getBoundingClientRect();
      if (r.top <= y && r.bottom > y) {
        tema = secoes[i].classList.contains("tema-rosa") ? "tema-rosa" : "tema-azul";
        break;
      }
    }
    menu.classList.toggle("tema-rosa", tema === "tema-rosa");
    menu.classList.toggle("tema-azul", tema === "tema-azul");
  }
  window.addEventListener("scroll", atualizarMenu, { passive: true });
  window.addEventListener("resize", atualizarMenu);

  // ---------- página inicial ----------
  if ($("grade-projetos")) {
    $("grade-projetos").innerHTML = SITE.projetos.map(function (p) {
      var titulo = textoPuro(p.titulo);
      return (
        '<li class="card">' +
          '<a href="projeto.html?p=' + encodeURIComponent(p.id) + '">' +
            '<img src="' + escapar(p.capa) + '" alt="' + escapar(titulo) + '" loading="lazy">' +
            '<span class="card__info">' +
              '<span class="card__titulo">' + formatar(p.titulo) + "</span>" +
              '<span class="card__resumo">' + formatar(p.resumo) + "</span>" +
            "</span>" +
          "</a>" +
        "</li>"
      );
    }).join("");

    $("sobre-texto").innerHTML = paragrafos(SITE.sobre.texto);
    if (SITE.sobre.foto) $("sobre-foto").src = SITE.sobre.foto;
    else $("sobre-foto").remove();

    iniciarSopa();

    var c = SITE.contato;
    var links = [];
    if (c.email) links.push('<a href="mailto:' + escapar(c.email) + '">' + escapar(c.email) + "</a>");
    (c.redes || []).forEach(function (r) {
      links.push('<a href="' + escapar(r.url) + '" target="_blank" rel="noopener">' + escapar(r.nome) + "</a>");
    });
    $("contato-links").innerHTML = links.join('<span class="sep" aria-hidden="true">·</span>');

    iniciarFormulario();
    iniciarAbertura();
  }

  // ---------- página interna de projeto ----------
  if ($("projeto")) {
    var id = new URLSearchParams(location.search).get("p");
    var indice = -1;
    SITE.projetos.forEach(function (p, i) {
      if (p.id === id) indice = i;
    });
    if (indice === -1) {
      location.replace("index.html#projetos");
      return;
    }
    var p = SITE.projetos[indice];
    document.title = textoPuro(p.titulo) + " — Alana Lins";
    $("projeto-titulo").innerHTML = formatar(p.titulo);
    $("projeto-resumo").innerHTML = formatar(p.subtitulo || p.resumo);
    if (p.blocos) {
      // diagramação de revista, montada bloco a bloco
      $("projeto").classList.add("projeto--revista");
      ["projeto-banner", "projeto-texto", "projeto-galeria"].forEach(function (el) { $(el).remove(); });
      $("projeto-blocos").innerHTML = p.blocos.map(bloco).join("");
      ajustarCapitulares();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustarCapitulares);
      var aguardando = false;
      window.addEventListener("resize", function () {
        if (aguardando) return;
        aguardando = true;
        requestAnimationFrame(function () { aguardando = false; ajustarCapitulares(); });
      });
    } else {
      $("projeto-blocos").remove();
      paginaSimples(p);
    }

    var nav = '<a href="index.html#projetos">← todos os projetos</a>';
    if (SITE.projetos.length > 1) {
      var proximo = SITE.projetos[(indice + 1) % SITE.projetos.length];
      nav += '<a href="projeto.html?p=' + encodeURIComponent(proximo.id) + '">' +
        "próximo: " + escapar(textoPuro(proximo.titulo)) + " →</a>";
    }
    $("projeto-navegacao").innerHTML = nav;
  }

  function paginaSimples(p) {
    var banner = $("projeto-banner");
    if (p.banner) {
      banner.src = p.banner;
      banner.alt = textoPuro(p.titulo);
    } else {
      banner.remove();
    }
    $("projeto-texto").innerHTML = paragrafos(p.texto);
    $("projeto-galeria").innerHTML = (p.galeria || []).map(function (src) {
      return '<img src="' + escapar(src) + '" alt="" loading="lazy">';
    }).join("");
  }

  // Capitular só quando o primeiro parágrafo do bloco tem 3 linhas ou mais
  // (medido sem a capitular, e de novo quando a largura da tela muda)
  function ajustarCapitulares() {
    document.querySelectorAll(".bloco--texto > p:first-child").forEach(function (p) {
      p.classList.add("sem-capitular");
      var altura = parseFloat(getComputedStyle(p).lineHeight) || 1;
      var linhas = Math.round(p.getBoundingClientRect().height / altura);
      if (linhas >= 3) p.classList.remove("sem-capitular");
    });
  }

  // Um bloco da página de projeto (tipos explicados no topo do conteudo.js)
  function figura(src, legenda) {
    return '<figure><img src="' + escapar(src) + '" alt="' + escapar(legenda || "") + '" loading="lazy">' +
      (legenda ? "<figcaption>" + formatar(legenda) + "</figcaption>" : "") + "</figure>";
  }
  // título + frases + palavras + texto (todos opcionais), usado por "topico" e "itens"
  function topico(t) {
    var texto = [].concat(t.texto || []);
    return (t.titulo ? '<h4 class="item__titulo">' + formatar(t.titulo) + "</h4>" : "") +
      (t.frases ? '<div class="topico__frases">' + paragrafos(t.frases) + "</div>" : "") +
      (t.palavras ? '<ul class="topico__palavras">' + t.palavras.map(function (w) {
        return "<li>" + formatar(w) + "</li>";
      }).join("") + "</ul>" : "") +
      paragrafos(texto);
  }
  function idYoutube(url) {
    var m = String(url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function bloco(b) {
    switch (b.tipo) {
      case "lide":
        return '<div class="bloco bloco--lide">' + paragrafos(b.texto) + "</div>";
      case "texto":
        var variacao = b.colunas === 2 ? " bloco--duas-colunas" : b.alinhamento === "centro" ? " bloco--centro" : "";
        return '<div class="bloco bloco--texto' + variacao + '">' +
          paragrafos(b.texto) + "</div>";
      case "foto":
        // com "animacao", a foto vira um vídeo curto que toca sozinho, sem som e em repetição
        // (como um gif); a foto aparece enquanto ele carrega e para quem prefere menos movimento
        var conteudo = b.animacao && !menosMovimento
          ? '<figure><video poster="' + escapar(b.src) + '"' +
            ' autoplay muted loop playsinline preload="auto" aria-label="' + escapar(b.legenda || "") + '">' +
            // uma versão .webm com o mesmo nome, se existir, é usada pelos navegadores que preferem esse formato
            '<source src="' + escapar(b.animacao.replace(/\.mp4$/i, ".webm")) + '" type="video/webm">' +
            '<source src="' + escapar(b.animacao) + '" type="video/mp4"></video>' +
            (b.legenda ? "<figcaption>" + formatar(b.legenda) + "</figcaption>" : "") + "</figure>"
          : figura(b.src, b.legenda);
        return '<div class="bloco bloco--foto' + (b.largura === "wide" ? " bloco--wide" : "") + '">' +
          conteudo + "</div>";
      case "fotos":
        return '<div class="bloco bloco--fotos">' + [].concat(b.src).map(function (src, i) {
          return figura(src, b.legendas && b.legendas[i]);
        }).join("") + "</div>";
      case "foto-solta":
        return '<div class="bloco bloco--foto-solta bloco--' + (b.lado === "esquerda" ? "esquerda" : "direita") + '">' +
          figura(b.src, b.legenda) + "</div>";
      case "galeria":
        var lista = [].concat(b.src || []);
        return '<div class="bloco bloco--galeria">' +
          (b.titulo ? '<h4 class="item__titulo galeria__titulo">' + formatar(b.titulo) + "</h4>" : "") +
          '<div class="galeria__itens" style="--n:' + Math.min(lista.length, 3) + '">' +
          lista.map(function (src, i) { return figura(src, b.legendas && b.legendas[i]); }).join("") +
          "</div></div>";
      case "foto-texto":
        return '<div class="bloco bloco--foto-texto' + (b.lado === "direita" ? " bloco--foto-direita" : "") + '">' +
          figura(b.src, b.legenda) + '<div class="bloco__texto">' + paragrafos(b.texto) + "</div></div>";
      case "intertitulo":
        return '<h2 class="bloco bloco--intertitulo">' + formatar(b.texto) + "</h2>";
      case "itens":
        return '<div class="bloco bloco--itens">' +
          (b.titulo ? '<h3 class="itens__titulo">' + formatar(b.titulo) + "</h3>" : "") +
          '<ul class="itens__lista">' + (b.itens || []).map(function (it) {
            return "<li>" + topico(it) + "</li>";
          }).join("") + "</ul></div>";
      case "topico":
        return '<div class="bloco bloco--topico">' + topico(b) + "</div>";
      case "video":
        var vid = idYoutube(b.url);
        if (!vid) return "";
        // o link de trás aparece só se o vídeo não puder carregar (ex.: prévia sem acesso ao YouTube)
        return '<div class="bloco bloco--video"><div class="video__quadro">' +
          '<a class="video__reserva" href="https://www.youtube.com/watch?v=' + vid + '" target="_blank" rel="noopener">▶ assistir ao vídeo no YouTube</a>' +
          '<iframe src="https://www.youtube.com/embed/' + vid + '" title="' + escapar(b.titulo || "Vídeo") + '"' +
          ' loading="lazy" referrerpolicy="strict-origin-when-cross-origin"' +
          ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
          ' allowfullscreen></iframe></div>' +
          '<p class="video__link"><a href="https://www.youtube.com/watch?v=' + vid + '" target="_blank" rel="noopener">assistir no YouTube ↗</a></p></div>';
      case "destaque":
        return '<blockquote class="bloco bloco--destaque"><p>' + formatar(b.texto) + "</p></blockquote>";
      case "botao":
        return '<p class="bloco bloco--botao"><a class="botao" href="' + escapar(b.url) +
          '" target="_blank" rel="noopener">' + formatar(b.texto) + " ↗</a></p>";
      default:
        return "";
    }
  }

  atualizarMenu();

  // ---------- abertura: header 1 → header 2 → header 3 ----------
  function iniciarAbertura() {
    var raiz = document.documentElement;
    var intro = $("intro");
    if (!raiz.classList.contains("com-intro")) {
      intro.remove();
      return;
    }
    var timers = [];
    var encerrada = false;
    var eventos = ["click", "keydown", "wheel", "touchstart"];

    function depois(ms, fn) {
      timers.push(setTimeout(fn, ms));
    }
    function etapa(classe) {
      return function () { intro.classList.add(classe); };
    }

    // Termina a abertura: revela o header 3, depois o título, depois o menu.
    // "pulou" = a pessoa clicou/rolou, então tudo acontece mais rápido.
    function encerrar(pulou) {
      if (encerrada) return;
      encerrada = true;
      timers.forEach(clearTimeout);
      eventos.forEach(function (ev) { window.removeEventListener(ev, pular); });
      try { sessionStorage.setItem("introVista", "1"); } catch (e) {}

      intro.classList.add("intro--fim");
      var t = pulou ? 300 : 700;
      setTimeout(function () { raiz.classList.add("hero-visivel"); }, t);
      setTimeout(function () { raiz.classList.add("menu-visivel"); }, t + (pulou ? 200 : 700));
      setTimeout(function () {
        raiz.classList.remove("com-intro", "hero-visivel", "menu-visivel");
        intro.remove();
      }, t + 1700);
    }
    function pular() { encerrar(true); }

    // Header 1: cor → frase. Header 2: cor → rostinho. Depois, header 3.
    depois(60, etapa("intro--cor-1"));
    depois(900, etapa("intro--conteudo-1"));
    depois(3100, etapa("intro--cor-2"));
    depois(3900, etapa("intro--conteudo-2"));
    depois(7000, function () { encerrar(false); });
    eventos.forEach(function (ev) {
      window.addEventListener(ev, pular, { passive: true });
    });
  }

  // ---------- sopa de letrinhas: serviços flutuando ----------
  function iniciarSopa() {
    var area = $("sopa");
    var legenda = $("sopa-descricao");
    var itens = SITE.servicos.lista.map(function (s) {
      return typeof s === "string" ? { nome: s, descricao: "" } : s;
    });
    var letras = itens.map(function (it, i) {
      var el = document.createElement("button");
      el.type = "button";
      el.className = "sopa__letra";
      el.innerHTML = formatar(it.nome);
      el.setAttribute("aria-pressed", "false");
      area.appendChild(el);
      return {
        el: el, item: it,
        x: 0, y: 0,
        // direção e velocidade diferentes para cada palavra (px por segundo)
        vx: (i % 2 ? 1 : -1) * (14 + i * 3), vy: (i % 3 ? 1 : -1) * (10 + i * 2),
        fase: i * 1.7, w: 0, h: 0,
      };
    });
    var escolhida = null;
    // o balão da descrição também é um obstáculo: as outras palavras desviam dele
    var balao = { fixa: true, ativo: false, x: 0, y: 0, w: 0, h: 0 };
    function parada(l) { return l === escolhida || l.fixa; }

    function medir() {
      var W = area.clientWidth, H = area.clientHeight;
      letras.forEach(function (l, i) {
        l.w = l.el.offsetWidth; l.h = l.el.offsetHeight;
        if (!l.posicionada) {
          // posição inicial espalhada em faixas, para não começarem amontoadas
          l.x = ((i * 37) % 100) / 100 * Math.max(W - l.w, 0);
          l.y = (i + 0.5) / letras.length * Math.max(H - l.h, 0);
          l.posicionada = true;
        }
        l.x = Math.min(Math.max(l.x, 0), Math.max(W - l.w, 0));
        l.y = Math.min(Math.max(l.y, 0), Math.max(H - l.h, 0));
      });
    }

    function pintar(t) {
      letras.forEach(function (l) {
        var giro = menosMovimento || l === escolhida ? 0 : Math.sin(t / 1400 + l.fase) * 4;
        l.el.style.transform = "translate(" + l.x.toFixed(1) + "px," + l.y.toFixed(1) + "px) rotate(" + giro.toFixed(2) + "deg)";
      });
    }

    var antes = 0, visivel = true, rodando = false;
    function passo(t) {
      var dt = Math.min((t - (antes || t)) / 1000, 0.05);
      antes = t;
      var W = area.clientWidth, H = area.clientHeight;
      letras.forEach(function (l) {
        if (l === escolhida) return; // a escolhida para de flutuar
        var ritmo = l.el.matches(":hover") ? 0.25 : 1; // devagar sob o cursor
        l.x += l.vx * dt * ritmo;
        l.y += l.vy * dt * ritmo;
        if (l.x < 0) { l.x = 0; l.vx = Math.abs(l.vx); }
        if (l.y < 0) { l.y = 0; l.vy = Math.abs(l.vy); }
        if (l.x > W - l.w) { l.x = Math.max(W - l.w, 0); l.vx = -Math.abs(l.vx); }
        if (l.y > H - l.h) { l.y = Math.max(H - l.h, 0); l.vy = -Math.abs(l.vy); }
      });
      // palavras que se encostam se afastam devagar, como letrinhas no caldo
      var corpos = balao.ativo ? letras.concat([balao]) : letras;
      for (var i = 0; i < corpos.length; i++) {
        for (var j = i + 1; j < corpos.length; j++) {
          var a = corpos[i], b = corpos[j];
          var sx = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          var sy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (sx > 0 && sy > 0) {
            var empurra = (sy < sx ? 1 : 0);
            var dir;
            if (empurra) {
              dir = a.y < b.y ? -1 : 1;
              if (!parada(a)) { a.vy = dir * Math.abs(a.vy); a.y += dir * sy / 2; }
              if (!parada(b)) { b.vy = -dir * Math.abs(b.vy); b.y -= dir * sy / 2; }
            } else {
              dir = a.x < b.x ? -1 : 1;
              if (!parada(a)) { a.vx = dir * Math.abs(a.vx); a.x += dir * sx / 2; }
              if (!parada(b)) { b.vx = -dir * Math.abs(b.vx); b.x -= dir * sx / 2; }
            }
          }
        }
      }
      pintar(t);
      if (visivel && !menosMovimento) requestAnimationFrame(passo);
      else rodando = false;
    }
    function animar() {
      if (rodando || menosMovimento) return;
      rodando = true; antes = 0;
      requestAnimationFrame(passo);
    }

    function escolher(l) {
      if (escolhida) {
        escolhida.el.classList.remove("sopa__letra--ativa");
        escolhida.el.setAttribute("aria-pressed", "false");
      }
      if (!l || l === escolhida) {
        escolhida = null;
        balao.ativo = false;
        legenda.classList.remove("sopa__descricao--visivel");
        return;
      }
      escolhida = l;
      l.el.classList.add("sopa__letra--ativa");
      l.el.setAttribute("aria-pressed", "true");
      legenda.innerHTML = formatar(l.item.descricao || "");
      pintar(performance.now());
      posicionarBalao();
      legenda.classList.add("sopa__descricao--visivel");
      balao.ativo = true;
    }

    // balão logo abaixo da palavra; se não couber embaixo, vai para cima
    function posicionarBalao() {
      if (!escolhida) return;
      var l = escolhida, W = area.clientWidth, H = area.clientHeight, folga = 6;
      legenda.style.maxWidth = Math.min(W, 352) + "px";
      var w = legenda.offsetWidth, h = legenda.offsetHeight;
      var x = Math.min(Math.max(l.x + l.w / 2 - w / 2, 0), Math.max(W - w, 0));
      var y = l.y + l.h + folga;
      var acima = false;
      if (y + h > H) { y = Math.max(l.y - h - folga, 0); acima = true; }
      legenda.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      legenda.classList.toggle("sopa__descricao--acima", acima);
      balao.x = x; balao.y = y; balao.w = w; balao.h = h;
    }
    letras.forEach(function (l) {
      l.el.addEventListener("click", function (e) { e.stopPropagation(); escolher(l); });
    });
    area.addEventListener("click", function (e) { if (!legenda.contains(e.target)) escolher(null); });

    medir();
    pintar(0);
    window.addEventListener("resize", function () { medir(); pintar(performance.now()); posicionarBalao(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { medir(); pintar(0); });
    // só anima quando a seção está na tela
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        visivel = e[0].isIntersecting;
        if (visivel) animar();
      }).observe(area);
    } else {
      animar();
    }
  }

  // ---------- formulário de contato ----------
  function iniciarFormulario() {
    var form = $("form-contato");
    var status = $("form-status");
    var c = SITE.contato;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var dados = new FormData(form);

      if (c.formspree) {
        status.textContent = "enviando…";
        fetch(c.formspree, {
          method: "POST",
          body: dados,
          headers: { Accept: "application/json" },
        }).then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.textContent = "mensagem enviada. obrigada!";
        }).catch(function () {
          status.textContent = "não consegui enviar. tente pelo e-mail abaixo.";
        });
        return;
      }

      var assunto = "Contato pelo site — " + dados.get("nome");
      var corpo = dados.get("mensagem") + "\n\n" + dados.get("nome") + " · " + dados.get("email");
      location.href = "mailto:" + c.email +
        "?subject=" + encodeURIComponent(assunto) +
        "&body=" + encodeURIComponent(corpo);
      status.textContent = "abrindo seu programa de e-mail…";
    });
  }
})();
