
(function(){


	var MusicRecommender = {
		search : function search (query) {
				var url = "https://api.spotify.com/v1/search?q=" + query + "&type=album,track,artist&market=" + country + "&limit=" + limit_results;
				var array = JSON.parse(AJAX.request(url));
				console.log(array);
				//this.getAlbum(array.albums.items[0].id);
				//this.getArtist(array.artists.items[0].id);
		},

		getAlbum : function getAlbum (id_album) {
			var url = "https://api.spotify.com/v1/albums/" + id_album + "?market=" + country;
			var array = JSON.parse(AJAX.request(url));
			console.log(array);
		},

		getArtist : function getArtist (id_artist) {
			var url = "	https://api.spotify.com/v1/artists/" + id_artist + "/albums?album_type=single,album&market=" + country + "&limit=" + limit_results;
			var array = JSON.parse(AJAX.request(url));
			console.log(array);
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

	var Listener = {
		addListener : function addListener (target, event, callback, capture) {
			target.addEventListener(event, callback, capture);
		},
		eventSearch: function eventPlay(event){
			event.preventDefault();

			var query = document.getElementById("search").value

			if(!query){
				alert("Your search is short.");
				return false
			}

			MusicRecommender.search(query);
		}
	}

	var Application = {
		start: function start(){

			var button = document.getElementById('action-search');
			Listener.addListener (button, 'click', Listener.eventSearch, false);

		}
	}

	var limit_results = 10;
	var country = "ES";

	Listener.addListener(document, "DOMContentLoaded", Application.start(spotify_api_key, 0), false);

}());
