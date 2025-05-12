export function getTotalSeconds(hourInput, minuteInput, secondInput) {
    const h = parseInt(hourInput.value) || 0;
    const m = parseInt(minuteInput.value) || 0;
    const s = parseInt(secondInput.value) || 0;
    return h * 3600 + m * 60 + s;
}

export function updateStartButtonState(hourInput, minuteInput, secondInput, startPauseBtn) {
    const seconds = getTotalSeconds(hourInput, minuteInput, secondInput);
    if (seconds <= 0) {
        startPauseBtn.classList.add('disabled-gradient');
        startPauseBtn.disabled = true;
    } else {
        startPauseBtn.classList.remove('disabled-gradient');
        startPauseBtn.disabled = false;
    }
}
