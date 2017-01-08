/**
 * Created by Hector on 30/12/2016.
 */
var song;
var artist;
var list_songs;
var list_artists;
var array_songs = [];
var array_artists = [];
var data_songs;
var saved_songs;
var boolean = 1;

var recomendations = {
    getWithSongs : function getWithSongs ([nom_canço]){
        var url_id = "http://musicovery.com/api/track.php?fct=search&title="+ [nom_canço] +"&format=json";
        song = JSON.parse(AJAX.request(url_id));
        var id_song = song.root.tracks.track[0].id;
        var url_songs = "http://musicovery.com/api/track.php?fct=getsimilartracks&id=" + id_song + "&format=json";
        list_songs = JSON.parse(AJAX.request(url_songs));
        array_songs = songsToArray(list_songs);
        return array_songs;
    },
    songsToArray : function songsToArray (list_songs){
        for (var i = 0; i < list_songs.length; i++) {
            array_songs.push(list_songs.root.tracks.track[i].title);
        }
    },
    getWithArtist : function getWithArtist ([nom_artista]){
        var url_id = "http://musicovery.com/api/artist.php?fct=search&artistname="+ [nom_artista] +"&format=json";
        artist = JSON.parse(AJAX.request(url_id));
        var id_artist = artist.root.artists.artist[0].mbid;
        var url_artists = "http://musicovery.com/api/artist.php?fct=getsimilarartist&artistmbid=" + id_artist + "&format=json";
        list_artists = JSON.parse(AJAX.request(url_artists));
        array_artists = artistToArray (list_artists);
        return array_artists;
    },
    artistToArray : function artistToArray (list_songs){
        for (var i = 0; i < list_artists.length; i++) {
            array_artists.push(list_artists.root.artists.artist[i].name);
        }
    }
}
var data = {
    save: function save([nom_canço]){
        data_songs = JSON.parse(localStorage.getItem(saved_songs));
        for (var i = 0; i < data_songs.length; i++) {
         if([nom_canço].localecompare(data_songs[i])=== 0){
            boolean = 0;
         }
        }
        if(data_songs.length < 4){
            data_songs.push([nom_canço]);
            boolean = 0;
        }
        if(boolean === 1){
            data_songs.shift();
            data_songs.push([nom_canço]);
        }
        localStorage.setItem(saved_songs, JSON.parse(data_songs));
    },
    get: function get() {
        return JSON.parse(localStorage.getItem(saved_songs));
    }
}