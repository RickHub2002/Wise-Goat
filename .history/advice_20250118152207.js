document.getElementById('home-page').addEventListener('click', () => {
    window.location.href = 'main.html'
})

document.addEventListener('DOMContentLoaded', async function() {
    const goatAdvice = document.getElementById('advice-text')
    const goatImage = document.getElementById('goat-image')

    try {
        const response = await fetch('https://api.adviceslip.com/advice')
    }
})