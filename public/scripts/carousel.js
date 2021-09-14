const carouselIndicators = document.querySelectorAll('.carousel-indicator');
const slides = document.querySelectorAll('.slide');
const contentContainers = document.querySelectorAll('.content-container');

let index = 0;
let changedByUser = false;
let textTimeout;

const showSlide = (event) => {
    changedByUser = true;
    setTimeout(() => {
        changedByUser = false;
    }, 10000)
    clearTimeout(textTimeout);
    if(event.target.classList.contains('active')){
        return;
    }
    carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
    event.target.classList.add('active');
    slides.forEach(slide => slide.classList.remove('active'));
    slides[event.target.dataset.index].classList.add('active');
    contentContainers.forEach(container => container.classList.remove('active'));
    textTimeout = setTimeout(() => {
        contentContainers[event.target.dataset.index].classList.add('active');
    }, 800)
    index = event.target.dataset.index;
}

const nextSlide = () => {
    if(changedByUser){
        return;
    }
    index++;
    if(index === slides.length){
        index = 0;
    }
    carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
    carouselIndicators[index].classList.add('active');
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    contentContainers.forEach(container => container.classList.remove('active'));
    setTimeout(() => {
        contentContainers[index].classList.add('active');
    }, 800)
}

setInterval(() => {
    nextSlide();
}, 10000)

carouselIndicators.forEach(indicator => indicator.addEventListener('click', showSlide));