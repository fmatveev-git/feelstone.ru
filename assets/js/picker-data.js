/* Данные для блока «Подберите цвет шара».
   Цвета: [название, цвет кружка-подложки]. Порядок важен: N-й цвет — это файлы
   assets/img/picker/bracelet-NN.webp, ring-NN.webp и swatch-NN.webp (01, 02, …).
   Чтобы добавить шар: дописать строку в cols и положить три файла со следующим номером.
   box — где на фото основы лежит шар: [слева, сверху, справа, снизу] в пикселях фото. */
var DATA = (function(){
  var cols = [
    ["Белый",      "#E4E5E5"],
    ["Бежевый",    "#C9A97F"],
    ["Жёлтый",     "#CFC260"],
    ["Оранжевый",  "#D59158"],
    ["Красный",    "#B84A49"],
    ["Бордовый",   "#893D45"],
    ["Розовый",    "#C894AA"],
    ["Фиолетовый", "#8072A5"],
    ["Бирюза",     "#66A2B0"],
    ["Кобальт",    "#425DA4"],
    ["Лайм",       "#B0B860"],
    ["Серый",      "#888A8A"],
    ["Чёрный",     "#1A1D20"]
  ];
  function files(prefix){
    return cols.map(function(_, i){
      return "assets/img/picker/" + prefix + "-" + (i < 9 ? "0" : "") + (i + 1) + ".webp";
    });
  }
  return {
    cols: cols,
    start: "Кобальт", /* какой шар показан на браслете при открытии страницы */
    items: {
      bracelet: {
        title: "Браслет со сменным шаром",
        orig: "Серебро", origClass: "orig-silver",
        cap: "Браслет Carolina Olivares со сменным шаром, серебро.",
        base: "assets/img/look-silver-bracelet.webp", w: 800, h: 1067,
        box: [394, 408, 594, 608],
        vars: files("bracelet")
      },
      ring: {
        title: "Кольцо со сменным шаром",
        orig: "Позолота", origClass: "orig-gold",
        cap: "Кольцо со сменным шаром, позолота.",
        base: "assets/img/look-gold-ring.webp", w: 800, h: 1066,
        box: [327, 441, 471, 585],
        vars: files("ring")
      }
    },
    sw: files("swatch")
  };
})();
