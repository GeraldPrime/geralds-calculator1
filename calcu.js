
const operandsBtns = document.querySelectorAll(".operand")
const operatorBtns = document.querySelectorAll(".operator")
const clearBtn = document.querySelectorAll("#clear")
const deleteBtn = document.querySelectorAll("#delete")

//EQUAL TO 
const equalsBtn = document.getElementById("equals")


//SCREENS
const prevScreen = document.querySelector("#prev")
const currentScreen = document.querySelector("#current")

//STATES
let currentScreenValue = ""
let prevScreenValue = ""
let operator = ""
let isEquals = true



console.log(clearBtn, deleteBtn)

// FUNCTIONS
function appendToScreen(e) {
    const key = e.target.innerHTML

    // Check if the current screen value exceeds 12 characters, and prevent further input
    if (currentScreenValue.length >= 12) return;

    //CHECK IF KEY IS ZERO AND PREVENT MULTIPLE INITIAL ZEROES

    if (
        key == "0" &&
        (currentScreenValue.length == 1) &&
        currentScreenValue.startsWith("0")
    ) return

    //change to second mumber if the start is zero
    if ((currentScreenValue.length == 1) &&
        currentScreenValue.startsWith("0") && key !== "0" && key !== "."
    ) {
        currentScreenValue = key
        displayValue()
        return
    }
    //check for dots
    if (currentScreenValue.includes(".") && key == ".") return

    if (isEquals) {
        currentScreenValue = ''
        isEquals= false
    }


    currentScreenValue += key
    displayValue()
    // currentScreen.inneerHTML += key

}

//DISPLAY CURRENT VALUES ON THE SCREEN
function displayValue() {
    prevScreen.innerHTML = `${prevScreenValue} ${operator}`
    currentScreen.innerHTML = currentScreenValue
}

function clearScreen() {
    //
    prevScreenValue = ""
    currentScreenValue = "0"
    operator= ""
    displayValue()
}

// delete value from the screen
function deleteValue() {

    if (prevScreenValue && currentScreenValue.length <= 1) {
        currentScreenValue = prevScreenValue
        prevScreenValue = ""
        operator = ""
        displayValue()
        return
    }


    if (currentScreenValue.length === 1) {
        currentScreen.innerHTML = '0';
    } else {
        const numbers = [...currentScreenValue]
        numbers.pop()
    
        // update the screen value
        currentScreenValue = numbers.join("")
        displayValue()
    }
}


function calculateResult() {

    let result = 0
    switch (operator) {
        case "+":
            result =(+prevScreenValue) + (+currentScreenValue)           
            break;
        case "-":
            result =(+prevScreenValue) - (+currentScreenValue)           
            break;
        case "÷":
            result = (+prevScreenValue) / (+currentScreenValue)           
            break;
        case "×":
            result =(+prevScreenValue) * (+currentScreenValue)           
            break;
    }
    return result
}

function handleOperator(e) {
    key = e.target.innerHTML

    if (!(+currentScreenValue))return

    if (operator && prevScreenValue) {
        const result = calculateResult()
        prevScreenValue = result.toString()
        operator = key
        currentScreenValue = ""
        displayValue()
        return
    }

    //SEt THE VALUES
    operator = key
    prevScreenValue = currentScreenValue
    currentScreenValue = ""
    displayValue()
   
}


//ASSIGNMENT
function handleKeyPress(e) {
    const key = e.key;

    if (!isNaN(parseInt(key))) { //  (/^[0-9]$/.test(key)) this is prefarable
        appendToScreen({ target: { innerHTML: key } });; 
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperator({ target: { innerHTML: key } }); 
    } else if (key === "Enter") {
        equals();
    } else if (key === "Escape") {
        clearScreen(); // 
    } else if (key === "Backspace") {
        deleteValue();
    }
}


document.addEventListener("keydown", handleKeyPress);


function equals() {
    if (operator && prevScreenValue && currentScreenValue) {
        const result = calculateResult();
        currentScreenValue = result.toString(); 
        prevScreenValue = "";
        operator = "";
        displayValue();
        isEquals = true
    }
}


equalsBtn.addEventListener("click", equals);




























// function back(symbol) {

//     if (screen.value.length === 1) {
//         screen.value = '0';
//     } else {
//         screen.value = screen.value.substring(0, screen.value.length - 1)
//     }
// }
// function handleDelete(symbol) {
//     // currentScreen = toString(currentScreen)
//     currentScreenValue = currentScreen.innerHTML

//     if (currentScreenValue.length === 1) {
//         currentScreen.innerHTML = '0';
//     }
//     else {
//         currentScreen.innerHTML = currentScreenValue.slice(0, currentScreenValue.length - 1) 

//     }


// function clearScreen() {
//     currentScreen.innerHTML= "0"
//     currentScreenValue.innerHTML = "0";
// }

//EVENTS
operandsBtns.forEach(btn => {
    //ATTACH EVENT TO IT
    btn.addEventListener("click", appendToScreen)
})
// clearBtn.addEventListener("click", clearScreen)
// deleteBtn.addEventListener("click", deleteValue)


operatorBtns.forEach(btn => {
    btn.addEventListener("click", handleOperator)
})







