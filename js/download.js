(function(){
  var colors=['#f5b400','#00c6ba','#ff6b9d','#8f7bff','#ffffff'];
  document.addEventListener('shaheen-content-ready',function(){
    document.querySelectorAll('.src').forEach(function(link){
      if(link.dataset.downloadEffect==='ready')return;link.dataset.downloadEffect='ready';
      link.addEventListener('click',function(event){
        if(link.classList.contains('busy'))return;
        var small=link.querySelector('small'),original=small.textContent;
        link.classList.add('busy');small.textContent='Download shuru ho raha hai...';
        if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&link.animate){
          var rect=link.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;
          for(var i=0;i<16;i++){
            var particle=document.createElement('i');particle.className='pc';particle.style.left=x+'px';particle.style.top=y+'px';particle.style.background=colors[i%colors.length];
            if(i%3===0)particle.style.borderRadius='2px';link.appendChild(particle);
            var angle=Math.random()*Math.PI*2,distance=40+Math.random()*70;
            particle.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+Math.cos(angle)*distance+'px,'+(Math.sin(angle)*distance-20)+'px) scale(.3) rotate(240deg)',opacity:0}],{duration:800+Math.random()*400,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=(function(node){return function(){node.remove();};})(particle);
          }
        }
        setTimeout(function(){link.classList.remove('busy');small.textContent=original;},2600);
      });
    });
  });
})();
