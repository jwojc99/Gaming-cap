// GAME

const content = document.querySelector(".text-content");
const gameField = document.querySelector(".game-content");
const square = document.querySelector(".hidden-thing");
const backGr = document.querySelector(".shadow");
const textCongrats = document.querySelector(".after-found");
const textInstruction = document.querySelector(".to-hide");
const smallerText = document.querySelector(".smaller-text");

let varWidth;
let varHeight;
let objFound = true;
let counter = 0;

document.body.addEventListener("click", () => {
	counter++;
	console.log(counter);
	if (!objFound) {
		if (!(counter % 5) && counter % 10) {
			smallerText.innerHTML = "Ups,not here...";
			smallerText.style.visibility = "visible";
		} else if (!(counter % 10) && counter != 0) {
			smallerText.innerHTML = "Frick! Hard to find it";
			smallerText.style.visibility = "visible";
		} else {
			smallerText.style.visibility = "hidden";
		}
	}
});

square.addEventListener("click", () => {
	// counter++;
	objFound = !objFound;
	backGr.classList.toggle("dark");
	square.classList.toggle("dark");

	if (objFound) {
		setTimeout(() => {
			square.style.left = 50 + "%";
			square.style.top = 50 + "%";
			square.style.transform = "translate(-50%, -50%)";
			textCongrats.style.visibility = "visible";

			smallerText.innerHTML = `You manage to find square after ${counter} attempts. To play again click the square.`;
			smallerText.style.visibility = "visible";
		}, 1000);
	} else {
		hideSquare();
	}
});

function hideSquare() {
	counter = -1;
	setTimeout(() => {
		textCongrats.style.visibility = "hidden";
		smallerText.style.visibility = "hidden";
		textInstruction.style.visibility = "hidden";

		randomNumbers();
		if (
			varHeight < 200 ||
			varHeight > window.screen.height - 150 ||
			varWidth < 150 ||
			varWidth > window.screen.width - 150
		) {
			randomNumbers();
		}

		square.style.left = varWidth + "%";
		square.style.top = varHeight + "%";
		square.style.transform = "translate(-50%, 50%);";
	}, 2000);
}

function randomNumbers() {
	varWidth = Math.floor(Math.random() * 80 + 20);
	varHeight = Math.floor(Math.random() * 80 + 20);
	console.log(`width:${varWidth}, height:${varHeight}`);
}
