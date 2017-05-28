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
          if (underlined.id == "left") {
            underlined.setAttribute('id', "right");
            document.getElementById("descubreContainer").style.display = "none";
            document.getElementById('listContainer').style.display = "block";
          }
        } else {
          if (underlined.id == "right") {
            underlined.setAttribute('id', "left");
            document.getElementById("descubreContainer").style.display = "block";
            document.getElementById('listContainer').style.display = "none";
          }
        }
    }

    xDown = null;
    yDown = null;
    divTouched = false;
};
