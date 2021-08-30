!(function(document) {

  const itemClassName = 'carousel__photo';
  const items = document.getElementsByClassName(itemClassName);
  const totalItems = items.length;
  slide = 0;
  moving = true;

  const setInitialClasses = () => {
    items[totalItems - 1].classList.add('prev');
    items[0].classList.add('active');
    items[1].classList.add('next');
  }

  const setEventListeners = () => {
    const next = document.querySelector('.carousel__button--next');
    const prev = document.querySelector('.carousel__button--prev');

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  const moveNext = () => {
    // If slide is the last one reset to 0 or add +1
    if (!moving) {
      if (slide === (totalItems -1)) {
        slide = 0;
      } else {
        slide++;
      }
    }
    moveCarouselTo(slide);
  }

  const movePrev = () => {
    if (!moving) {
      // If first slide set at last or -1
      if (slide === 0) {
        slide = (totalItems - 1);
      } else {
        slide --;
      }
    }
    moveCarouselTo(slide);
  }

  const disableInteraction = () => {
    // Set moving to true for the same duration as animation
    moving = true;
    setTimeout(() => {
      moving = false;
    }, 500);
  }

  const moveCarouselTo = (slide) => {
    if (!moving) {
      disableInteraction();

      let newPrevious = slide - 1;
      let newNext = slide + 1;
      let oldPrevious = slide -2;
      let oldNext = slide + 2;

      if ((totalItems - 1) > 3) {
        if (newPrevious <= 0) {
          oldPrevious = (totalItems - 1);
        } else if (newNext >= totalItems -1) {
          oldNext = 0;
        }

        if (slide === 0) {
          newPrevious = (totalItems - 1);
          oldPrevious = (totalItems -2);
          oldNext = (slide + 1);
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }

        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        items[newPrevious].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  const initCarousel = () => {
    setInitialClasses();
    setEventListeners();

    moving = false;
  }

  initCarousel();

}(document));

