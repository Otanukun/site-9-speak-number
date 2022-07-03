const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log('number:', randomNum);

function getRandomNumber () {
    return Math.floor(Math.random() * 100) +1;//1 - 100;
}

window.SpeechRecognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();

recognition.start();

function writeMessage(msg) {
        msgEl.innerHTML = `
         <div>You said:</div>
         <span class="box">${msg}</span>
        `;
   }


function chekNumber(msg) {
    const num = +msg;
    // console.log(num);
    if (isNaN(num))
    {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }
    
    if (num === 300) {
        msgEl.innerHTML += '<div>Launching the secret code: protocol Tractorist</div>';
        return;
    }

    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    if (num === randomNum)  {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number! <br><br>
                It was ${num}<h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    }

    else if (num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER</div>';
    }
    else {
        msgEl.innerHTML += '<div>GO HIGHER mafaka</div>';
    }
}

function onSpeek (e) {
    console.log(e);
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    chekNumber(msg);
}

recognition.addEventListener('result', onSpeek);
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if (e.target.id == "play-again") {
        window.location.reload();
    }
});

 //chekNumber('5a');