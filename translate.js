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