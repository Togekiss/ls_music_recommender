/**
 * Created by Hector on 30/12/2016.
 */
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
var songNumber = localStorage.length - 2;
var boolean = 1;

var recomendations = {
    getWithSongs : function getWithSongs ([nom_canço]){
        var url_id = "http://musicovery.com/api/V4/track.php?fct=search&title="+ [nom_canço] +"&format=json";
        song = JSON.parse(AJAX.request(url_id));
        var id_song = song.root.tracks.track[0].id;
        var url_songs = "http://musicovery.com/api/V4/track.php?fct=getsimilar&id=" + id_song + "&tracksnumber=" +
        limit_results + "&listenercountry=" + country + "&format=json";
        list_songs = JSON.parse(AJAX.request(url_songs));
        this.songsToArray(list_songs);
        return array_songs;
    },
    songsToArray : function songsToArray (list_songs){
        for (var i = 0; i < list_songs.root.tracks.track.length; i++) {
            array_songs[i] = list_songs.root.tracks.track[i].title;
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
    save: function save(newSong){
        boolean = 1;

        if (songNumber > 0) {
          for (var i = 0; i < songNumber; i++) {
           songStruct = JSON.parse(localStorage.getItem(i+1));
           if((songStruct.titulo === newSong.titulo) && (songStruct.artista === newSong.artista)) {
              boolean = 0;
           }
         }
       }

       if (boolean == 1) {
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
            }
         localStorage.setItem(songNumber, JSON.stringify(songStruct));
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
