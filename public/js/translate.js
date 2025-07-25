async function translateText(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const text = formData.get('text');
    const toLang = formData.get('toLang');
    const resultDiv = document.getElementById('result');

    if (!text) {
        resultDiv.innerHTML = 'Please enter text to translate';
        return;
    }

    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ text, toLang })
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `Error: ${data.error}`;
        } else {
            resultDiv.innerHTML = `Translation: ${data.translation}`;
        }
    } catch (err) {
        resultDiv.innerHTML = 'Error: Translation failed';
        console.error(err);
    }
}


const menuIcon = document.querySelector('.menu-icon');
const menuContainer = document.querySelector('.menu-container');

menuIcon.addEventListener('click', () => {
    menuContainer.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!menuContainer.contains(e.target)) {
        menuContainer.classList.remove('active');
    }
});

function change_input_output_ug() {
    if (inputLanguageDropdown.querySelector(".selected").dataset.value == 'ug' ||
        inputLanguageDropdown.querySelector(".selected").dataset.value == "ur" ||
        inputLanguageDropdown.querySelector(".selected").dataset.value == "fa" ||
        inputLanguageDropdown.querySelector(".selected").dataset.value == "ar"
    ) {
        inputTextElem.style.direction = 'rtl';
        inputTextElem.style.fontFamily = 'chiwer';
    } else {
        inputTextElem.style.direction = 'ltr';
        inputTextElem.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    }
    if (outputLanguageDropdown.querySelector(".selected").dataset.value == 'ug') {
        outputTextElem.style.direction = 'rtl';
        outputTextElem.style.fontFamily = 'chiwer';
    } else {
        outputTextElem.style.direction = 'ltr';
        outputTextElem.style.fontFamily = '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif';
    }
}


