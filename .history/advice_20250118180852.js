document.addEventListener('DOMContentLoaded', async function () {
    const goatAdvice = document.getElementById('advice-text');
    const goatImage = document.getElementById('goat-image');

    // Pega o conselho
    let adviceText = '';

    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
            throw new Error('Erro ao buscar conselho.');
        }
        const data = await response.json();
        adviceText = data.slip.advice;
    } catch (error) {
        goatAdvice.textContent = 'Não foi possível carregar um conselho. Tente novamente.';
        console.error('Erro na API Advice Slip:', error.message);
        return;
    }

    // Tradução do conselho
    try {
        const requestBody = {
            q: adviceText, // Texto do conselho
            source: 'en', // Idioma original
            target: 'pt', // Idioma de destino
            format: 'text', // Formato do texto
        };

        console.log('Corpo da requisição para tradução:', requestBody);

        const translationResponse = await fetch('https://pt.libretranslate.com/translate', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!translationResponse.ok) {
            throw new Error(`Erro ao traduzir o conselho. Status: ${translationResponse.status}`);
        }

        const translationData = await translationResponse.json();
        console.log('Resposta da tradução:', translationData);

        goatAdvice.textContent = translationData.translatedText; // Exibe o conselho traduzido
    } catch (error) {
        goatAdvice.textContent = adviceText; // Mostra o texto original caso a tradução falhe
        console.error('Erro na tradução:', error.message);
    }

    // Define uma imagem de cabra aleatória
    const goatImages = [
        'assets/cabra1.jpg',
        'assets/cabra2.jpg',
        'assets/cabra3.jpg',
        'assets/cabra4.jpg',
        'assets/cabra5.jpg',
        'assets/cabra6.jpg',
        'assets/cabra7.jpg',
        'assets/cabra8.jpg',
        'assets/cabra9.jpg',
        'assets/cabra10.jpg',
    ];

    function async getRandomGoatImage() {
        const randomIndex = Math.floor(Math.random() * goatImages.length);
        return goatImages[randomIndex];
    }

    const randomGoatImage = getRandomGoatImage();
    goatImage.src = randomGoatImage;
    goatImage.alt = 'Bodezinho aleatório';
});
