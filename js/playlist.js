
var country = "es";
var limit_results = 10;
var song;
var artist;
var list_songs;
var list_artists;
var array_songs = [];
var array_artists = [];
var songStruct = {
  id: '',
  titulo: '',
  artista: '',
  album: ''
};
var songNumber = localStorage.length;
var boolean = 1;

var HTML = {
  addPlayList: function addPlayList(id) {

   elem = document.createElement("div");
   elem.id = 'playlist' + id;
   elem.innerHTML = ' my Text '
   document.body.insertAfter(elem, document.body.childNodes[0]);

  }
}

var AJAX = {
  request: function request(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    return xhr.responseText;
  }
}
