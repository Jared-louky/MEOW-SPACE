



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
//console.log();

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);


// arrange the slides next to one another 

/*slides[0].style.left = 0;
slides[1].style.left = slideWidth + 'px';
slides[2].style.left = slideWidth * 2 + 'px';
slides[3].style.left = slideWidth * 4 + 'px';*/

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(' + targetSlide.style.left + ')';  
  currentSlide.slide.classList.remove('current-slide');
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
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// when I click left, move slides to the left 

prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide') 
  const prevSlide = currentSlide.prevElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.prevElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
})


// when I click right, move slders the right

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide'); 
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);

  /*const amountToMove = nextSlide.style.left;
  move to the next slide
  track.style.transform = 'translateX(' + amountToMove + ')';  
  currentSlide.slide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');*/
})

// when I click the nav indicators, move to that slide 

dotsNav.addEventListener('click', e => {
    //what indicator was clicked on
    const targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currentSlide = track.querySelector('.currentSlide');
    const currentDot = dotsNav.querySelector('.currentSlide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
    })
