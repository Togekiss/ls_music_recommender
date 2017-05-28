
var playListIndex = [];
var playListItem = [];
var maxPlayLists = [];
var nameImage = [];
var nameArrow = [];
var playListLength = 0;
var playListname = [];

var Adder = {
  addListener : function addListener (target, event, callback, capture) {
    target.addEventListener(event, callback, capture);
  },

  init: function init () {
    for (var i = 0; i < 200; i++) {
      playListItem[i] = [];
      playListIndex[i] = [0, 1];
      nameImage[i] = [];
      nameArrow[i] = [];
   }
  },

  addPlayList: function addPlayList(itemsplayList, maxPlayList, playListName) {
   event.preventDefault();

   nameImage[playListLength] = ["img" + playListLength + "4", "img" + playListLength + "5"];
   nameArrow[playListLength] = ["playlist" + playListLength + "p", "playlist" + playListLength + "n"];

   elem = document.createElement("div");
   elem.id = 'playlist' + playListLength;
   elem.innerHTML = '<div id="listaDiv" class="resultsRow clearfix"><h2>' + playListName + '<button class="action-delete-list"><i class="material-icons">delete</i></button></h2><button class="listNavButton" id="' + nameArrow[playListLength][0] +'"><span class="arrowp"></span></button>' +
                    '<ul class="resultsList"><li><figure id="'+ nameImage[playListLength][0] +'"><div class="imageContainer"><img src="https://i.ytimg.com/vi/cfOa1a8hYP8/hqdefault.jpg" alt="Radiohead - Lotus Flower"></div>' +
                    '<span></span><figcaption><h3>Radiohead</h3><h4>Lotus Flower</h4></figcaption></figure></li><li><figure id="' + nameImage[playListLength][1] +'"><div class="imageContainer"><img src="https://i.ytimg.com/vi/cfOa1a8hYP8/hqdefault.jpg" alt="Radiohead - Lotus Flower"></div>' +
                    '<span></span><figcaption><h3>Radiohead</h3><h4>Lotus Flower</h4></figcaption></figure></li></ul><button class="listNavButton" id="' + nameArrow[playListLength][1] +'"><span class="arrown"></span></button></div>';
   document.getElementById('listContainer').appendChild(elem);

   playListItem[playListLength] = itemsplayList;
   maxPlayLists[playListLength] = maxPlayList;
   playListname[playListLength] = playListName;

   Adder.replacePlayList(playListLength);
/*
   var songStruct = {
     titulo: '',
     artista: '',
   };

   for (var i = 0; i < maxPlayList; i++) {
     songStruct.artista = itemsplayList[i].artists[0].name;
     songStruct.titulo = itemsplayList[i].name;
     data.savePlaylist(songStruct, playListLength, playListName, i);
   }*/

   playListLength++;
  },

 replacePlayList: function replacePlayList(playListNum) {

   var figure1 = document.getElementById(nameImage[playListNum][0]);
   var figure2 = document.getElementById(nameImage[playListNum][1]);

   if (maxPlayLists[playListNum] > 0) figure1.childNodes[0].childNodes[0].src = playListItem[playListNum][playListIndex[playListNum][0]].album.images[0].url;
   if (maxPlayLists[playListNum] > 1) figure2.childNodes[0].childNodes[0].src = playListItem[playListNum][playListIndex[playListNum][1]].album.images[0].url;

   if (maxPlayLists[playListNum] > 0) figure1.childNodes[2].childNodes[0].textContent = playListItem[playListNum][playListIndex[playListNum][0]].artists[0].name;
   if (maxPlayLists[playListNum] > 0) figure1.childNodes[2].childNodes[1].textContent = playListItem[playListNum][playListIndex[playListNum][0]].name;

   if (maxPlayLists[playListNum] > 1) figure2.childNodes[2].childNodes[0].textContent = playListItem[playListNum][playListIndex[playListNum][1]].artists[0].name;
   if (maxPlayLists[playListNum] > 1) figure2.childNodes[2].childNodes[1].textContent = playListItem[playListNum][playListIndex[playListNum][1]].name;

 },

 removePlayList: function removePlayList(playListNum) {
   /*var songStruct = {
     titulo: '',
     artista: '',
   };*/

  document.getElementById('playlist' + playListNum).parentNode.removeChild(document.getElementById('playlist' + playListNum));

  //for (var i = 0; i < playListLength; i++) data.removeplaylist(i, maxPlayLists[i]);

  playListIndex.splice(playListNum, 1);
  playListItem.splice(playListNum, 1);
  maxPlayLists.splice(playListNum, 1);
  nameImage.splice(playListNum, 1);
  nameArrow.splice(playListNum, 1);
  playListLength--;

  /*for (var i = 0; i < playListLength; i++) {
    for (var j = 0; j < maxPlayLists[i]; j++) {
    songStruct.artista = playListItem[i][j].artists[0].name;
    songStruct.titulo = playListItem[i][j].name;
    data.savePlaylist(songStruct, i, playListname[i], j);
    }
  }*/
 },

 removeSong: function removeSong(playListNum) {

   var figure1 = document.getElementById(nameImage[playListNum][0]);
   var figure2 = document.getElementById(nameImage[playListNum][1]);

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
