const Swiper=(el,callback,direct,streamtype)=>{
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;
let calibrate = 50;


    el.addEventListener('touchstart', function(e) {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
}, {passive: true});

    if (streamtype){

    el.addEventListener('touchmove', function(e) {
    //touchstartX = e.changedTouches[0].screenX;
    //touchstartY = e.changedTouches[0].screenY;
    let razlika = touchstartX - e.changedTouches[0].screenX
    let dil = 5
    console.log(dil,"/",razlika/dil)
    let step = (razlika / dil) * -1
    el.style.transform = "translateX("+step+"%)"
   
}, {passive: true});

    }else{

    el.addEventListener('touchend', function(e) {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    handleSwipe(callback);
}, {passive: true}); 
}

    function handleSwipe(callback) {
    if (touchendX + calibrate < touchstartX) {
        
        (direct)?(direct==4)?callback(4):false:console.log(callback(4));

    }
    if (touchendX > touchstartX+calibrate) {
        
        (direct)?(direct==2)?callback(2):false:console.log(callback(2));
    }
/*    if (touchendY < touchstartY) {
        console.log(swiped + 'down!');
    }
    if (touchendY > touchstartY) {
        console.log(swiped + 'left!');
    }
    if (touchendY == touchstartY) {
        console.log('tap!');
    }*/
}

}

