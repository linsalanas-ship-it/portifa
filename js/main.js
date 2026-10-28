/* Monta o site a partir de js/conteudo.js. Não é preciso editar este arquivo. */
(function () {
  "use strict";

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

    $("lista-servicos").innerHTML = SITE.servicos.lista.map(function (s) {
      return "<li>" + formatar(s) + "</li>";
    }).join("");

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
        return '<div class="bloco bloco--texto' + (b.colunas === 1 ? " bloco--uma-coluna" : "") + '">' +
          paragrafos(b.texto) + "</div>";
      case "foto":
        return '<div class="bloco bloco--foto">' + figura(b.src, b.legenda) + "</div>";
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
        return '<div class="bloco bloco--video"><div class="video__quadro">' +
          '<iframe src="https://www.youtube-nocookie.com/embed/' + vid + '" title="' + escapar(b.titulo || "Vídeo") + '"' +
          ' loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
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
