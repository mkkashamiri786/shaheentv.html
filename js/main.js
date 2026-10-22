(function(){
  function initContentEffects(){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target);}});
    },{threshold:.15});
    document.querySelectorAll('.r').forEach(function(el){
      var index=Array.prototype.indexOf.call(el.parentNode.children,el);
      el.style.setProperty('--dl',(index%4)*.12+'s');io.observe(el);
    });
    document.querySelectorAll('.facts b[data-count]').forEach(function(el){
      var target=Number(el.dataset.count),suffix=el.dataset.suffix||'',decimals=String(target).includes('.')?1:0,start=null;
      function animate(ts){if(start===null)start=ts;var p=Math.min((ts-start)/1600,1),value=target*(1-Math.pow(1-p,3));el.textContent=value.toFixed(decimals)+suffix;if(p<1)requestAnimationFrame(animate);}
      setTimeout(function(){requestAnimationFrame(animate);},500);
    });
  }
  document.addEventListener('shaheen-content-ready',initContentEffects);
  var header=document.getElementById('hd'),top=document.getElementById('top'),progress=document.getElementById('prog');
  addEventListener('scroll',function(){
    var y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
    header.classList.toggle('small',y>40);top.classList.toggle('on',y>500);progress.style.width=(max>0?y/max*100:0)+'%';
  },{passive:true});
  var phones=document.querySelector('.phones'),hero=document.querySelector('.hero');
  if(phones&&hero&&matchMedia('(hover:hover)').matches)hero.addEventListener('mousemove',function(e){
    var x=(e.clientX/innerWidth-.5)*14,y=(e.clientY/innerHeight-.5)*10;phones.style.translate=x+'px '+y+'px';
  });
})();
