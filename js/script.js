const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");
timeTag = document.querySelector(".time span b")
mistakeTag = document.querySelector(".mistake span");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
tryAgainBtn = document.querySelector("button");


let timer,
maxTime = 60,
timeLeft = maxTime, 
charIndex = mistakes =  0;
isTyping = false;


function randomParagraph(){
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    //focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        
        if (typedChar == null){
            charIndex--;
            if (mistakes > 0){
                mistakes--;
            }else{
                mistakes = 0;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else{
            if(characters[charIndex].innerText == typedChar){
                characters[charIndex].classList.add("correct");
            } else{
                mistakes ++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        // if wpm value is 0, empty or infinity then setting it to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    
    } else{
        inpField.value = "";
        clearInterval(timer);
    }
}
function initTimer(){
    //If timeLeft is greater than 0 then decrement the timeLeft
    //Else clear the timer
    if (timeLeft > 0){
        timeLeft --;
        timeTag.innerText = timeLeft;
    } else{
        clearInterval(timer);
    }
};

function resetGame(){
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0; 
    if (i === text.length){
        textContent.innerHTML = "";
        i = 0;
        typing();
    }
    
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);


//Typing effect on the game title

var i = 0, text;
text = "Typing Speed Test Game."

let textContent = document.getElementById("text");


function typing(){
    if(i<text.length){
        textContent.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 80);
    }
}

typing();
