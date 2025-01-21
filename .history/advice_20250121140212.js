document.getElementById('home-page').addEventListener('click', () => {
    window.location.href = "main.html";
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
        adviceText = data.slip.advice;
    } catch (error) {
        goatAdvice.textContent = 'Não foi possível carregar um conselho. Tente novamente.';
        console.error('Erro na API Advice Slip:', error.message);
        return;
    }

    // Tradução do conselho para o português
    try {
        const translateResponse = await fetch('https://api-free.deepl.com/v2/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                auth_key: 'a893b981-ef61-4593-840a-bf57e393797b:fx', // Substitua pela sua chave válida
                text: adviceText,
                target_lang: 'PT',
            }),
        });

        if (!translateResponse.ok) {
            throw new Error('Erro ao traduzir o conselho.');
        }

        const translateData = await translateResponse.json();
        adviceText = translateData.translations[0].text;
    } catch (error) {
        console.error('Erro na API DeepL:', error.message);
    }

    // Exibe o conselho traduzido na tela
    goatAdvice.textContent = adviceText;

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
