(function(){
  DATA.items.bracelet.base=document.getElementById("img-bracelet").src;
  DATA.items.ring.base=document.getElementById("img-ring").src;
  var frame=document.getElementById("frame"),grid=document.getElementById("balls");
  var nowName=document.getElementById("now-name"),nowSub=document.getElementById("now-sub"),cap=document.getElementById("photo-cap");
  var tabs={bracelet:document.getElementById("tab-bracelet"),ring:document.getElementById("tab-ring")};
  var state={item:"bracelet",color:-1};
  var labels={bracelet:{title:"Браслет со сменным шаром",orig:"Серебро",origClass:"orig-silver",cap:"Браслет Carolina Olivares со сменным шаром, серебро."},
              ring:{title:"Кольцо со сменным шаром",orig:"Позолота",origClass:"orig-gold",cap:"Кольцо со сменным шаром, позолота."}};
  var overlays={};
  function buildFrame(){
    frame.innerHTML="";overlays={};
    var m=DATA.items[state.item];
    var base=document.createElement("img");
    base.src=m.base;base.alt=labels[state.item].title;base.width=m.w;base.height=m.h;
    frame.appendChild(base);
    var b=m.box,bw=b[2]-b[0];
    DATA.cols.forEach(function(c,i){
      var o=document.createElement("img");
      o.className="ov";o.alt="";o.src=m.vars[i];
      o.style.left=(b[0]/m.w*100)+"%";o.style.top=(b[1]/m.h*100)+"%";o.style.width=(bw/m.w*100)+"%";
      frame.appendChild(o);overlays[i]=o;
    });
    cap.textContent=labels[state.item].cap;
  }
  function buildGrid(){
    grid.innerHTML="";
    var L=labels[state.item];
    var all=[{n:L.orig,cls:L.origClass,i:-1}].concat(DATA.cols.map(function(c,i){return {n:c[0],hex:c[1],i:i}}));
    all.forEach(function(c){
      var b=document.createElement("button");
      b.type="button";b.className="ball";b.id="ball-"+state.item+"-"+c.i;
      b.setAttribute("aria-pressed",c.i===state.color?"true":"false");
      var d=document.createElement("span");d.className="dot"+(c.cls?" "+c.cls:"");d.setAttribute("aria-hidden","true");
      if(c.i>=0){d.style.background=c.hex+" url("+DATA.sw[c.i]+") center/cover no-repeat";d.classList.add("real");}
      var t=document.createElement("span");t.textContent=c.n;
      b.appendChild(d);b.appendChild(t);
      b.addEventListener("click",function(){pick(c.i)});
      grid.appendChild(b);
    });
  }
  function pick(i){
    state.color=i;
    Object.keys(overlays).forEach(function(k){overlays[k].classList.toggle("on",+k===i)});
    grid.querySelectorAll(".ball").forEach(function(s){s.setAttribute("aria-pressed",s.id==="ball-"+state.item+"-"+i?"true":"false")});
    var L=labels[state.item];
    nowName.textContent=i<0?L.orig:DATA.cols[i][0];
    nowSub.textContent=i<0?"Как на фото":L.title+" · шар «"+DATA.cols[i][0].toLowerCase()+"»";
  }
  function setItem(item){
    state.item=item;state.color=-1;
    Object.keys(tabs).forEach(function(k){tabs[k].setAttribute("aria-selected",k===item?"true":"false")});
    buildFrame();buildGrid();pick(-1);
  }
  tabs.bracelet.addEventListener("click",function(){setItem("bracelet")});
  tabs.ring.addEventListener("click",function(){setItem("ring")});
  setItem("bracelet");
  pick(9);
})();
