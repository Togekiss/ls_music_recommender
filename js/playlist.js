
var Adder = {
  addPlayList: function addPlayList(event) {
   event.preventDefault();

   elem = document.createElement("div");
   elem.id = 'playlist';
   elem.innerHTML = '<div id="listaDiv" class="resultsRow clearfix"><h2>Nueva Lista<button class="action-delete-list"><i class="material-icons">delete</i></button></h2><button class="listNavButton" id="list1p"><span class="arrowp"></span></button>' +
                    '<ul class="resultsList"><li><button class="action-delete-song" id="delete-img9"><i class="material-icons">remove</i></button><figure id="img9"><div class="imageContainer"><img src="https://i.ytimg.com/vi/cfOa1a8hYP8/hqdefault.jpg" alt="Radiohead - Lotus Flower"></div>' +
                    '<span></span><figcaption><h3>Radiohead</h3><h4>Lotus Flower</h4></figcaption></figure></li><li><button class="action-delete-song" id="delete-img10"><i class="material-icons">remove</i></button><figure id="img10"><div class="imageContainer"><img src="https://i.ytimg.com/vi/cfOa1a8hYP8/hqdefault.jpg" alt="Radiohead - Lotus Flower"></div>' +
                    '<span></span><figcaption><h3>Radiohead</h3><h4>Lotus Flower</h4></figcaption></figure></li></ul><button class="listNavButton" id="list1n"><span class="arrown"></span></button></div>';
   document.body.appendChild(elem, document.getElementById('lists'));
  }
}
