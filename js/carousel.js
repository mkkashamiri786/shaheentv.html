(function(){
  function initCarousel(){
    var track=document.getElementById('track');if(!track||track.dataset.initialized)return;
    var images=Array.prototype.slice.call(track.querySelectorAll('img')),count=images.length,current=0,timer,dots=document.getElementById('dots');
    if(!count)return;track.dataset.initialized='true';
    images.forEach(function(image,index){
      image.draggable=false;image.addEventListener('click',function(){go(index);});
      var dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label','Screenshot '+(index+1));
      dot.addEventListener('click',function(){go(index);});dots.appendChild(dot);
    });
    function render(){
      images.forEach(function(image,index){
        var distance=index-current;
        if(distance>count/2)distance-=count;if(distance<-count/2)distance+=count;
        var abs=Math.abs(distance),visible=abs<=2;
        image.style.opacity=visible?(abs>1?.35:1):0;image.style.pointerEvents=visible?'auto':'none';
        image.style.zIndex=10-abs;image.style.transform='translate(calc(-50% + '+distance*62+'%),-50%) scale('+(1-abs*.15)+') rotate('+distance*7+'deg)';
        image.classList.toggle('on',distance===0);
      });
      Array.prototype.forEach.call(dots.children,function(dot,index){dot.classList.toggle('on',index===current);});
    }
    function stop(){clearInterval(timer);}
    function play(){stop();if(count>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(function(){current=(current+1)%count;render();},3200);}
    function go(index){current=(index+count)%count;render();play();}
    document.getElementById('prev').addEventListener('click',function(){go(current-1);});
    document.getElementById('next').addEventListener('click',function(){go(current+1);});
    var startX=null;
    track.addEventListener('pointerdown',function(event){startX=event.clientX;stop();});
    addEventListener('pointerup',function(event){if(startX===null)return;var dx=event.clientX-startX;startX=null;if(Math.abs(dx)>40)go(current+(dx<0?1:-1));else play();});
    track.parentNode.addEventListener('mouseenter',stop);track.parentNode.addEventListener('mouseleave',play);
    render();play();
  }
  document.addEventListener('shaheen-content-ready',initCarousel);
})();
