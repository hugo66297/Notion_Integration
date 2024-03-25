console.clear();

const sliderProps = {
	fill: "#0B1EDF",
	background: "rgba(255, 255, 255, 0.214)",
};

// Selecting the Range Slider container which will effect the LENGTH property of the password.
const slider = document.querySelector(".range__slider");

// Text which will show the value of the range slider.
const sliderValue = document.querySelector(".length__title");

// Using Event Listener to apply the fill and also change the value of the text.
slider.querySelector("input").addEventListener("input", event => {
	sliderValue.setAttribute("data-length", event.target.value);
	securityCheck();
	applyFill(event.target);
});

// Selecting the range input and passing it in the applyFill func.
applyFill(slider.querySelector("input"));
// This function is responsible to create the trailing color and setting the fill.
function applyFill(slider) {
	const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
	const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
			0.1}%)`;
	slider.style.background = bg;
	sliderValue.setAttribute("data-length", slider.value);
}

//Allow Symbols
const symbols = '~!@#$%^&*()_+{}":?><;.,';
const inputChoose = document.getElementById("choose");
inputChoose.value = symbols;

// Object of all the function names that we will use to create random letters of password
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

// Random more secure value
function secureMathRandom() {
	return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1);
}

// Generator Functions
// All the functions that are responsible to return a random value taht we will use to create password.
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}
function getRandomSymbol() {
	var symbols = document.getElementById("choose").value;
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// Selecting all the DOM Elements that are necessary -->
//The Big container that contain everything (used to change is height property)
const bigContainer = document.getElementById("bigdiv");
// The Viewbox where the result will be shown
const resultEl = document.getElementById("result");
// The input slider, will use to change the length of the password
const lengthEl = document.getElementById("slider");
// The Viewbow where the security image & info will be shown
const secDiv = document.getElementById("secDiv");
// And it's paragraph
const securityInfo = document.getElementById("securityInfo");

// Checkboxes representing the options that is responsible to create differnt type of password based on user
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");

// Button to generate the password
const generateBtn = document.getElementById("generate");
// Button to copy the text
const copyBtn = document.getElementById("copy-btn");
// Result viewbox container
const resultContainer = document.querySelector(".result");
// Text info showed after generate button is clicked
const copyInfo = document.querySelector(".result__info.right");
// Text appear after copy button is clicked
const copiedInfo = document.querySelector(".result__info.left");

// if this variable is trye only then the copyBtn will appear, i.e. when the user first click generate the copyBth will interact.
let generatedPassword = false;

// Update Css Props of the COPY button
// Getting the bounds of the result viewbox container
let resultContainerBound = {
	left: resultContainer.getBoundingClientRect().left,
	top: resultContainer.getBoundingClientRect().top,
};
// This will update the position of the copy button based on mouse Position
resultContainer.addEventListener("mousemove", e => {
	resultContainerBound = {
		left: resultContainer.getBoundingClientRect().left,
		top: resultContainer.getBoundingClientRect().top,
	};
	if(generatedPassword){
		copyBtn.style.opacity = '1';
		copyBtn.style.pointerEvents = 'all';
		copyBtn.style.setProperty("--x", `${e.x - resultContainerBound.left}px`);
		copyBtn.style.setProperty("--y", `${e.y - resultContainerBound.top}px`);
	}else{
		copyBtn.style.opacity = '0';
		copyBtn.style.pointerEvents = 'none';
	}
});
window.addEventListener("resize", e => {
	resultContainerBound = {
		left: resultContainer.getBoundingClientRect().left,
		top: resultContainer.getBoundingClientRect().top,
	};
});

// Copy Password in clipboard
copyBtn.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;
	if (!password || password == "CLICK GENERATE") {
		return;
	}
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();

	copyInfo.style.transform = "translateY(200%)";
	copyInfo.style.opacity = "0";
	copiedInfo.style.transform = "translateY(0%)";
	copiedInfo.style.opacity = "0.75";
});

// When Generate is clicked Password id generated.
generateBtn.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numberEl.checked;
	const hasSymbol = symbolEl.checked;
	generatedPassword = true;
	resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
	copyInfo.style.transform = "translateY(0%)";
	copyInfo.style.opacity = "0.75";
	copiedInfo.style.transform = "translateY(200%)";
	copiedInfo.style.opacity = "0";
});

// Function responsible to generate password and then returning it.
function generatePassword(length, lower, upper, number, symbol) {
	let generatedPassword = "";
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
	if (typesCount === 0) {
		return "";
	}
	for (let i = 0; i < length; i++) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	return generatedPassword.slice(0, length)
									.split('').sort(() => Math.random() - 0.5)
									.join('');
}

// function that handles the checkboxes state, so at least one needs to be selected. The last checkbox will be disabled.
function disableOnlyCheckbox(){
	let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked)
	totalChecked.forEach(el => {
		if(totalChecked.length == 1){
			el.disabled = true;
		}else{
			el.disabled = false;
		}
	})
}
[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {
	el.addEventListener('click', () => {
		disableOnlyCheckbox()
		securityCheck()
	})
});

//function that display the security info
function securityCheck(){
	let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked)
	totalChecked.forEach(el => {
		
		if(lengthEl.value <= 6){
			securityStyleChange(1);
		}else if (lengthEl.value <= 10){
			if(totalChecked.length <= 2){
				securityStyleChange(1);
			}else{
				securityStyleChange(2);
			}
		}else if (lengthEl.value <= 14){
			if(totalChecked.length == 1){
				securityStyleChange(1);
			}else if(totalChecked.length <= 3){
				securityStyleChange(2);
			}else{
				securityStyleChange(3);
			}
		}else if (lengthEl.value <= 16){
			if(totalChecked.length == 1){
				securityStyleChange(2);
			}else if(totalChecked.length <= 3){
				securityStyleChange(3);
			}else{
				securityStyleChange(4);
			}
		}else if (lengthEl.value <= 24){
			if(totalChecked.length <= 2){
				securityStyleChange(3);
			}else if(totalChecked.length <= 3){
				securityStyleChange(4);
			}else{
				securityStyleChange(5);
			}
		}else{
			if(totalChecked.length == 1){
				securityStyleChange(3);
			}else if(totalChecked.length == 2){
				securityStyleChange(4);
			}else{
				securityStyleChange(5);
			}
		}
	})
}
function securityStyleChange(val){
	if(val == 0){
		securityInfo.innerText = "Bro...u R SUS";
		secDiv.style.background = "linear-gradient(135deg, #764ba2 0%, #667eea 100%)";
	} else if (val == 1) {
		securityInfo.innerText = "Very Weak";
		secDiv.style.background = "none";
		secDiv.style.backgroundColor = "#D2636D";
	} else if (val == 2) {
		securityInfo.innerText = "Weak";
		secDiv.style.background = "none";
		secDiv.style.backgroundColor = "#F0B783";
	} else if (val == 3) {
		securityInfo.innerText = "Good";
		secDiv.style.background = "none";
		secDiv.style.backgroundColor = "#EDEB9F";
	} else if (val == 4) {
		securityInfo.innerText = "Strong";
		secDiv.style.background = "none";
		secDiv.style.backgroundColor = "#D6F1AB";
	} else {
		securityInfo.innerText = "Very Strong";
		secDiv.style.background = "none";
		secDiv.style.backgroundColor = "#9EE451";
	}
}

var appear = document.getElementById("appear");

appear.addEventListener('input', function(){
	var sym = document.getElementById("choose").value;
	if (sym.length <= 2) {
		securityStyleChange(0);
	}else{
		securityCheck();
	}
});

//display symbol (when checked)
symbolEl.addEventListener('change', function() {
	
    if (symbolEl.checked) {
    	bigContainer.style.height = '660px';
        appear.style.display = 'block';
    } else {
    	bigContainer.style.height = '600px';
        appear.style.display = 'none';
    }
  });



//Very Weak   : #D2636D
//Weak        : #F0B783
//Good        : #EDEB9F
//Strong      : #D6F1AB
//Very Strong : #9EE451