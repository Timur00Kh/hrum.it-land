// Копирование промокода в буфер обмена
document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-btn')

    copyButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const copyText = button.getAttribute('data-copy')

            try {
                await navigator.clipboard.writeText(copyText)

                // Визуальная обратная связь
                const originalText = button.textContent
                button.textContent = 'Скопировано!'
                button.classList.add('copied')

                setTimeout(() => {
                    button.textContent = originalText
                    button.classList.remove('copied')
                }, 2000)
            } catch (err) {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea')
                textArea.value = copyText
                textArea.style.position = 'fixed'
                textArea.style.opacity = '0'
                document.body.appendChild(textArea)
                textArea.select()

                try {
                    document.execCommand('copy')
                    const originalText = button.textContent
                    button.textContent = 'Скопировано!'
                    button.classList.add('copied')

                    setTimeout(() => {
                        button.textContent = originalText
                        button.classList.remove('copied')
                    }, 2000)
                } catch (err) {
                    alert('Не удалось скопировать промокод')
                }

                document.body.removeChild(textArea)
            }
        })
    })
})
