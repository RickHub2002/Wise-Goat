document.getElementById('home-page').addEventListener('click', () => {
    window.location.href = 'main.html'
})

document.addEventListener('DOMContentLoaded', async function() {
    const goatAdvice = document.getElementById('advice-text')
    const goatImage = document.getElementById('goat-image')

    try {
        const response = await fetch('https://api.adviceslip.com/advice')
        if (!response.ok) {
            throw new Error('Erro ao buscar conselho.');
        }
        const data = await response.json()
        goatAdvice.textContent = data.slip.advice
    } catch (error) {
        goatAdvice.textContent = 'Não foi possível carregar um conselho. Tente novamente'
        console.error('Erro na Api advice Slip:', error.message)
    }

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
    ]

    // Função para selecionar uma imagem aleatoria

    function getRandomGoatImage() {
        const randomIndex = Math.floor(Math.random() * goatImages.length)
        return goatImages[randomIndex]
    }
})