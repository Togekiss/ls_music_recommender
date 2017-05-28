
(function(){

	var audioObject = new Audio();
	var firstPlay = true;
	var itemIndexResults = [0, 1];
	var itemIndexRecommendations = [0, 1];
	var itemIndexPlayList = [0, 1];
	var items;
	var itemsplayList = [];
	var itemsRecommendation = [];
	var maxResults;
	var maxRecommendations;
	var maxPlayList = 0;
	var playList = 0;
	var idPlaying = 0;

	var MusicRecommender = {
		search : function search (query) {
				var url = "https://api.spotify.com/v1/search?q=" + query + "&type=album,track,artist&market=" + country + "&limit=" + limit_results;
				items = JSON.parse(AJAX.request(url));

				if (lastSong > 0) {
					var song_list = recomendations.getWithSongs(data.get(lastSong).titulo, data.get(lastSong).artista);
					var url2;
					for (var i = 0; i < song_list.length; i++) {
						url2 = "https://api.spotify.com/v1/search?q=" + song_list[i] + "&type=track&market" + country + "&limit=" + limit_results;
						itemsRecommendation[i] = JSON.parse(AJAX.request(url2)).tracks.items[0];
					}
					maxRecommendations = song_list.length;
				}

				maxResults = items.tracks.items.length;
		},

		getAlbum : function getAlbum (id_album) {
			var url = "https://api.spotify.com/v1/albums/" + id_album + "?market=" + country;
			var array = JSON.parse(AJAX.request(url));
			console.log(array);
		},

		getArtist : function getArtist (id_artist) {
			var url = "https://api.spotify.com/v1/artists/" + id_artist + "/albums?album_type=single,album&market=" + country + "&limit=" + limit_results;
			var array = JSON.parse(AJAX.request(url));
			console.log(array);
		},

		chargePopular : function chargePopular () {
			var url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=" + limit_results + "&api_key=" + lastfm_api_key + "&format=json";
			list_songs = JSON.parse(AJAX.request(url));
			console.log(list_songs);
			var songs = this.songsToArray(list_songs);
			maxRecommendations = songs.length;

			var url2;
			for (var i = 0; i < songs.length; i++) {
				url2 = "https://api.spotify.com/v1/search?q=" + songs[i] + "&type=track&market" + country + "&limit=" + limit_results;
				itemsRecommendation[i] = JSON.parse(AJAX.request(url2)).tracks.items[0];
			}
		},

		chargeRecommendations : function chargeRecommendations () {
			var song_list = recomendations.getWithSongs(data.get(lastSong).titulo, data.get(lastSong).artista);
			var url2;
			for (var i = 0; i < song_list.length; i++) {
				url2 = "https://api.spotify.com/v1/search?q=" + song_list[i] + "&type=track&market" + country + "&limit=" + limit_results;
				itemsRecommendation[i] = JSON.parse(AJAX.request(url2)).tracks.items[0];
			}
			maxRecommendations = song_list.length;
		},

		changePlayList : function changePlayList (playListId) {
			itemsplayList = [];
			itemIndexPlayList = [0, 1];
			idPlaying = 0;

			var figure = document.getElementById('img10');
			figure.parentNode.removeAttribute("class");
			var figure2 = document.getElementById('img9');
			figure2.parentNode.removeAttribute("class");

			if (playList == 1) {
				for (var i = 0; i < maxResults - playListId; i++) {
					itemsplayList[i] = items.tracks.items[playListId + i];
				}
				maxPlayList = maxResults - playListId;
				if (maxPlayList == 1) figure.parentNode.setAttribute("class", "hidden");
			}

			else if (playList == 2) {
				for (var i = 0; i < maxRecommendations - playListId; i++) {
					itemsplayList[i] = itemsRecommendation[playListId + i];
				}
				maxPlayList = maxRecommendations - playListId;
				if (maxPlayList == 1) figure.parentNode.setAttribute("class", "hidden");
			}

		},

		removePlayListSong : function removePlayListSong (Id) {
			//itemIndexPlayList = [0, 1];
			//console.log(itemIndexPlayList);
			//console.log(itemsplayList);
			var figure = document.getElementById('img10');
			var figure2 = document.getElementById('img9');
			figure.parentNode.removeAttribute("class");
			figure2.parentNode.removeAttribute("class");

			maxPlayList--;
			for (var i = Id; i < maxPlayList; i++) {
				itemsplayList[i] = itemsplayList[i + 1];
			}

			//console.log(itemIndexPlayList);
			//console.log(itemsplayList);
			if (maxPlayList <= 1 || itemIndexPlayList[1] == maxPlayList) {
				figure.parentNode.setAttribute("class", "hidden");
			}
			if (maxPlayList == 0) {
				figure2.parentNode.setAttribute("class", "hidden");
				itemsplayList = [];
			}
		},

		addPlayListSong : function addPlayListSong (item) {
			//itemIndexPlayList = [0, 1];

			var figure = document.getElementById('img10');
			var figure2 = document.getElementById('img9');
			figure.parentNode.removeAttribute("class");
			figure2.parentNode.removeAttribute("class");

			itemsplayList[maxPlayList++] = item;

			if (maxPlayList == 1) {
				figure.parentNode.setAttribute("class", "hidden");
				Listener.changeFooter();
			}
		},

		songsToArray : function songsToArray (list_songs){
			var array_songs = [];
        for (var i = 0; i < list_songs.tracks.track.length; i++) {
            array_songs[i] = list_songs.tracks.track[i].name;
        }
			return array_songs;
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

			var underlined = document.getElementsByClassName('underlined')[0];

			if ((event.target.id == "descubre") && (underlined.id == "right")) {
				underlined.setAttribute('id', "left");
				document.getElementById("descubreContainer").style.display = "block";
				document.getElementById('listContainer').style.display = "none";
			}

			if ((event.target.id == "listas") && (underlined.id == "left")) {
					underlined.setAttribute('id', "right");
					document.getElementById("descubreContainer").style.display = "none";
					document.getElementById('listContainer').style.display = "block";
			}
		},

		eventSearch: function eventPlay(event) {
			event.preventDefault();

			var query = document.getElementById("search").value;

			if(!query){
				alert("Your search is short.");
				return false;
			}

			MusicRecommender.search(query);
			document.getElementById("resultsDiv").style.display = "block";
			Application.replaceResults();
			if (lastSong > 0) Application.replaceRecommendations();
		},

		chargeFooter: function chargeFooter(event) {
			event.preventDefault();

    	//  var figure = event.target.parentNode.parentNode;
			var figure = event.target.childNodes[3];
			var playListId;

			if (figure) {

				document.getElementById('img9').style.display = "block";
				document.getElementById('img10').style.display = "block";
				document.getElementById('img9').parentNode.childNodes[1].style.display = "block";
				document.getElementById('img10').parentNode.childNodes[1].style.display = "block";

				if (Listener.playClicked) {
					clearInterval(slider);
					clearInterval(sliderGreen);
					Listener.playClicked = false;
				}

				if (figure.id == "img1") {
					playList = 1;
					playListId = itemIndexResults[0];
					idPlaying = itemIndexResults[0];
				}
				else if (figure.id == "img2") {
					playList = 1;
					playListId = itemIndexResults[1];
					idPlaying = itemIndexResults[1];
				}
				else if (figure.id == "img3") {
					playList = 2;
					playListId = itemIndexRecommendations[0];
					idPlaying = itemIndexRecommendations[0];
				}
				else if (figure.id == "img4") {
					playList = 2;
					playListId = itemIndexRecommendations[1];
					idPlaying = itemIndexRecommendations[1];
				}

				if (playList != 0) {
					MusicRecommender.changePlayList(playListId);
					Application.replacePlayList();
				}

				//canviem imatge
				var img = document.getElementsByClassName('playerImageContainer')[0];
	      img.childNodes[0].src = figure.childNodes[1].childNodes[0].src;

				var info = document.getElementsByClassName('info')[0];
				//canviem artista
	      info.childNodes[1].textContent = figure.childNodes[5].childNodes[1].textContent;
	      //canviem titol
	      info.childNodes[3].textContent = figure.childNodes[5].childNodes[3].textContent;


				Listener.songPause(event);

				if (figure.id == "img1") audioObject = new Audio(items.tracks.items[itemIndexResults[0]].preview_url);
				else  if (figure.id == "img2") audioObject = new Audio(items.tracks.items[itemIndexResults[1]].preview_url);
				else if (figure.id == "img3") audioObject = new Audio(itemsRecommendation[itemIndexRecommendations[0]].preview_url);
				else if (figure.id == "img4") audioObject = new Audio(itemsRecommendation[itemIndexRecommendations[1]].preview_url);
			}
		},

		playListClick: function playListClick(event) {
			event.preventDefault();

			var figure = event.target.childNodes[3];
			var figure2 = event.target.childNodes[0];

			if (figure || figure2) {
				if (Listener.playClicked) {
					clearInterval(slider);
					clearInterval(sliderGreen);
					Listener.playClicked = false;
				}

				Listener.songPause("click");

				//canviem imatge
				var img = document.getElementsByClassName('playerImageContainer')[0];

			  if (figure) {
					img.childNodes[0].src = figure.childNodes[1].childNodes[0].src;

					var info = document.getElementsByClassName('info')[0];
					//canviem artista
		      info.childNodes[1].textContent = figure.childNodes[5].childNodes[1].textContent;
		      //canviem titol
		      info.childNodes[3].textContent = figure.childNodes[5].childNodes[3].textContent;

					if (figure.id == "img9") {
						audioObject = new Audio(itemsplayList[itemIndexPlayList[0]].preview_url);
						idPlaying = itemIndexPlayList[0];
					}
					if (figure.id == "img10") {
						audioObject = new Audio(itemsplayList[itemIndexPlayList[1]].preview_url);
						idPlaying = itemIndexPlayList[1];
					}
				}

				if (figure2.childNodes.length != 0) {

					img.childNodes[0].src = figure2.childNodes[0].childNodes[0].src;

					var info = document.getElementsByClassName('info')[0];
					//canviem artista
		      info.childNodes[1].textContent = figure2.childNodes[2].childNodes[0].textContent;
		      //canviem titol
		      info.childNodes[3].textContent = figure2.childNodes[2].childNodes[1].textContent;

					for (var i = 0; i < playListLength; i++) {
						if (figure2.id == "img" + i + "4") {
							audioObject = new Audio(playListItem[i][playListIndex[i][0]].preview_url);
							idPlaying = playListIndex[i][0];
							playList = i;
						}

						if (figure2.id == "img" + i + "5") {
							audioObject = new Audio(playListItem[i][playListIndex[i][1]].preview_url);
							idPlaying = playListIndex[i][1];
							playList = i;
						}
					}
				}

				Listener.songPlay("click");
			}
		},

		changeFooter : function changeFooter() {

			if (Listener.playClicked) {
				clearInterval(slider);
				clearInterval(sliderGreen);
				Listener.playClicked = false;
			}

			//var figure = document.getElementById('img9');

			Application.replacePlayList();

			//canviem imatge
			var img = document.getElementsByClassName('playerImageContainer')[0];
			if (playList < 2) {
	      img.childNodes[0].src = itemsplayList[idPlaying].album.images[0].url;

				var info = document.getElementsByClassName('info')[0];
				//canviem artista
	      info.childNodes[1].textContent = itemsplayList[idPlaying].artists[0].name;
	      //canviem titol
	      info.childNodes[3].textContent = itemsplayList[idPlaying].name;

				audioObject = new Audio(itemsplayList[idPlaying].preview_url);
			}else {
				img.childNodes[0].src = itemsplayList[idPlaying].album.images[0].url;

				var info = document.getElementsByClassName('info')[0];
				//canviem artista
				info.childNodes[1].textContent = playListItem[playList][idPlaying].artists[0].name;
				//canviem titol
				info.childNodes[3].textContent = playListItem[playList][idPlaying].name;

				audioObject = new Audio(playListItem[playList][idPlaying].preview_url);
			}
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
			time = Math.round(time);
			var width = percentage * 100;

			audioObject.currentTime = time;

			if (time < 10) timer.textContent = "0:0" + time.toString();
			else timer.textContent = "0:" + time.toString();
			sliderActual.style.width = width.toString() + "%";
			console.log(width);
		},

		songPlay: function songPlay(event) {
			//event.preventDefault();
			var info = document.getElementsByClassName('info')[0];
			var songStruct = {
			  titulo: '',
			  artista: '',
			};

			Listener.playClicked = true;
		  audioObject.play();

			songStruct.artista = info.childNodes[1].textContent;
			songStruct.titulo = info.childNodes[3].textContent;

			data.save(songStruct);

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

			if (playList == 1 || playList == 2) {
					//MusicRecommender.removePlayListSong(0);
					idPlaying++;
					if (idPlaying < maxPlayList-1) {
						this.changeFooter();
						this.songPlay("click");
					} else {
						playList = 0;
						idPlaying = 0;
					}
			}else if (playList > 2) {
					idPlaying++;
					if (idPlaying < maxPlayLists[playList]-1) {
						this.changeFooter();
						this.songPlay("click");
					} else {
						playList = 0;
						idPlaying = 0;
					}
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
		},

		changeRow: function changeRow(event) {

			if ((event.target.id == "results1n") && (itemIndexResults[1] < maxResults-1)) {
				itemIndexResults[0] = itemIndexResults[1];
				itemIndexResults[1]++;
				Application.replaceResults();
			}

			if ((event.target.id == "results1p") && (itemIndexResults[0] > 0)) {
				itemIndexResults[1] = itemIndexResults[0];
				itemIndexResults[0]--;
				Application.replaceResults();
			}

			if ((event.target.id == "recomendaciones1n") && (itemIndexRecommendations[1] < maxRecommendations-1)) {
				itemIndexRecommendations[0] = itemIndexRecommendations[1];
				itemIndexRecommendations[1]++;
				Application.replaceRecommendations();
			}

			if ((event.target.id == "recomendaciones1p") && (itemIndexRecommendations[0] > 0)) {
				itemIndexRecommendations[1] = itemIndexRecommendations[0];
				itemIndexRecommendations[0]--;
				Application.replaceRecommendations();
			}

			if ((event.target.id == "list1n") && (itemIndexPlayList[1] < maxPlayList-1)) {
				itemIndexPlayList[0] = itemIndexPlayList[1];
				itemIndexPlayList[1]++;
				Application.replacePlayList();
			}

			if ((event.target.id == "list1p") && (itemIndexPlayList[0] > 0)) {
				itemIndexPlayList[1] = itemIndexPlayList[0];
				itemIndexPlayList[0]--;
				var figure = document.getElementById('img10');
				if (itemIndexPlayList[1] < maxPlayList) figure.parentNode.removeAttribute("class");
				Application.replacePlayList();
			}

			for (var i = 0; i < nameArrow.length; i++) {
				if ((event.target.id == "playlist"+ i +"n") && (playListIndex[i][1] < maxPlayLists[i]-1)) {
					playListIndex[i][0] = playListIndex[i][1];
					playListIndex[i][1]++;
					Adder.replacePlayList(i);
				}

				if ((event.target.id == "playlist"+ i +"p") && (playListIndex[i][0] > 0)) {
					playListIndex[i][1] = playListIndex[i][0];
					playListIndex[i][0]--;
					var figure = document.getElementById('img10');
					if (playListIndex[i][1] < maxPlayLists) figure.parentNode.removeAttribute("class");
					Adder.replacePlayList(i);
				}
			}
		},

		addSong: function addSong(event) {

			//event.preventDefault();
			var item;

			document.getElementById('img9').style.display = "block";
			document.getElementById('img10').style.display = "block";
			document.getElementById('img9').parentNode.childNodes[1].style.display = "block";
			document.getElementById('img10').parentNode.childNodes[1].style.display = "block";

			if (event.target.parentNode.id == "add-img1") {
				item = items.tracks.items[itemIndexResults[0]];
				if (playList == 0) playList = 1;
			}
			if (event.target.parentNode.id == "add-img2") {
				item = items.tracks.items[itemIndexResults[1]];
				if (playList == 0) playList = 1;
			}
			if (event.target.parentNode.id == "add-img3") {
				item = itemsRecommendation[itemIndexRecommendations[0]];
				if (playList == 0) playList = 2;
			}
			if (event.target.parentNode.id == "add-img4") {
				item = itemsRecommendation[itemIndexRecommendations[1]];
				if (playList == 0) playList = 2;
			}

			MusicRecommender.addPlayListSong(item);
			Application.replacePlayList();
		},

		addPlayList: function addPlayList(event) {
			event.preventDefault();

			var playListName = event.target.parentNode.parentNode.childNodes[1].value;

			if (maxPlayList != 0 && playListName) {
				event.target.parentNode.parentNode.childNodes[1].value = "";
				Adder.addPlayList(itemsplayList, maxPlayList, playListName);

				var listnavButtons = document.getElementsByClassName('listNavButton');
				var deleteList = document.getElementsByClassName('action-delete-list');
				var ul = document.getElementsByClassName('resultsList');

				for (var i = 0; i < listnavButtons.length; i++) Listener.addListener (listnavButtons[i], 'click', Listener.changeRow, false);
				for (var i = 0; i < deleteList.length; i++) Listener.addListener (deleteList[i], 'click', Listener.removeList, false);

				Listener.addListener(ul[2 + playListLength].childNodes[0], "click", Listener.playListClick, false);
				Listener.addListener(ul[2 + playListLength].childNodes[1], "click", Listener.playListClick, false);
			}else {
				alert("You must insert a playlist name!");
			}
		},

		removeList: function removeList(event) {
			event.preventDefault();

			var parent = event.target.parentNode.parentNode.parentNode.parentNode;

			for (var i = 0; i < 200; i++) if (parent.id == "playlist" + i) Adder.removePlayList(i);

			document.getElementById('img9').style.display = "none";
			document.getElementById('img9').parentNode.childNodes[1].style.display = "none";
			document.getElementById('img10').style.display = "none";
			document.getElementById('img10').parentNode.childNodes[1].style.display = "none";

			itemsplayList = [];
			maxPlayList = 0;
			idPlaying = 0;
			playList = 0;
			Application.replacePlayList();
			Listener.songPause("click");

		},

		removeSong: function removeSong(event) {
			event.preventDefault();
			var id;
			var idPlayingAnt = idPlaying;

			if (event.target.parentNode.id == "delete-img9") {
				id = itemIndexPlayList[0];
			}
			else  id = itemIndexPlayList[1];
			if (id < idPlaying) idPlaying--;

			MusicRecommender.removePlayListSong(id);
			Application.replacePlayList();

			if (idPlayingAnt == id) {
				if (Listener.playClicked) {
					clearInterval(slider);
					clearInterval(sliderGreen);
					Listener.playClicked = false;
				}
				Listener.songPause("click");
				if (maxPlayList > 0) {
						Listener.changeFooter();
						Listener.songPlay("click");
				} else if (maxPlayList == 0) playList = 0;
			}

			/*if (event.target.parentNode.id == "delete-img9" && maxPlayList > 0) {
				Listener.changeFooter();
				Listener.songPlay("click");
			} else if (maxPlayList == 0) playList = 0;*/
		}
	}

	var Application = {
		replaceResults: function replaceResults() {

			var figure1 = document.getElementById('img1');
			var figure2 = document.getElementById('img2');

			var ul = document.getElementsByClassName('resultsList');

			figure1.childNodes[1].childNodes[0].src = items.tracks.items[itemIndexResults[0]].album.images[0].url;
			figure2.childNodes[1].childNodes[0].src = items.tracks.items[itemIndexResults[1]].album.images[0].url;

			figure1.childNodes[5].childNodes[1].textContent = items.tracks.items[itemIndexResults[0]].artists[0].name;
			figure1.childNodes[5].childNodes[3].textContent = items.tracks.items[itemIndexResults[0]].name;

			figure2.childNodes[5].childNodes[1].textContent = items.tracks.items[itemIndexResults[1]].artists[0].name;
			figure2.childNodes[5].childNodes[3].textContent = items.tracks.items[itemIndexResults[1]].name;

			Listener.addListener(ul[0].childNodes[1], "click", Listener.chargeFooter, false);
			Listener.addListener(ul[0].childNodes[3], "click", Listener.chargeFooter, false);
		},

		replacePlayList: function replacePlayList() {

			var figure1 = document.getElementById('img9');
			var figure2 = document.getElementById('img10');

			var ul = document.getElementsByClassName('resultsList');

			if (maxPlayList > 0) figure1.childNodes[1].childNodes[0].src = itemsplayList[itemIndexPlayList[0]].album.images[0].url;
			if (maxPlayList > 1) figure2.childNodes[1].childNodes[0].src = itemsplayList[itemIndexPlayList[1]].album.images[0].url;

			if (maxPlayList > 0) figure1.childNodes[5].childNodes[1].textContent = itemsplayList[itemIndexPlayList[0]].artists[0].name;
			if (maxPlayList > 0) figure1.childNodes[5].childNodes[3].textContent = itemsplayList[itemIndexPlayList[0]].name;

			if (maxPlayList > 1) figure2.childNodes[5].childNodes[1].textContent = itemsplayList[itemIndexPlayList[1]].artists[0].name;
			if (maxPlayList > 1) figure2.childNodes[5].childNodes[3].textContent = itemsplayList[itemIndexPlayList[1]].name;

			//console.log(ul);
			Listener.addListener(ul[2].childNodes[1], "click", Listener.playListClick, false);
			Listener.addListener(ul[2].childNodes[3], "click", Listener.playListClick, false);
		},

		replaceRecommendations: function replaceRecommendations() {

			var figure3 = document.getElementById('img3');
			var figure4 = document.getElementById('img4');

			var ul = document.getElementsByClassName('resultsList');

			figure3.childNodes[1].childNodes[0].src = itemsRecommendation[itemIndexRecommendations[0]].album.images[0].url;
			figure4.childNodes[1].childNodes[0].src = itemsRecommendation[itemIndexRecommendations[1]].album.images[0].url;

			figure3.childNodes[5].childNodes[1].textContent = itemsRecommendation[itemIndexRecommendations[0]].artists[0].name;
			figure3.childNodes[5].childNodes[3].textContent = itemsRecommendation[itemIndexRecommendations[0]].name;

			figure4.childNodes[5].childNodes[1].textContent = itemsRecommendation[itemIndexRecommendations[1]].artists[0].name;
			figure4.childNodes[5].childNodes[3].textContent = itemsRecommendation[itemIndexRecommendations[1]].name;

			Listener.addListener(ul[1].childNodes[1], "click", Listener.chargeFooter, false);
			Listener.addListener(ul[1].childNodes[3], "click", Listener.chargeFooter, false);
		},

		start: function start(){
			Adder.init();
			data.init();

			var button = document.getElementById('action-search');
			Listener.addListener (button, 'click', Listener.eventSearch, false);

			var sliderActual = document.getElementById('slider');
			Listener.addListener (sliderActual, 'click', Listener.clickSlider , true);

			var menusection = document.getElementsByClassName('menusection')[0];
			Listener.addListener (menusection.childNodes[3], 'click', Listener.changeDiv, true);
			Listener.addListener (menusection.childNodes[1], 'click', Listener.changeDiv, true);

			var start = document.getElementById('play');
			Listener.addListener (start, 'click', Listener.songPlay, false);

			var resultsnavButtons = document.getElementsByClassName('resultsNavButton');
			var recommendationsnavButtons = document.getElementsByClassName('recommendationsNavButton');
			var listnavButtons = document.getElementsByClassName('listNavButton');
			var addButtons = document.getElementsByClassName('action-add-song');
			var removeButtons = document.getElementsByClassName('action-delete-song');
			document.getElementById('img9').style.display = "none";
			document.getElementById('img9').parentNode.childNodes[1].style.display = "none";
			document.getElementById('img10').style.display = "none";
			document.getElementById('img10').parentNode.childNodes[1].style.display = "none";
			document.getElementById('listContainer').style.display = "none";

			Listener.addListener (resultsnavButtons[0], 'click', Listener.changeRow, false);
			Listener.addListener (resultsnavButtons[1], 'click', Listener.changeRow, false);
			Listener.addListener (recommendationsnavButtons[0], 'click', Listener.changeRow, false);
			Listener.addListener (recommendationsnavButtons[1], 'click', Listener.changeRow, false);
			for (var i = 0; i < listnavButtons.length; i++) Listener.addListener (listnavButtons[i], 'click', Listener.changeRow, false);

			Listener.addListener (addButtons[0], 'click', Listener.addSong, false);
			Listener.addListener (addButtons[1], 'click', Listener.addSong, false);
			Listener.addListener (addButtons[2], 'click', Listener.addSong, false);
			Listener.addListener (addButtons[3], 'click', Listener.addSong, false);
			Listener.addListener (removeButtons[0], 'click', Listener.removeSong, true);
			Listener.addListener (removeButtons[1], 'click', Listener.removeSong, true);
			Listener.addListener (document.getElementsByClassName('action-delete-list')[0], 'click', Listener.removeList, false);
			Listener.addListener (document.getElementById('action-add-list'), 'click', Listener.addPlayList, false);

			if (lastSong == 0) MusicRecommender.chargePopular();
			else MusicRecommender.chargeRecommendations();
			Application.replaceRecommendations();
		}
	}

	Listener.addListener(document, "DOMContentLoaded", Application.start(spotify_api_key, 0), false);

}());
