/*mudar cor do celular*/
function imgSlide(e){
    document.querySelector('#phone').src = e;
}
/*mudar a cor do circle*/
function circleChange(color){
    const circle = document.querySelector('.circle');
    circle.style.background = color;
}
/*darkmode*/
let trilho = document.getElementById
('trilho')
let body = document.querySelector('body')
let h3 = document.querySelector('h3')
let p = document.querySelector('p')
let img = document.querySelector('img')
trilho.addEventListener('click', ()=>{
    trilho.classList.toggle('dark')
    body.classList.toggle('dark')
    h3.classList.toggle('dark')
    p.classList.toggle('dark')
    img.classList.toggle('dark')
})
