function sleep(time) {
    return new Promise((resolve) => setTimeout(() => resolve(), time))
}
;(async () => {
    await sleep(1200)
    const [header1, header2] = document.querySelectorAll('.header_wrap .header')
    header1.classList.add('flipped-right')
    header2.classList.remove('flipped-left')

    await sleep(1000)
    new Typed(header2, {
        strings: ['ti.murh', 'Timur H', 'Timur Kh'],
        typeSpeed: 80,
        backDelay: 1200,
        backSpeed: 50,
        showCursor: false,
    })

    await sleep(1400)
    new Typed('#tech', {
        strings: ['React', 'JavaScript', 'TypeScript', 'NodeJs', 'Vue'],
        loop: true,
        typeSpeed: 80,
        backDelay: 1200,
        backSpeed: 50,
        smartBackspace: true,
        showCursor: false,
    })
    await sleep(500)
    new Typed('#developer', {
        strings: ['  developer'],
        typeSpeed: 80,
        backDelay: 1200,
        backSpeed: 50,
        smartBackspace: true,
        showCursor: false,
    })
})()
