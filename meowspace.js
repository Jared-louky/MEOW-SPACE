

//----------- Hambuger Menu 

const mneuIcon = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');

mneuIcon.addEventListener('click', () => {
    navbar.classList.toggle('change');
})

//------------ Carousel Java Script Functions 

const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);



// SLIDE SIZING
const slideWidth = slides[0].getBoundingClientRect().width;
//console.log(slideWidth)

// ARRANGE THE SLIDES
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const movetoSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX( -'+ targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length -1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//  WHEN I CLICK LEFT MOVE SIDE LEFT 
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

movetoSlide(track, currentSlide, prevSlide);
updateDots(currentDot, prevDot);
hideShowArrows(slides, prevButton, nextButton, prevIndex);

});

// WHEN I CLICH RIGHT MOVE SLIDE RIGHT
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

movetoSlide(track, currentSlide, nextSlide);
updateDots(currentDot, nextDot);
hideShowArrows(slides, prevButton, nextButton, nextIndex);

});

// WHEN I CLICK ON THE NAV BUTTON, GO TO THE SLIDE

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex =dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

movetoSlide(track, currentSlide, targetSlide);
updateDots(currentDot, targetDot);
hideShowArrows(slides, prevButton, nextButton, targetIndex);
})
