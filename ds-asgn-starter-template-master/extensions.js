
//Random decimal between 2 values
Math.randomDec = function(low, high) {
    return Math.random() * (high - low) + low;
}

//random int between 2 values
Math.randomInt = function(low, high) {
    return Math.floor(Math.randomDec(low, high));
}

//Event code listener
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(event) {
    console.log(event.code);
}


//Captialize first letter of every word
function capitalize(word){
    if (typeof word !== 'string') return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
}