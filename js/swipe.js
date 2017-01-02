document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var underlined = document.getElementById('underlined');

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
          if (underlined.className == "left") {
            underlined.setAttribute("class", "right");
          }  
        } else {
          if (underlined.className == "right") {
            underlined.setAttribute("class", "left");
          }
        }
    }

    xDown = null;
    yDown = null;
    divTouched = false;
};
