document.getElementById('home-page').addEventListener('click', () => {
    window.location.href = 'main.html';
});

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
        adviceText = data.slip.advice; // Salva o conselho original
    } catch (error) {
        goatAdvice.textContent = 'Não foi possível carregar um conselho. Tente novamente';
        console.error('Erro na API Advice Slip:', error.message);
        return; // Sai da execução se não conseguir buscar o conselho
    }

    // Tradução do conselho
    try {
        const translationResponse = await fetch('https://pt.libretranslate.com/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: adviceText,
                source: 'en',
                target: 'pt',
                format: 'text',
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!translationResponse.ok) {
            throw new Error('Erro ao traduzir o conselho.');
        }

        const translationData = await translationResponse.json();
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

    function getRandomGoatImage() {
        const randomIndex = Math.floor(Math.random() * goatImages.length);
        return goatImages[randomIndex];
    }

    const randomGoatImage = getRandomGoatImage();
    goatImage.src = randomGoatImage;
    goatImage.alt = 'Bodezinho aleatório';
});
