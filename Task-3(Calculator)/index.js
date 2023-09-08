function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const displayValue = document.getElementById('display').value;
    try {
        const result = eval(displayValue);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

// Event listener for keyboard input
document.addEventListener('keypress', (event) => {
    const keyValue = event.key;

    // Check if the pressed key is a valid input (numbers, operators, or Enter)
    if (/[\d+\-*/=]|Enter/.test(keyValue)) {
        if (keyValue === 'Enter') {
            calculateResult();
        } else {
            appendToDisplay(keyValue);
        }
    }
});

// Prevent the default behavior of some keys (e.g., Enter)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});