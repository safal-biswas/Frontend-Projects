const boxs = document.querySelectorAll('.box')

window.addEventListener('scroll', animate)

animate();


function animate() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxs.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        boxTop<triggerBottom ? box.classList.add('show') : box.classList.remove('show')
    })
}