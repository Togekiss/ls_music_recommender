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

    var underlined = document.getElementsByClassName('underlined')[0];

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
          if (underlined.childNodes[0].id == "toptracks") {
            underlined.removeAttribute("class");
            document.getElementById('results').parentNode.setAttribute("class", "underlined");
          }
        } else {
          if (underlined.childNodes[0].id == "results") {
            underlined.removeAttribute("class");
            document.getElementById('toptracks').parentNode.setAttribute("class", "underlined");
          }
        }
    }

    xDown = null;
    yDown = null;
};
