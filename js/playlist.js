
var playListIndex = [];
var playListItem = [];
var maxPlayLists = [];
var nameImage = [];
var playListLength = 0;

var Adder = {
  init: function init () {
    for (var i = 0; i < 200; i++) {
      playListItem[i] = [];
      playListIndex[i] = [0, 1];
      nameImage[i] = [];
   }
  },

  addPlayList: function addPlayList(itemsplayList, maxPlayList, playListName) {
   event.preventDefault();
   var index = [0,1];
   nameImage[playListLength] = ["img" + playListLength + "4", "img" + playListLength + "5"];

   elem = document.createElement("div");
   elem.id = 'playlist';
   elem.innerHTML = '<div id="listaDiv" class="resultsRow clearfix"><h2>' + playListName + '<button class="action-delete-list"><i class="material-icons">delete</i></button></h2><button class="listNavButton" id="list1p"><span class="arrowp"></span></button>' +
                    '<ul class="resultsList"><li><button class="action-delete-song" id="delete-img9"><i class="material-icons">remove</i></button><figure id="'+ nameImage[playListLength][0] +'"><div class="imageContainer"><img src="https://i.ytimg.com/vi/cfOa1a8hYP8/hqdefault.jpg" alt="Radiohead - Lotus Flower"></div>' +
                    '<span></span><figcaption><h3>Radiohead</h3><h4>Lotus Flower</h4></figcaption></figure></li><li><button class="action-delete-song" id="delete-img10"><i class="material-icons">remove</i></button><figure id="' + nameImage[playListLength][1] +'"><div class="imageContainer"><img src="https://i.ytimg.com/vi/cfOa1a8hYP8/hqdefault.jpg" alt="Radiohead - Lotus Flower"></div>' +
                    '<span></span><figcaption><h3>Radiohead</h3><h4>Lotus Flower</h4></figcaption></figure></li></ul><button class="listNavButton" id="list1n"><span class="arrown"></span></button></div>';
   document.getElementById('listContainer').appendChild(elem);

   playListItem[playListLength] = itemsplayList;
   maxPlayLists[playListLength] = maxPlayList;

   Adder.replacePlayList(playListLength);
   playListLength++;
 },

 replacePlayList: function replacePlayList(playListNum) {

   var figure1 = document.getElementById(nameImage[playListLength][0]);
   var figure2 = document.getElementById(nameImage[playListLength][1]);

   //var ul = document.getElementsByClassName('resultsList');

   if (maxPlayLists[playListNum] > 0) figure1.childNodes[0].childNodes[0].src = playListItem[playListNum][playListIndex[playListNum][0]].album.images[0].url;
   if (maxPlayLists[playListNum] > 1) figure2.childNodes[0].childNodes[0].src = playListItem[playListNum][playListIndex[playListNum][1]].album.images[0].url;

   if (maxPlayLists[playListNum] > 0) figure1.childNodes[2].childNodes[0].textContent = playListItem[playListNum][playListIndex[playListNum][0]].artists[0].name;
   if (maxPlayLists[playListNum] > 0) figure1.childNodes[2].childNodes[1].textContent = playListItem[playListNum][playListIndex[playListNum][0]].name;

   if (maxPlayLists[playListNum] > 1) figure2.childNodes[2].childNodes[0].textContent = playListItem[playListNum][playListIndex[playListNum][1]].artists[0].name;
   if (maxPlayLists[playListNum] > 1) figure2.childNodes[2].childNodes[1].textContent = playListItem[playListNum][playListIndex[playListNum][1]].name;

   //console.log(ul);
   //Listener.addListener(ul[2].childNodes[1], "click", Listener.playListClick, false);
   //Listener.addListener(ul[2].childNodes[3], "click", Listener.playListClick, false);
 }
}
