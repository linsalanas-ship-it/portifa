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

  // "<br>" vira quebra de linha; colchetes antigos ("[A]LANA") são só removidos
  function formatar(texto) {
    return escapar(texto)
      .replace(/&lt;br\s*\/?&gt;/gi, "<br>")
      .replace(/\[([^\]]+)\]/g, "$1");
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

  // loja: sem link, o clique mostra "em breve" logo abaixo
  document.querySelectorAll("[data-loja]").forEach(function (el) {
    if (SITE.lojaUrl) { el.href = SITE.lojaUrl; return; }
    el.removeAttribute("target");
    el.setAttribute("aria-describedby", "loja-aviso");
    var aviso = document.createElement("span");
    aviso.className = "menu__aviso";
    aviso.id = "loja-aviso";
    aviso.setAttribute("role", "status");
    el.appendChild(aviso);
    var t;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      aviso.textContent = "em breve";
      aviso.classList.add("menu__aviso--visivel");
      clearTimeout(t);
      t = setTimeout(function () { aviso.classList.remove("menu__aviso--visivel"); }, 2200);
    });
  });


  // risco de lápis que aparece sob o título do card no hover (ver .risco no CSS)
  var RISCO = '<svg class="risco" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">' +
    '<path d="M1 6.2 C 22 4.6, 48 7.4, 70 5.4 S 92 4.4, 99 5.6"/><path d="M8 8.2 C 30 7, 60 8.6, 94 7.2"/></svg>';

  // menu: sublinhado de lápis, o mesmo risco dos títulos dos projetos
  document.querySelectorAll(".menu nav a").forEach(function (a) {
    a.insertAdjacentHTML("beforeend", RISCO);
  });

  // ---------- página inicial ----------
  if ($("grade-projetos")) {
    $("grade-projetos").innerHTML = SITE.projetos.map(function (p) {
      var titulo = textoPuro(p.titulo);
      return (
        '<li class="card">' +
          '<a href="projeto.html?p=' + encodeURIComponent(p.id) + '">' +
            '<img src="' + escapar(p.capa) + '" alt="' + escapar(titulo) + '" loading="lazy">' +
            '<span class="card__info">' +
              '<span class="card__titulo">' + formatar(p.titulo) + RISCO + "</span>" +
              '<span class="card__resumo">' + formatar(p.resumo) + "</span>" +
            "</span>" +
          "</a>" +
        "</li>"
      );
    }).join("");

    iniciarSobre();
    iniciarPassagem();

    iniciarSopa();
    iniciarNome();

    var c = SITE.contato;
    var links = [];
    // o e-mail já aparece no subtítulo e no botão; aqui ficam só as redes (se houver)
    if (c.email && !c.descricao) links.push('<a href="mailto:' + escapar(c.email) + '">' + escapar(c.email) + "</a>");
    (c.redes || []).forEach(function (r) {
      links.push('<a href="' + escapar(r.url) + '" target="_blank" rel="noopener">' + escapar(r.nome) + "</a>");
    });
    $("contato-links").innerHTML = links.join('<span class="sep" aria-hidden="true">·</span>');
    // subtítulo do contato: o e-mail escrito nele vira link
    if (c.descricao && $("contato-sub")) {
      var sub = formatar(c.descricao);
      if (c.email) sub = sub.replace(escapar(c.email), '<a href="mailto:' + escapar(c.email) + '">' + escapar(c.email) + "</a>");
      $("contato-sub").innerHTML = sub;
    }

    iniciarFormulario();
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
    if (p.mesa) {
      // mesa de folhas: quem monta é o js/mesa.js
      ["projeto-banner", "projeto-texto", "projeto-galeria", "projeto-blocos", "projeto-navegacao"].forEach(function (el) { $(el).remove(); });
      return;
    } else if (p.blocos) {
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
          '<p class="video__link micro"><a href="https://www.youtube.com/watch?v=' + vid + '" target="_blank" rel="noopener">assistir no YouTube ↗</a></p></div>';
      case "destaque":
        return '<blockquote class="bloco bloco--destaque"><p>' + formatar(b.texto) + "</p></blockquote>";
      case "botao":
        return '<p class="bloco bloco--botao"><a class="botao" href="' + escapar(b.url) +
          '" target="_blank" rel="noopener">' + formatar(b.texto) + " ↗</a></p>";
      default:
        return "";
    }
  }


  // ---------- nome gigante, títulos letra a letra e post-it ----------
  function iniciarNome() {
    var nome = $("nome");
    var palavras = textoPuro(SITE.abertura.nome).trim().split(/\s+/);
    var grupos = [];

    // cada letra vira um span com as duas versões guardadas
    function letra(alta, mista) {
      var l = document.createElement("span");
      l.className = "l";
      l.setAttribute("data-alta", alta);
      l.setAttribute("data-mista", mista);
      l.textContent = alta;
      return l;
    }

    // nome: 1ª palavra na linha de cima, o resto na de baixo
    var linhas = nome.querySelectorAll(".linha");
    var letrasNome = [];
    [palavras[0], palavras.slice(1).join(" ")].forEach(function (pal, n) {
      for (var i = 0; i < pal.length; i++) {
        var mista = i === 0 ? pal[i].toUpperCase() : pal[i].toLowerCase();
        var l = letra(pal[i].toUpperCase(), mista);
        linhas[n].appendChild(l);
        letrasNome.push(l);
      }
    });
    nome.setAttribute("aria-label", palavras.join(" "));
    grupos.push(letrasNome);

    // títulos de seção: mesmas letras soltas; na caixa mista ficam como no conteudo.js
    document.querySelectorAll("#projetos .titulo, #servicos .titulo, #contato .titulo").forEach(function (h) {
      var txt = h.textContent.trim(), grupo = [];
      h.setAttribute("aria-label", txt);
      h.innerHTML = "";
      txt.split(" ").forEach(function (w, wi, todas) {
        var pal = document.createElement("span");
        pal.className = "palavra";
        pal.setAttribute("aria-hidden", "true");
        for (var i = 0; i < w.length; i++) {
          var l = letra(w[i].toUpperCase(), w[i]);
          pal.appendChild(l);
          grupo.push(l);
        }
        h.appendChild(pal);
        if (wi < todas.length - 1) h.appendChild(document.createTextNode(" "));
      });
      grupos.push(grupo);
    });

    // tamanho: a palavra mais larga (em caixa alta ou mista) enche a largura
    var medidor = document.createElement("span");
    medidor.setAttribute("aria-hidden", "true");
    medidor.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;font-size:100px;letter-spacing:-0.03em";
    document.body.appendChild(medidor);
    function largura(texto) {
      medidor.style.fontWeight = getComputedStyle(nome).fontWeight;
      medidor.textContent = texto;
      return medidor.getBoundingClientRect().width;
    }
    function ajustar() {
      var maior = 0;
      [palavras[0], palavras.slice(1).join(" ")].forEach(function (pal) {
        var mista = pal.charAt(0).toUpperCase() + pal.slice(1).toLowerCase();
        maior = Math.max(maior, largura(pal.toUpperCase()), largura(mista));
      });
      if (maior) nome.style.fontSize = (100 * nome.clientWidth * 0.99 / maior).toFixed(1) + "px";
    }
    ajustar();
    window.addEventListener("resize", ajustar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustar);

    // alterna caixa alta e mista a cada 3,2 s, uma letra por vez (70 ms entre elas)
    var emAlta = true;
    function trocarCaixa() {
      emAlta = !emAlta;
      grupos.forEach(function (g) {
        g.forEach(function (l, i) {
          setTimeout(function () {
            l.textContent = l.getAttribute(emAlta ? "data-alta" : "data-mista");
          }, i * 70);
        });
      });
    }
    if (!menosMovimento) {
      setInterval(function () { if (!document.hidden) trocarCaixa(); }, 3200);
    }

    // post-it arrastável com mouse ou dedo (a posição não é salva)
    var etq = $("etiqueta"), arrasto = null, desloc = { x: 0, y: 0 };
    etq.addEventListener("pointerdown", function (e) {
      arrasto = { x: e.clientX - desloc.x, y: e.clientY - desloc.y };
      etq.setPointerCapture(e.pointerId);
      etq.classList.add("arrastando");
    });
    etq.addEventListener("pointermove", function (e) {
      if (!arrasto) return;
      desloc = { x: e.clientX - arrasto.x, y: e.clientY - arrasto.y };
      etq.style.setProperty("--dx", desloc.x + "px");
      etq.style.setProperty("--dy", desloc.y + "px");
    });
    ["pointerup", "pointercancel"].forEach(function (t) {
      etq.addEventListener(t, function () { arrasto = null; etq.classList.remove("arrastando"); });
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
      if (it.peso) el.style.fontWeight = it.peso;
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
    var FOLGA = 10; // distância mínima entre as palavras e o balão aberto
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
          if (parada(a) && parada(b)) continue;
          // o balão e a palavra escolhida ganham uma margem: as outras passam longe
          var m = parada(a) || parada(b) ? FOLGA : 0;
          var sx = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + m;
          var sy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + m;
          if (sx > m && sy > m || (m && sx > 0 && sy > 0)) {
            // quem está parado não se mexe: a outra palavra sai inteira do caminho
            var pa = parada(a) ? 0 : parada(b) ? 1 : 0.5, pb = 1 - pa;
            var dir;
            if (sy < sx) {
              dir = a.y < b.y ? -1 : 1;
              if (!parada(a)) { a.vy = dir * Math.abs(a.vy); a.y += dir * sy * pa; }
              if (!parada(b)) { b.vy = -dir * Math.abs(b.vy); b.y -= dir * sy * pb; }
            } else {
              dir = a.x < b.x ? -1 : 1;
              if (!parada(a)) { a.vx = dir * Math.abs(a.vx); a.x += dir * sx * pa; }
              if (!parada(b)) { b.vx = -dir * Math.abs(b.vx); b.x -= dir * sx * pb; }
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
      l.w = l.el.offsetWidth; l.h = l.el.offsetHeight; // em 800 a palavra fica mais larga
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
      l.el.addEventListener("click", function (e) {
        e.stopPropagation();
        if (l === escolhida && e.pointerType === "mouse") return; // com mouse, o hover já abriu
        escolher(l);
      });
      // com mouse, o balão abre só de passar por cima
      l.el.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse" && l !== escolhida) escolher(l); });
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

  // ---------- sobre: a bio abre como uma folha por cima da página ----------
  function iniciarSobre() {
    var sobre = $("sobre"), folha = sobre.querySelector(".sobre__folha");
    var fundo = sobre.querySelector(".sobre__fundo"), fechar = sobre.querySelector(".sobre__fechar");
    var link = $("abrir-sobre"), focoAntes = null;
    var s = SITE.sobre;
    $("sobre-texto").innerHTML = paragrafos(s.texto);
    $("sobre-foto").src = s.foto;
    var ICONES = {
      instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>',
      substack: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 3.5h15v2.3h-15zM4.5 7.9h15v2.3h-15zM4.5 12.3h15v8.4l-7.5-4.2-7.5 4.2z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>'
    };
    $("sobre-redes").innerHTML = (s.redes || []).map(function (r) {
      return '<a href="' + escapar(r.url) + '" target="_blank" rel="noopener" aria-label="' + escapar(r.rotulo || r.nome) + '">' +
        (ICONES[r.nome] || "") + "<span>" + escapar(r.nome) + "</span></a>";
    }).join("");

    function abrir(e) {
      if (e) e.preventDefault();
      if (!sobre.hidden) return;
      focoAntes = document.activeElement;
      sobre.hidden = false;
      document.documentElement.classList.add("travado");
      if (!menosMovimento) {
        fundo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
        // entra subindo de baixo, passa um pouco do ponto e assenta em -1,2°
        folha.animate([
          { transform: "translateY(110vh) rotate(-4deg)" },
          { transform: "translateY(-10px) rotate(-0.6deg)", offset: 0.75 },
          { transform: "rotate(-1.2deg)" }
        ], { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" });
      }
      sobre.scrollTop = 0;
      folha.focus({ preventScroll: true });
    }
    function fecharSobre() {
      if (sobre.hidden) return;
      function fim() {
        sobre.hidden = true;
        document.documentElement.classList.remove("travado");
        if (focoAntes && focoAntes.focus) focoAntes.focus();
      }
      if (menosMovimento) return fim();
      var f = fundo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, fill: "forwards" });
      var a = folha.animate([
        { transform: "rotate(-1.2deg)" },
        { transform: "translateY(110vh) rotate(3deg)" }
      ], { duration: 420, easing: "cubic-bezier(.6,0,.8,.4)", fill: "forwards" });
      a.onfinish = function () { fim(); a.cancel(); f.cancel(); };
    }
    link.addEventListener("click", abrir);
    sobre.querySelectorAll("[data-fechar]").forEach(function (el) { el.addEventListener("click", fecharSobre); });
    document.addEventListener("keydown", function (e) {
      if (sobre.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); fecharSobre(); }
      // o foco fica dentro do card enquanto ele está aberto
      if (e.key === "Tab") {
        var itens = Array.prototype.slice.call(folha.querySelectorAll("button, a[href]"));
        var i = itens.indexOf(document.activeElement);
        e.preventDefault();
        itens[(i + (e.shiftKey ? itens.length - 1 : 1)) % itens.length].focus();
      }
    });
    function pelaUrl() { if (location.hash === "#sobre") setTimeout(abrir, 0); }
    pelaUrl();
    window.addEventListener("hashchange", pelaUrl);
  }

  // ---------- passagem entre seções: cada uma sobe como uma folha nova ----------
  function iniciarPassagem() {
    if (menosMovimento) return;
    var secoes = Array.prototype.slice.call(document.querySelectorAll("main > .secao")).slice(1);
    var pendente = false;
    function atualizar() {
      pendente = false;
      var H = window.innerHeight;
      secoes.forEach(function (el) {
        // progresso: o topo da seção vai da borda de baixo da tela até 60% da altura
        var topo = el.getBoundingClientRect().top - (parseFloat(el.style.getPropertyValue("--sobe")) || 0);
        var p = Math.min(Math.max((H - topo) / (H * 0.4), 0), 1);
        var suave = 1 - Math.pow(1 - p, 3); // ease-out
        var y = (70 * (1 - suave)).toFixed(1);
        el.style.setProperty("--sobe", y + "px");
        el.style.transform = "translateY(" + y + "px)";
      });
    }
    function pedir() { if (!pendente) { pendente = true; requestAnimationFrame(atualizar); } }
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    atualizar();
  }

  // ---------- contato: botão de e-mail que vira aviãozinho ----------
  function iniciarFormulario() {
    var c = SITE.contato;
    var botao = $("fale");
    if (!botao) return;
    botao.textContent = c.botao || "fale comigo";
    botao.href = "mailto:" + c.email + (c.assunto ? "?subject=" + encodeURIComponent(c.assunto) : "");

    // aviãozinho de papel que sai do botão e voa até o canto superior direito
    function voar(origem) {
      var aviao = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      aviao.setAttribute("viewBox", "0 0 48 48");
      aviao.setAttribute("class", "aviao");
      aviao.setAttribute("aria-hidden", "true");
      aviao.innerHTML = '<g fill="none" stroke="#0000ec" stroke-width="2" stroke-linejoin="round"><path d="M4 24 44 6 34 42 22 30Z" fill="#F1EBE1"/><path d="M44 6 22 30 20 40 26 33"/></g>';
      document.body.appendChild(aviao);
      var x0 = origem.left + origem.width / 2 - 23, y0 = origem.top + origem.height / 2 - 23;
      var dx = window.innerWidth - x0 + 60, dy = -y0 - 80;
      aviao.animate([
        { transform: "translate(" + x0 + "px," + y0 + "px) rotate(0deg) scale(.6)", opacity: 0 },
        { transform: "translate(" + (x0 - 40) + "px," + (y0 + 30) + "px) rotate(-10deg) scale(1)", opacity: 1, offset: 0.18 },
        { transform: "translate(" + (x0 + dx * 0.45) + "px," + (y0 + dy * 0.2) + "px) rotate(-18deg) scale(1)", offset: 0.6 },
        { transform: "translate(" + (x0 + dx) + "px," + (y0 + dy) + "px) rotate(-30deg) scale(.8)", opacity: 1 }
      ], { duration: 1300, easing: "cubic-bezier(.45,0,.3,1)" }).onfinish = function () { aviao.remove(); };
    }

    // ao clicar, o botão se dobra e vira o aviãozinho; o e-mail abre normalmente
    botao.addEventListener("click", function () {
      if (menosMovimento) return;
      var r = botao.getBoundingClientRect();
      botao.animate([
        { transform: "none", opacity: 1 },
        { transform: "scale(.4) rotate(-12deg)", opacity: 0, offset: 0.25 },
        { transform: "scale(.4) rotate(-12deg)", opacity: 0, offset: 0.8 },
        { transform: "none", opacity: 1 }
      ], { duration: 1900, easing: "ease-out" });
      setTimeout(function () { voar(r); }, 180);
    });
  }
})();
