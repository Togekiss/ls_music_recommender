
(function(){
	var audioObject = new Audio();
	var firstPlay = true;
	var itemIndex = [0, 1];
	var items;

	var MusicRecommender = {
		search : function search (query) {
				var url = "https://api.spotify.com/v1/search?q=" + query + "&type=album,track,artist&market=" + country + "&limit=" + limit_results;
				var array = JSON.parse(AJAX.request(url));
				console.log(array);
				return array;
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
		sliderGreen : false,
		playClicked : false,
		slider,

		addListener : function addListener (target, event, callback, capture) {
			target.addEventListener(event, callback, capture);
		},

		changeDiv : function changeDiv (event) {
			event.preventDefault();

			var underlined = document.getElementById('underlined');

			if ((event.target.id == "results") && (underlined.className == "left")) {
				underlined.setAttribute("class", "right");
			}

			if ((event.target.id == "toptracks") && (underlined.className == "right")) {
					underlined.setAttribute("class", "left");
			}
		},

		eventSearch: function eventPlay(event) {
			event.preventDefault();

			var query = document.getElementById("search").value;

			if(!query){
				alert("Your search is short.");
				return false;
			}

			var array = MusicRecommender.search(query);
			Application.replaceResults(array);
		},

		chargeFooter: function chargeFooter(event) {
			event.preventDefault();

			if (Listener.playClicked) {
				clearInterval(slider);
				clearInterval(sliderGreen);
				Listener.playClicked = false;
			}

			var li = document.getElementsByClassName('info')[0];
			var figure = event.target.parentNode.parentNode;
			li.childNodes[1].childNodes[0].src = figure.childNodes[1].childNodes[0].src;
			li.childNodes[3].childNodes[1].textContent = figure.childNodes[5].childNodes[1].textContent;
			li.childNodes[3].childNodes[3].textContent = figure.childNodes[5].childNodes[3].textContent;

			Listener.songPause(event);
			if (figure.id == "img1") audioObject = new Audio(items.tracks.items[itemIndex[0]].preview_url);
			else  audioObject = new Audio(items.tracks.items[itemIndex[1]].preview_url);
		},

		updateSlider: function updateSlider() {

			var timer = document.getElementById('timer-actual');
			var time = parseInt(timer.textContent.substring(2,4));

			time++;

			if (time < 10) timer.textContent = "0:0" + time.toString();
			else timer.textContent = "0:" + time.toString();

			if (time == 30) Listener.songFinished();
		},

		updateSliderGreen: function updateSliderGreen() {

			var sliderActual = document.getElementById('slider-actual');
			var sliderTotal = document.getElementById('slider');
			var widthActual = sliderActual.offsetWidth;
			var widthTotal = sliderTotal.offsetWidth;

			var widthTotal = sliderTotal.offsetWidth / 30;
			var newWidth = widthActual + widthTotal;

			sliderActual.style.width = newWidth.toString() + "px";
		},

		clickSlider: function clickSlider(event) {

			var sliderPos = event.target.getBoundingClientRect();

			var percentage = (event.pageX - sliderPos.left) / event.target.offsetWidth;
			var sliderActual = document.getElementById('slider-actual');
			var timer = document.getElementById('timer-actual');
			var time = percentage * 30;
			var width = percentage * 100;

			audioObject.currentTime = time;

			if (time < 10) timer.textContent = "0:0" + time.toString();
			else timer.textContent = "0:" + time.toString();
			sliderActual.style.width = width.toString() + "%";
			console.log(width);
			console.log(percentage);
		},

		songPlay: function songPlay(event) {
			event.preventDefault();

			Listener.playClicked = true;
		  audioObject.play();
			slider = setInterval(Listener.updateSlider, 1000);
			sliderGreen = setInterval(Listener.updateSliderGreen, 1000);

			var start = document.getElementById('play');
			start.setAttribute("id", "pause");
			start.removeChild(start.childNodes[0]);

			var i = document.createElement("i");
			var text = document.createTextNode("pause");
			i.appendChild(text);
			i.setAttribute("class", "material-icons");

			start.appendChild(i);

			start.removeEventListener("click", Listener.songPlay);
			Listener.addListener (start, 'click', Listener.songPause, false);
		},

		songFinished : function songFinished () {
			clearInterval(slider);
			clearInterval(sliderGreen);

			document.getElementById('timer-actual').textContent = "0:00";
			document.getElementById('slider-actual').style.width = "0px";
			var start = document.getElementById('pause');
			audioObject.load();

    	if (start != null) {
				if (!audioObject.paused) audioObject.pause();

				start.setAttribute("id", "play");
				start.removeChild(start.childNodes[0]);

				var i = document.createElement("i");
				var text = document.createTextNode("play_circle_outline");
				i.appendChild(text);
				i.setAttribute("class", "material-icons");

				start.appendChild(i);

				start.removeEventListener("click", Listener.songPause);
				Listener.addListener (start, 'click', Listener.songPlay, false);
			}
		},

		songPause: function songPause(event) {
			if (!Listener.playClicked) {
				document.getElementById('timer-actual').textContent = "0:00";
				document.getElementById('slider-actual').style.width = "0px";
			}
			else {
				clearInterval(slider);
				clearInterval(sliderGreen);
			}

			var start = document.getElementById('pause');
    	if (start != null) {
				if (!audioObject.paused) audioObject.pause();

				start.setAttribute("id", "play");
				start.removeChild(start.childNodes[0]);

				var i = document.createElement("i");
				var text = document.createTextNode("play_circle_outline");
				i.appendChild(text);
				i.setAttribute("class", "material-icons");

				start.appendChild(i);

				start.removeEventListener("click", Listener.songPause);
				Listener.addListener (start, 'click', Listener.songPlay, false);
			}
		}
	}

	var Application = {
		replaceResults: function replaceResults(array) {
			items = array;
			var figure1 = document.getElementById('img1');
			var figure2 = document.getElementById('img2');

			figure1.childNodes[1].childNodes[0].src = array.tracks.items[0].album.images[0].url;
			figure2.childNodes[1].childNodes[0].src = array.tracks.items[1].album.images[0].url;

			figure1.childNodes[5].childNodes[1].textContent = array.tracks.items[0].artists[0].name;
			figure1.childNodes[5].childNodes[3].textContent = array.tracks.items[0].name;

			figure2.childNodes[5].childNodes[1].textContent = array.tracks.items[1].artists[0].name;
			figure2.childNodes[5].childNodes[3].textContent = array.tracks.items[1].name;

			Listener.addListener(figure1.childNodes[1].childNodes[0], "click", Listener.chargeFooter, false);
			Listener.addListener(figure2.childNodes[1].childNodes[0], "click", Listener.chargeFooter, false);
		},

		start: function start(){

			var button = document.getElementById('action-search');
			Listener.addListener (button, 'click', Listener.eventSearch, false);

			var sliderActual = document.getElementById('slider');
			Listener.addListener (sliderActual, 'click', Listener.clickSlider , true);

			var menusection = document.getElementsByClassName('menusection')[0];
			Listener.addListener (menusection.childNodes[3], 'click', Listener.changeDiv, true);
			Listener.addListener (menusection.childNodes[1], 'click', Listener.changeDiv, true);

			var start = document.getElementById('play');
			Listener.addListener (start, 'click', Listener.songPlay, false);
		}
	}

	var limit_results = 10;
	var country = "ES";

	Listener.addListener(document, "DOMContentLoaded", Application.start(spotify_api_key, 0), false);

}());
