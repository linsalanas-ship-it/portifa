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
    $("projeto-resumo").innerHTML = formatar(p.resumo);
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

    var nav = '<a href="index.html#projetos">← todos os projetos</a>';
    if (SITE.projetos.length > 1) {
      var proximo = SITE.projetos[(indice + 1) % SITE.projetos.length];
      nav += '<a href="projeto.html?p=' + encodeURIComponent(proximo.id) + '">' +
        "próximo: " + escapar(textoPuro(proximo.titulo)) + " →</a>";
    }
    $("projeto-navegacao").innerHTML = nav;
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

    function encerrar() {
      if (encerrada) return;
      encerrada = true;
      timers.forEach(clearTimeout);
      intro.classList.add("intro--fim");
      try { sessionStorage.setItem("introVista", "1"); } catch (e) {}
      setTimeout(function () {
        raiz.classList.remove("com-intro");
        intro.remove();
      }, 700);
      ["click", "keydown", "wheel", "touchstart"].forEach(function (ev) {
        window.removeEventListener(ev, encerrar);
      });
    }

    timers.push(setTimeout(function () { intro.classList.add("intro--passo-2"); }, 2400));
    timers.push(setTimeout(encerrar, 4800));
    ["click", "keydown", "wheel", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, encerrar, { passive: true });
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
