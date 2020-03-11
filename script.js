// variables
var colors = [];
var pickedColor;
var numberOfSquares = 6;

//selectors
var squares = document.querySelectorAll('.square');
var h1 = document.querySelector('h1');
var colorDisplay = document.getElementById('colorDisplay');
var resetButton = document.getElementById('reset');
var message = document.querySelector('#message');
var modeButtons = document.querySelectorAll('.mode');
//initialization
init();

//functions
function autoGenColor(x) {
	var arr = [];
	for (var i = 0; i < x; i++) {
		arr.push(randomColor());
	}

	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return (rgbStr = 'rgb(' + r + ', ' + g + ', ' + b + ')');
}

function pickColor() {
	var randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}

function init() {
	configButtons();
	configSquares();
	reset();
}

function reset() {
	colors = autoGenColor(numberOfSquares);
	pickedColor = pickColor();

	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}

	colorDisplay.textContent = pickedColor;
	message.textContent = '';
	h1.style.backgroundColor = '#e35d5b';
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block';
			squares[i].backgroundColor = colors[i];
		} else {
			squares[i].style.display = 'none';
		}
	}
}

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function configSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener('click', function() {
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				message.textContent = 'Correct !!!';
				h1.style.backgroundColor = clickedColor;
				changeColors(clickedColor);
			} else {
				message.textContent = 'Wrong !!!';
				this.style.backgroundColor = '#232323';
			}
		});
	}
}

function configButtons() {
	for (var k = 0; k < modeButtons.length; k++) {
		modeButtons[k].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			modeButtons[2].classList.remove('selected');
			this.classList.add('selected');

			if (this.textContent === 'Easy') {
				numberOfSquares = 3;
			} else if (this.textContent === 'Hard') {
				numberOfSquares = 6;
			} else {
				numberOfSquares = 9;
			}
			reset();
		});
	}
}

//event handelers
resetButton.addEventListener('click', function() {
	reset();
});
