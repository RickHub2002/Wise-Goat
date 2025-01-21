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
    }
})