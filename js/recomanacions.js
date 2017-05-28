
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
  album: '',
  playlist: '',
  playlistname: ''
};
var songNumber = localStorage.length;
var lastSong = 0;
var boolean = 1;

var recomendations = {
    getWithSongs : function getWithSongs (song_name, song_artist){
        var url = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + song_artist +
        "&track=" + song_name + "&limit=" + limit_results + "&api_key=" + lastfm_api_key + "&format=json";
        list_songs = JSON.parse(AJAX.request(url));
        this.songsToArray(list_songs);
        return array_songs;
    },
    songsToArray : function songsToArray (list_songs){
        for (var i = 0; i < list_songs.similartracks.track.length; i++) {
            array_songs[i] = list_songs.similartracks.track[i].name;
        }
    },
    getWithArtist : function getWithArtist ([nom_artista]){
        var url_id = "http://musicovery.com/api/V4/artist.php?fct=search&artistname="+ [nom_artista] +"&format=json";
        artist = JSON.parse(AJAX.request(url_id));
        var id_artist = artist.root.artists.artist[0].mbid;
        var url_artists = "http://musicovery.com/api/V4/artist.php?fct=getsimilarartist&artistmbid=" + id_artist + "&format=json";
        list_artists = JSON.parse(AJAX.request(url_artists));
        this.artistToArray (list_artists);
        return array_artists;
    },
    artistToArray : function artistToArray (list_songs){
        for (var i = 0; i < list_artists.length; i++) {
            array_artists.push(list_artists.root.artists.artist[i].name);
        }
    }
}

var data = {
    init : function init () {
      var num = 0;
      if (songNumber > 0) {
        for (var i = 0; i < songNumber; i++) {
         songStruct = JSON.parse(localStorage.getItem(i+1));
         if(songStruct.playlist == "null") lastSong = i + 1;
        }
      }

    },
    savePlaylist: function savePlaylist(newSong, playListNum, playListName, songNum){

         songNumber++;

         var aux = newSong.titulo.replace(" ", "+");
         var url = "https://api.spotify.com/v1/search?q=" + aux + "&type=track&market=" + country + "&limit=" + limit_results;
 				 var items = JSON.parse(AJAX.request(url));

         for (var i = 0; i < items.tracks.items.length; i++)
          for (var j = 0; j < items.tracks.items[i].artists.length; j++)
            if (items.tracks.items[i].artists[j].name === newSong.artista) {
              songStruct.id = items.tracks.items[i].id;
              songStruct.titulo = newSong.titulo;
              songStruct.artista = newSong.artista;
              songStruct.album = items.tracks.items[i].album.id;
              songStruct.playlist = playListNum;
              songStruct.playlistname = playListName;

            }
         localStorage.setItem((playListNum + 1) * 100 + songNum, JSON.stringify(songStruct));

    },

    removeplaylist: function removeplaylist(playListNum, playListLength){
        var num = songNumber;

         for (var i = 0; i < playListLength; i++) {
          songStruct = JSON.parse(localStorage.getItem((playListNum + 1) * 100 + i));
          if(songStruct.playlist == playListNum) {
            songNumber--;
            localStorage.removeItem((playListNum + 1) * 100 + i);
          }
         }
    },

    save: function save(newSong){
        boolean = 1;

        if (lastSong > 0) {
          for (var i = 0; i < lastSong; i++) {
           songStruct = JSON.parse(localStorage.getItem(i+1));
           if((songStruct.titulo == newSong.titulo) && (songStruct.artista == newSong.artista) && (songStruct.playlist == "null")) {
              boolean = 0;
           }
          }
        }

       if (boolean == 1) {
         songNumber++;
         lastSong++;
         var aux = newSong.titulo.replace(" ", "+");
         var url = "https://api.spotify.com/v1/search?q=" + aux + "&type=track&market=" + country + "&limit=" + limit_results;
 				 var items = JSON.parse(AJAX.request(url));

         for (var i = 0; i < items.tracks.items.length; i++)
          for (var j = 0; j < items.tracks.items[i].artists.length; j++)
            if (items.tracks.items[i].artists[j].name === newSong.artista) {
              songStruct.id = items.tracks.items[i].id;
              songStruct.titulo = newSong.titulo;
              songStruct.artista = newSong.artista;
              songStruct.album = items.tracks.items[i].album.id;
              songStruct.playlist = "null";
              songStruct.playlistname = "null";
            }
         localStorage.setItem(lastSong, JSON.stringify(songStruct));
       }
    },
    get: function get(number) {
        return JSON.parse(localStorage.getItem(number));
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
