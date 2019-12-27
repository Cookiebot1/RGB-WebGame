var bodyElement = document.querySelector("body"); //Body (used to get background RGB without hardcoded values)
var squares = document.querySelectorAll(".square"); //Display RGB color squares
var messageDisplay = document.querySelector("#message"); //Game messages (try again, etch)
var h1 = document.querySelector("h1"); //Displays the correct color and name of the game
var colorDisplay = document.querySelector("#colorDisplay"); //Span in h1 that Displays selected correct color answer
var resetButton = document.querySelector("#reset"); //Game reset button
var diffucultyButtons = document.querySelectorAll(".mode") //Game mode buttons
var defaultH1BgColor = getComputedStyle(h1).backgroundColor //store default h1 background color

var colorAmount = 6; //Game starts with 6 colors
generateRndColors(colorAmount); //Generate default 6 colors and one correct answer to quess (hard mode)
colorDisplay.textContent = pickedColor; //Setting selected correct RGB value into the span

//Main game logic
for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
        var clickedColor = this.style.backgroundColor; //Get color of clicked square
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            changeAllSquareColorsTo(clickedColor);
            h1.style.backgroundColor = clickedColor;
            resetButton.textContent = "Play again?";
        }
        else {
            this.style.backgroundColor = getComputedStyle(bodyElement).backgroundColor; //Dynamically grab body background color
            messageDisplay.textContent = "Try again!";
        }
    })
};

//Reset button generates new colors with set colorAmount (colorAmount changed with the easy and hard buttons)
resetButton.addEventListener("click", function () {
    generateRndColors(colorAmount);
});

//Mode buttons
for (var i = 0; i < diffucultyButtons.length; i++) {
    diffucultyButtons[i].addEventListener("click", function () {
        diffucultyButtons[0].classList.remove("selected");
        diffucultyButtons[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent === "Easy" ? colorAmount = 3 : colorAmount = 6;
        generateRndColors(colorAmount);
    })
};

//Functions
function changeAllSquareColorsTo(color) { //loop all squares and change each to match given color
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function getRndInteger(min, max) { //Generate random integer between min and max (both inlcuded)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRndColors(num) { //Generate random colors, choose correct answer and handle UI changes related to it.

    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("rgb(" + getRndInteger(0, 255) + ", " + getRndInteger(0, 255) + ", " + getRndInteger(0, 255) + ")")
    }
    pickedColor = arr[getRndInteger(0, arr.length - 1)];

    colorDisplay.textContent = pickedColor;

    for (var i = 0; i < squares.length; i++) {
        if (arr[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = arr[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }

    h1.style.backgroundColor = defaultH1BgColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
}
