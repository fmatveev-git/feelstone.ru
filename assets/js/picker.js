/* Блок «Подберите цвет шара»: вкладки «Браслет / Кольцо», палитра шаров и
   наложение выбранного шара на фото. Данные — в picker-data.js. */
(function(){
  var frame = document.getElementById("frame");
  var grid = document.getElementById("balls");
  var nowName = document.getElementById("now-name");
  var nowSub = document.getElementById("now-sub");
  var cap = document.getElementById("photo-cap");
  var tabs = {
    bracelet: document.getElementById("tab-bracelet"),
    ring: document.getElementById("tab-ring")
  };
  if (!frame || !grid) return;

  var state = { item: "bracelet", color: -1 }; /* -1 — исходный шар, как на фото */
  var overlays = [];

  function buildFrame(){
    var m = DATA.items[state.item], b = m.box;
    frame.innerHTML = "";
    var base = document.createElement("img");
    base.src = m.base; base.alt = m.title; base.width = m.w; base.height = m.h;
    frame.appendChild(base);
    overlays = m.vars.map(function(src){
      var o = document.createElement("img");
      o.className = "ov"; o.alt = ""; o.src = src;
      o.style.left = (b[0] / m.w * 100) + "%";
      o.style.top = (b[1] / m.h * 100) + "%";
      o.style.width = ((b[2] - b[0]) / m.w * 100) + "%";
      frame.appendChild(o);
      return o;
    });
    cap.textContent = m.cap;
  }

  function addBall(i, name, setup){
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "ball";
    btn.dataset.i = i;
    var dot = document.createElement("span");
    dot.className = "dot"; dot.setAttribute("aria-hidden", "true");
    setup(dot);
    var label = document.createElement("span");
    label.textContent = name;
    btn.appendChild(dot); btn.appendChild(label);
    btn.addEventListener("click", function(){ pick(i); });
    grid.appendChild(btn);
  }

  function buildGrid(){
    var m = DATA.items[state.item];
    grid.innerHTML = "";
    addBall(-1, m.orig, function(d){ d.classList.add(m.origClass); });
    DATA.cols.forEach(function(c, i){
      addBall(i, c[0], function(d){
        d.classList.add("real");
        d.style.background = c[1] + " url(" + DATA.sw[i] + ") center/cover no-repeat";
      });
    });
  }

  function pick(i){
    var m = DATA.items[state.item];
    state.color = i;
    overlays.forEach(function(o, k){ o.classList.toggle("on", k === i); });
    grid.querySelectorAll(".ball").forEach(function(btn){
      btn.setAttribute("aria-pressed", +btn.dataset.i === i ? "true" : "false");
    });
    nowName.textContent = i < 0 ? m.orig : DATA.cols[i][0];
    nowSub.textContent = i < 0 ? "Как на фото" : m.title + " · шар «" + DATA.cols[i][0].toLowerCase() + "»";
  }

  function setItem(item){
    state.item = item;
    Object.keys(tabs).forEach(function(k){
      tabs[k].setAttribute("aria-selected", k === item ? "true" : "false");
    });
    buildFrame(); buildGrid(); pick(-1);
  }

  Object.keys(tabs).forEach(function(k){
    tabs[k].addEventListener("click", function(){ setItem(k); });
  });

  setItem("bracelet");
  var start = DATA.cols.map(function(c){ return c[0]; }).indexOf(DATA.start);
  if (start >= 0) pick(start);
})();
