  const selector = (
    selector1, class1, class2, class3, selector2, class4, class5, class6, class7, class8, class9, count
  ) => {
    let slider = document.querySelector(selector1);

    let container = document.createElement('div');
    container.classList.add(class1);
    slider.insertAdjacentElement('afterbegin', container);

    let track = document.createElement('div');
    track.classList.add(class2);
    container.insertAdjacentElement('afterbegin', track);

    let item = document.createElement('div');
    item.classList.add(class3);
    track.insertAdjacentElement('afterbegin', item);

    let group = document.querySelector(selector2);
    item.insertAdjacentElement('afterbegin', group);

    let btnPrev = document.createElement('button');
    btnPrev.classList.add(class4);
    btnPrev.classList.add(class5);
    container.insertAdjacentElement('afterend', btnPrev);

    let btnNext = document.createElement('button');
    btnNext.classList.add(class4);
    btnNext.classList.add(class6);
    container.insertAdjacentElement('afterend', btnNext);

    let dotsCount = count;
    let elem = dotsCount - 1;

    for (let i = 1; i <= elem; i++) {
      let itemCopy = item.cloneNode(true);
      track.insertAdjacentElement('afterbegin',itemCopy);
    }

    let dots = document.createElement('div');
    dots.classList.add(class7);
    container.insertAdjacentElement('afterend', dots);

    for (let i = 1; i <= count; i++) {
      if(i == 1){
        let dot = document.createElement('a');
        dot.classList.add(class8);
        dot.classList.add(class9);
        dots.insertAdjacentElement('beforeend', dot);
      } else {
        let dot = document.createElement('a');
        dot.classList.add(class8);
        dots.insertAdjacentElement('beforeend', dot);
      }
    }
  }

  selector(
    '.slider__wrap',
    'slider__container',
    'slider__track',
    'slider__item',
    '.slider__group',
    'slider__btn',
    'slider__btn_next',
    'slider__btn_prev',
    'slider__dots',
    'slider__dot',
    'slider__dot_active',
    5
  );

  const move = (selector3, selector4, selector5, selector6, selector7, selector8, selector9, class10) => {
    let position = 0;
    const slidesToShow = 1;
    const slidesToScroll = 1;

    const container = document.querySelector(selector3);
    const track = document.querySelector(selector4);
    const items = document.querySelectorAll(selector5);
    const dots = document.querySelector(selector6);
    const btnPrev = document.querySelector(selector7);
    const btnNext = document.querySelector(selector8);

    const itemsCount = items.length;
    const itemWidth = container.clientWidth / slidesToShow;
    const movePosition = slidesToScroll * itemWidth;

    items.forEach((item) => {
      item.style.minWidth = `${itemWidth}px`;
    });

    btnNext.addEventListener('click', () => {
      const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

      let dot = dots.querySelector(selector9);
      dot.classList.remove(class10);
      dot.nextElementSibling.classList.add(class10);

      setPosition();
      checkBtns();
    });

    btnPrev.addEventListener('click', () => {
      const itemsLeft = Math.abs(position) / itemWidth;

      position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

      let dot = dots.querySelector(selector9);
      dot.classList.remove(class10);
      dot.previousElementSibling.classList.add(class10);

      setPosition();
      checkBtns();
    });

    const setPosition = () => {
      track.style.transform = `translateX(${position}px)`;
    }

    const checkBtns = () => {
      btnPrev.disabled = position == 0;
      btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
    }

    checkBtns();
  }

  move(
    '.slider__container',
    '.slider__track',
    '.slider__item',
    '.slider__dots',
    '.slider__btn_prev',
    '.slider__btn_next',
    '.slider__dot_active',
    'slider__dot_active'
  );
