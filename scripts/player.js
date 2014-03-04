		var playlist = new Array();
		var song_list = new Array();
		var audioplayer = document.getElementById("audio");
		var nowplaying = document.getElementById("playing");
		var playtime = document.getElementById("time");
		var song_counter = 0;
		var add_counter = 0;
		var playBtn_DOM = document.getElementById("playBtn");
		var nextBtn_DOM = document.getElementById("nextBtn");
		var prevBtn_DOM = document.getElementById("prevBtn");
		var muteBtn_DOM = document.getElementById("muteBtn");
		var clearBtn_DOM = document.getElementById("clearBtn");
		var shuffleBtn_DOM = document.getElementById("shuffleBtn");
		var repeatBtn_DOM = document.getElementById("repeatBtn");

		$( document ).ready(function() {
			playBtn_DOM.disabled = true;
			nextBtn_DOM.disabled = true;
			prevBtn_DOM.disabled = true;
			muteBtn_DOM.disabled = true;
			clearBtn_DOM.disabled = true;
			repeatBtn_DOM.disabled = true;
			shuffleBtn_DOM.disabled = true;
			$( "#dialog-message" ).dialog({
				modal: true,
				buttons: {
					Ok: function() {
						$( this ).dialog( "close" );
					}
				}
			});
		});

		function song_loaded(){
			("LOADED");
			setupSeek();
			audioplayer.play();
		}

		function volchange() {
			var audio = $("#audio");
			audioplayer.volume = (document.getElementById('rangeinput').value / 100);
			document.getElementById("rangevalue").value = document.getElementById('rangeinput').value;
		}
		function seekchange() {
			var audio = $("#audio");
			audioplayer.currentTime = (document.getElementById('seekrangeinput').value);
			document.getElementById("seekrangevalue").value = document.getElementById('seekrangeinput').value;
		}


		$("#clearBtn").click(function(){
			playlist = [];
			var audio = $("#audio");
			var input = $('#input');
			audio[0].pause();
			song_counter = 0;
			document.getElementById('play_list').innerHTML = '';
			nowplaying.innerHTML = '';
			input.replaceWith(input.val('').clone(true));
		});	

		$("#nextBtn").click(function(){
			if(song_counter == playlist.length-1){
				if(shuffleBtn_DOM.checked == true){
					song_counter = randomInt(0, playlist.length-1);
				}else if(shuffleBtn_DOM.checked == false){
					song_counter = 0;
				}
			}else{
				if(shuffleBtn_DOM.checked == true){
					song_counter = randomInt(0, playlist.length-1);
				}else if(shuffleBtn_DOM.checked == false){
					song_counter++;
				}
			}
			var audio = $("#audio");
			nowplaying.innerHTML = song_list[song_counter];
			var myLi = document.getElementById('play_list').getElementsByTagName('li');
			for(var i=0; i< (myLi.length);i++){
				myLi[i].style.background="none";
				myLi[i].style.color="white";
			}
			$("li").eq(song_counter).css("background", "white");
			$("li").eq(song_counter).css("color", "black");
			$("li").eq(song_counter).get(0).scrollIntoView();
			$("#mp3source").attr("src", playlist[song_counter]);
			audio[0].pause();
			audio[0].load();
		});	

		$("#prevBtn").click(function(){
			if(song_counter == 0){
				song_counter = playlist.length-1;
			}else{
				song_counter--;
			}
			var audio = $("#audio");
			nowplaying.innerHTML = song_list[song_counter];
			var myLi = document.getElementById('play_list').getElementsByTagName('li');
			for(var i=0; i< (myLi.length);i++){
				myLi[i].style.background="none";
				myLi[i].style.color="white";
			}
			$("li").eq(song_counter).css("background", "white");
			$("li").eq(song_counter).css("color", "black");
			$("li").eq(song_counter).get(0).scrollIntoView();
			$("#mp3source").attr("src", playlist[song_counter]);
			audio[0].pause();
			audio[0].load();
		});	

		$("#startBtn").click(function(){
			var h = $(window).height() - $("#play_list").offset().top;
			$('#play_list').height(h);
			song_counter = 0;
			var audio = $("#audio");
			audioplayer.volume = 0.5;
			nowplaying.innerHTML = song_list[song_counter];
			$("#mp3source").attr("src", playlist[song_counter]);
			audio[0].pause();
			audio[0].load();
			$( "li").eq(song_counter).css("background", "white");
			$( "li").eq(song_counter).css("color", "black");
			$("li").eq(song_counter).get(0).scrollIntoView();
			var myLi = document.getElementById('play_list').getElementsByTagName('li');
			for(var i=1; i< (myLi.length);i++){
				myLi[i].addEventListener('click', playlist_clicked, false);
			}

			playBtn_DOM.disabled = false;
			nextBtn_DOM.disabled = false;
			prevBtn_DOM.disabled = false;
			muteBtn_DOM.disabled = false;
			clearBtn_DOM.disabled = false;
			repeatBtn_DOM.disabled = false;
			shuffleBtn_DOM.disabled = false;
		});	



		function playlist_clicked(evt){
			song_counter = (evt.target.id - 1);
			var audio = $("#audio");
			var myLi = document.getElementById('play_list').getElementsByTagName('li');
			audio[0].pause();
			nowplaying.innerHTML = song_list[song_counter];
			$("#mp3source").attr("src", playlist[song_counter]);
			for(var i=0; i< (myLi.length);i++){
				myLi[i].style.background="none";
				myLi[i].style.color="white";
			}
			$("li").eq(song_counter).css("background", "white");
			$("li").eq(song_counter).css("color", "black");
			$("li").eq(song_counter).get(0).scrollIntoView();
			audio[0].pause();
			audio[0].load();
		}

		function change_play(){
			$("#playBtn").html('PAUSE');
		}

		$("#playBtn").click(function(){
			if (audioplayer.paused) {
				audioplayer.play();
				$("#playBtn").html('PAUSE');
			}   
			else {
				audioplayer.pause();
				$("#playBtn").html('PLAY');
			}
		});

		$("#muteBtn").click(function(){
			if (audioplayer.muted == true) {
				audioplayer.muted = false;
				$("#muteBtn").html('MUTE');
			}   
			else if (audioplayer.muted == false){
				audioplayer.muted = true;
				$("#muteBtn").html('UNMUTE');
			}
		});

		function next_song(){
			if(repeatBtn_DOM.checked == true){
				song_counter;
			}else if(shuffleBtn_DOM.checked == false){
				if(song_counter == playlist.length-1){
					if(shuffleBtn_DOM.checked == true){
						song_counter = randomInt(0, playlist.length-1);
					}else if(shuffleBtn_DOM.checked == false){
						song_counter = 0;
					}
				}else{
					if(repeatBtn_DOM.checked == true){
						song_counter = randomInt(0, playlist.length-1);
					}else if(shuffleBtn_DOM.checked == false){
						song_counter++;
					}
				}
			}
				var audio = $("#audio");
				var myLi = document.getElementById('play_list').getElementsByTagName('li');
				for(var i=0; i< (myLi.length);i++){
					myLi[i].style.background="none";
					myLi[i].style.color="white";
				}
				$("li").eq(song_counter).css("background", "white");
				$("li").eq(song_counter).css("color", "black");
				$("li").eq(song_counter).get(0).scrollIntoView();
				nowplaying.innerHTML = song_list[song_counter];
				$("#mp3source").attr("src", playlist[song_counter]);
				audio[0].pause();
				audio[0].load();
			}

			function handleFileSelect(evt) {
				var files = evt.target.files;
				for(var i=0,f;f=files[i];i++){
					var reader = new FileReader();
					var playList = document.getElementById('play_list');
					reader.onload = (function(theFile) {
						return function(e) {
							playlist[add_counter] = e.target.result;
							song_list[add_counter] = theFile.name;
							add_counter++;
							var newLI = document.createElement("li");
							newLI.id = add_counter;
							var newContent = document.createTextNode(theFile.name);
							newLI.appendChild(newContent);
							playList.appendChild(newLI);
						};
					})(f);
					reader.readAsDataURL(f);
				}
			}

			function setupSeek(){
				document.getElementById("seekrangeinput").value = 0;
				document.getElementById("seekrangeinput").min = 0;
				document.getElementById("seekrangeinput").max = audioplayer.duration;
			}

			document.getElementById('input').addEventListener('change', handleFileSelect, false);
			document.getElementById("rangeinput").addEventListener('change',volchange,false);
			document.getElementById("seekrangeinput").addEventListener('change',seekchange,false);
			audioplayer.addEventListener('ended', next_song, false);
			audioplayer.addEventListener('play', change_play, false);

			audioplayer.addEventListener('timeupdate',function (){
				var currentTime = audioplayer.currentTime;
				var duration = audioplayer.duration;
				var dsec= new Number();
				var dmin= new Number();
				var csec= new Number();
				var cmin= new Number();

				dsec = Math.floor( duration );    
				dmin = Math.floor( dsec / 60 );
				dmin = dmin >= 10 ? dmin : '0' + dmin;    
				dsec = Math.floor( dsec % 60 );
				dsec = dsec >= 10 ? dsec : '0' + dsec;

				csec = Math.floor( currentTime );    
				cmin = Math.floor( csec / 60 );
				cmin = cmin >= 10 ? cmin : '0' + cmin;    
				csec = Math.floor( csec % 60 );
				csec = csec >= 10 ? csec : '0' + csec;

				time.innerHTML = "(" + (cmin + ":"+ csec) + " / " + (dmin + ":" + dsec) + ")";
				document.getElementById("seekrangevalue").value = (cmin + ":"+ csec);
				document.getElementById("seekrangeinput").value = audioplayer.currentTime;
			});

			$("#playlistToggle").click(function(){
				$( "#play_list" ).slideToggle( "slow", function() {
				});
			});

			function randomInt(min,max)
			{
				return Math.floor(Math.random()*(max-(min+1))+(min+1));
			}


			$(document).keypress(function(event){
				var keycode = (event.keyCode ? event.keyCode : event.which);
				if(keycode == '32'){
					playBtn_DOM.click();
				}else if(keycode == '97'){
					prevBtn_DOM.click();
				}else if(keycode == '100'){
					nextBtn_DOM.click();
				}
			});