const song = document.querySelector(".song");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 1800;
let loopFlag = 0;
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${
	Math.floor(fakeDuration % 60) + "0"
}`;

sounds.forEach((sound) => {
	sound.addEventListener("click", function () {
		song.src = this.getAttribute("data-sound");
		video.src = this.getAttribute("data-video");
		checkPlaying(song);
	});
});

play.addEventListener("click", function () {
	checkPlaying(song);
});

timeSelect.forEach((option) => {
	option.addEventListener("click", function () {
		fakeDuration = this.getAttribute("data-time");
		timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${
			Math.floor(fakeDuration % 60) + "0"
		}`;
	});
});

const checkPlaying = (song) => {
	if (song.paused) {
		song.play();
		song.onended = function () {
			loopFlag = loopFlag + 1;
			song.play();
		};
		video.play();
		play.src = "./svg/pause.svg";
	} else {
		song.pause();
		video.pause();
		play.src = "./svg/play.svg";
	}
};
song.ontimeupdate = function () {
	let currentTime = song.currentTime;
	let duration = song.duration;
	let elapsed;
	if (loopFlag === 0) {
		elapsed = fakeDuration - currentTime;
	} else {
		elapsed = fakeDuration - song.duration * loopFlag - currentTime;
	}
	let progress =
		outlineLength -
		((duration * loopFlag + currentTime) / fakeDuration) * outlineLength;
	let seconds = Math.floor(elapsed % 60);
	let minutes = Math.floor(elapsed / 60);
	timeDisplay.textContent = `${minutes}:${seconds}`;

	outline.style.strokeDashoffset = progress;

	if (currentTime >= fakeDuration) {
		song.pause();
		song.currentTime = 0;
		play.src = "./svg/play.svg";
		video.pause();
	}
};
