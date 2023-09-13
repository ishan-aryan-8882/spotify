//initialize the variables
let index = 0;
let audioElement = new Audio("blackandwhite.mp3");
let masterPlay = document.getElementById("pl");
//masterPlay -> pl
let myProgressBar = document.getElementById("volume");
let masterSongName = document.getElementById("masterSpotifySong");
let masterImage = document.getElementById("masterSpotifyImg");
//volume range -> vol
let volumeRange = document.getElementById("vol");
let songs = [
  {
    songName: "Black and White",
    filePath: "blackandwhite.mp3",
    coverPath: "mc.jpg",
    duration: "2:47",
  },
  {
    songName: "Lover",
    filePath: "Lover.mp3",
    coverPath: "lover.jpg",
    duration: "3:10",
  },
  {
    songName: "Cali",
    filePath: "cali.mp3",
    coverPath: "cali.jpg",
    duration: "2:39",
  },
  {
    songName: "Champagne",
    filePath: "champagne.mp3",
    coverPath: "cp.jpg",
    duration: "3:02",
  },
  {
    songName: "Luna",
    filePath: "luna.mp3",
    coverPath: "luna.jpg",
    duration: "3:06",
  },
  {
    songName: "Void",
    filePath: "void.mp3",
    coverPath: "void.jpg",
    duration: "3:33",
  },
  {
    songName: "Da Crew",
    filePath: "dc.mp3",
    coverPath: "dc.jpg",
    duration: "3:02",
  },
  {
    songName: "Hoops",
    filePath: "hoops.mp3",
    coverPath: "hoops.jpg",
    duration: "3:11",
  },
  {
    songName: "Vibe",
    filePath: "vibe.mp3",
    coverPath: "vibe.jpg",
    duration: "3:02",
  },
];

//songItem -> song-info
// Get all song info elements
let songInfoElements = document.querySelectorAll(".song-info");

// Loop through song items and update the content
songInfoElements.forEach((element, i) => {
  let songImgElement = element.querySelector(".song-img");
  let songNameElement = element.querySelector(".song-name");
  let songDurationElement = element.querySelector(".container-box .duration");

  songImgElement.style.backgroundImage = `url(${songs[i].coverPath})`;
  songNameElement.querySelector("#firstt").textContent = songs[i].songName;
  songDurationElement.innerText = songs[i].duration;
});

//handle pause/play
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
  updateMasterSongName();
});

//listening to events
audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  const progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

//updating the volume
volumeRange.addEventListener("input", () => {
  let volumeValue = volumeRange.value;
  audioElement.volume = volumeValue / 100;
});

function updateMasterSongName() {
  masterSongName.innerText = songs[index].songName;
  masterImage.style.backgroundImage = `url(${songs[index].coverPath})`; // Add backticks around the URL
}

document.querySelectorAll(".container-box .song-count").forEach((element) => {
  element.addEventListener("click", (e) => {
    index = parseInt(e.target.id);
    console.log(e.target);
    audioElement.src = `${songs[index].filePath}`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  });
});

document.querySelector(".fa-forward-step").addEventListener("click", () => {
  if (index >= 9) index = 0;
  else index += 1;
  updateMasterSongName();
  audioElement.src = `${songs[index].filePath}`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.querySelector(".fa-backward-step").addEventListener("click", () => {
  if (index <= 0) index = 0;
  else index -= 1;
  updateMasterSongName();
  audioElement.src = `${songs[index].filePath}`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

songInfoElements.forEach((element) => {
  element.addEventListener("click", (e) => {
    index = parseInt(e.target.id);
    updateMasterSongName(); // Update the masterSongName
    audioElement.src = `${songs[index].filePath}`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  });
});

document.addEventListener("click", (event) => {
  const microphoneIcon = document.querySelector(".fa-microphone");
  const microphoneIcon2 = document.querySelector(".fa-microphone-slash");

  if (event.target === microphoneIcon) {
    microphoneIcon.classList.remove("fa-microphone");
    microphoneIcon.classList.add("fa-microphone-slash");
  } else if (event.target === microphoneIcon2) {
    microphoneIcon2.classList.remove("fa-microphone-slash");
    microphoneIcon2.classList.add("fa-microphone");
  }
});

document.querySelector(".fa-download").addEventListener("click", (event) => {
  const downloadIcon = document.querySelector(".fa-download");
  downloadIcon.classList.toggle("fa-arrow-down");
  downloadIcon.classList.toggle("fa-beat-fade");
  setTimeout(() => {
    downloadIcon.classList.toggle("fa-check");
    downloadIcon.classList.remove("fa-beat-fade");
  }, 2000); // Add the "fa-check" class after 1 second
});

document.querySelector(".fa-volume-off").addEventListener("click", () => {
  const volumeIcon = document.querySelector(".fa-volume-off");
  const volumeIconValue = document.querySelector("#vol");

  if (audioElement.volume === 0) {
    volumeIcon.classList.remove("fa-volume-xmark");
    audioElement.volume = volumeIconValue.value / 100;
  } else {
    volumeIcon.classList.add("fa-volume-xmark");
    audioElement.volume = 0;
  }
});

document
  .querySelector(".container-a .fa-heart")
  .addEventListener("click", () => {
    const heartIcon = document.querySelector(".container-a .fa-heart");
    heartIcon.classList.toggle("fa-solid");
  });

document
  .querySelector(".fa-regular.fa-bookmark")
  .addEventListener("click", () => {
    let bookMark = document.querySelector(".fa-regular.fa-bookmark");
    bookMark.classList.toggle("fa-solid");
  });

  document.querySelectorAll(".container-box .song-count").forEach((countElement, index) => {
    countElement.addEventListener('click', () => {
        let songNameElements = document.querySelectorAll(".container-box .song-name #firstt");
        let songCountElements = document.querySelectorAll(".container-box .song-count");

        songNameElements.forEach((songNameElement, songIndex) => {
            if (songIndex === index) {
                songNameElement.style.color = "green";
                songCountElements[songIndex].style.color = "green";
                songCountElements[songIndex].style.fontWeight = "600";
            } else {
                songNameElement.style.color = "white";
                songCountElements[songIndex].style.color = "white";
                songCountElements[songIndex].style.fontWeight = "normal";
            }
        });
    });
});


  
  