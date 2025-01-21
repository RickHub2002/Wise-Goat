document.addEventListener('DOMContentLoaded', async function() {
    const adviceTextElement = document.getElementById('advice-text');
    const goatImageElement = document.getElementById('goat-image');

    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
            throw new Error('Erro ao buscar conselho.');
        }
        const data = await response.json();
        adviceTextElement.textContent = data.slip.advice;
    } catch (error) {
        adviceTextElement.textContent = 'Não foi possível carregar um conselho. Tente novamente!';
        console.error('Erro na API Advice Slip:', error.message);
    }

    // Define a URL da imagem do bode
    const goatImageURL = 'http://placegoat.com/300/300';
    goatImageElement.src = goatImageURL;
    goatImageElement.alt = 'Bodezinho';
});
