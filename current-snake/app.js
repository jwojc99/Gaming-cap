window.addEventListener("load", () => {
	let snakeLength, snake, running, apple, move, nextMove;
	let gameOver = false;
	let points = 0;
	let myTimer;
	const ctx = document.getElementById("snake-canvas").getContext("2d");
	const endModal = document.querySelector(".modal");
	const modalText = document.querySelector(".end-message");
	const closeModalBtn = document.querySelector(".close");
	const scoreNumb = document.querySelector(".score-number");
	const score = document.querySelector(".score");

	// console.log(score);
	// console.log(score.style.display);

	// console.log(window.getComputedStyle(score).fontSize);

	closeModalBtn.addEventListener("click", () => {
		endModal.style.display = "none";
		gameLogic();
	});

	gameLogic();

	function gameLogic() {
		gameOver = false;
		setDefault();
		addKeyDownEventListener();
		myTimer = setInterval(renderFrame, 100);
	}

	function renderFrame() {
		if (gameOver == true) {
			console.log("zkonczono");
			modalText.innerHTML = `You lost with ${points} points.`;
			endModal.style.display = "block";

			clearInterval(myTimer);
			points = 0;
		}
		if (running) {
			if (nextMove.x !== -move.x || nextMove.y !== -move.y) {
				move = nextMove;
			}
			snake.push({
				x: processBound(getHead().x + move.x),
				y: processBound(getHead().y + move.y),
			});
			if (
				snake.filter((square) => square.x === getHead().x && square.y === getHead().y)
					.length >= 2
			) {
				gameOver = true;
				console.log("koniec");
				// setDefault();
			} else {
				if (getHead().x === apple.x && getHead().y === apple.y) {
					snakeLength++;
					points++;
					console.log(points);
					apple = generateApple();
					scoreNumb.innerHTML = points;
				}
				snakeLength <= 0 ? snake.shift() : snakeLength--;
			}
		}
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.fillStyle = "greenyellow";
		snake.forEach((elem) => ctx.fillRect(elem.x * 20, elem.y * 20, 18, 18));

		ctx.fillStyle = "red";
		ctx.fillRect(apple.x * 20, apple.y * 20, 18, 18);
	}

	function getHead() {
		return snake[snake.length - 1];
	}

	function processBound(number) {
		if (number > 19 || number < 0) {
			running = false;
			gameOver = true;
			console.log("koniec");
		}
		return number;
	}

	function setDefault() {
		scoreNumb.innerHTML = 0;
		running = false;
		snakeLength = 2;
		[move, nextMove] = Array(2).fill({ x: 0, y: 0 });
		snake = [{ x: 10, y: 10 }];
		apple = generateApple();
	}
	function generateApple() {
		let location;
		do {
			location = { x: genereateRandomNumber(1, 20), y: genereateRandomNumber(1, 20) };
		} while (snake.filter((elem) => elem.x == location.x && elem.y == location.y).length > 0);
		return location;
	}

	function genereateRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	function addKeyDownEventListener() {
		window.addEventListener("keydown", (e) => {
			if (e.code.startsWith("Arrow")) {
				e.preventDefault();
				running = true;
			}
			switch (e.code) {
				case "ArrowLeft":
					nextMove = { x: -1, y: 0 };
					break;
				case "ArrowRight":
					nextMove = { x: 1, y: 0 };
					break;
				case "ArrowUp":
					nextMove = { x: 0, y: -1 };
					break;
				case "ArrowDown":
					nextMove = { x: 0, y: 1 };
			}
		});
	}
});
