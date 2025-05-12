import { updateStartButtonState } from "./timer-utils.js";

let recognition;
let isListening = false;
let timerControls = null;

function initializeRecognition() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        console.warn("Web Speech API not supported");
        return false;
    }

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true; // ✅ Keep listening until manually stopped
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.toLowerCase().trim();
        console.log("Detected speech:", transcript);
        processVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
        isListening = false;
    };

    recognition.onend = () => {
        if (isListening) {
            console.log("Restarting recognition...");
            recognition.start(); // ✅ Automatically restart
        }
    };

    return true;
}

export function processVoiceCommand(transcript) {
    if (!timerControls) return;

    const { hourInput, minuteInput, secondInput, startButton } = timerControls;

    // Time parsing logic
    const timePattern = /(\d+)\s*(hour|hr|minute|min|second|sec)s?/gi;
    let match;
    let timeSet = false;
    const timeValues = { hours: 0, minutes: 0, seconds: 0 };

    while ((match = timePattern.exec(transcript))) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase().charAt(0);
        if (unit === 'h') timeValues.hours = value;
        else if (unit === 'm') timeValues.minutes = value;
        else if (unit === 's') timeValues.seconds = value;
        timeSet = true;
    }

    if (timeSet) {
        hourInput.value = String(timeValues.hours).padStart(2, '0');
        minuteInput.value = String(timeValues.minutes).padStart(2, '0');
        secondInput.value = String(timeValues.seconds).padStart(2, '0');
        updateStartButtonState(hourInput, minuteInput, secondInput, startButton);
    }

    // Command mapping
    const commands = {
        start: ['start', 'start timer', 'begin', 'go'],
        pause: ['pause', 'pause timer', 'stop', 'stop timer', 'hold'],
        reset: ['reset', 'reset timer', 'clear', 'restart']
    };

    for (const [action, keywords] of Object.entries(commands)) {
        if (keywords.some(keyword => transcript.includes(keyword))) {
            if (action === 'start') {
                startButton.click();
            } else if (action === 'pause' && startButton.textContent === 'Pause') {
                startButton.click();
            } else if (action === 'reset') {
                document.getElementById('resetBtn')?.click();
            }
            break;
        }
    }
}

export function startListening() {
    if (!recognition && !initializeRecognition()) {
        console.error("Recognition initialization failed");
        return;
    }

    if (!isListening) {
        try {
            recognition.start();
            isListening = true;
            console.log("Voice recognition started...");
        } catch (error) {
            console.error("Recognition start failed:", error);
            isListening = false;
        }
    }
}

export function stopListening() {
    if (recognition && isListening) {
        recognition.stop();
        isListening = false;
        console.log("Voice recognition manually stopped.");
    }
}

export function setupVoiceControl(controls) {
    timerControls = controls;
    initializeRecognition();

    const voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            startListening();
        });
    }

    const stopBtn = document.getElementById('stopVoiceBtn');
    if (stopBtn) {
        stopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopListening();
        });
    }

    return { startListening, stopListening };
}

// Allow global access for wake-word trigger
window.startListening = startListening;
window.stopListening = stopListening;
