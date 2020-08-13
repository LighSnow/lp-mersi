// function ready(fn) {
//   if (document.readyState != 'loading') {
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }

document.addEventListener('DOMContentLoaded', function () {
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();

  (function () {
    let originalPositions = [];
    let daElements = document.querySelectorAll('[data-da]');
    let daElementsArray = [];
    let daMatchMedia = [];
    //Заполняем массивы
    if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
        const daElement = daElements[index];
        const daMove = daElement.getAttribute('data-da');
        if (daMove != '') {
          const daArray = daMove.split(',');
          const daPlace = daArray[1] ? daArray[1].trim() : 'last';
          const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
          const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
          const daDestination = document.querySelector('.' + daArray[0].trim())
          if (daArray.length > 0 && daDestination) {
            daElement.setAttribute('data-da-index', number);
            //Заполняем массив первоначальных позиций
            originalPositions[number] = {
              "parent": daElement.parentNode,
              "index": indexInParent(daElement)
            };
            //Заполняем массив элементов 
            daElementsArray[number] = {
              "element": daElement,
              "destination": document.querySelector('.' + daArray[0].trim()),
              "place": daPlace,
              "breakpoint": daBreakpoint,
              "type": daType
            }
            number++;
          }
        }
      }
      dynamicAdaptSort(daElementsArray);

      //Создаем события в точке брейкпоинта
      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daBreakpoint = el.breakpoint;
        const daType = el.type;

        daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
        daMatchMedia[index].addListener(dynamicAdapt);
      }
    }
    //Основная функция
    function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daElement = el.element;
        const daDestination = el.destination;
        const daPlace = el.place;
        const daBreakpoint = el.breakpoint;
        const daClassname = "_dynamic_adapt_" + daBreakpoint;

        if (daMatchMedia[index].matches) {
          //Перебрасываем элементы
          if (!daElement.classList.contains(daClassname)) {
            let actualIndex = indexOfElements(daDestination)[daPlace];
            if (daPlace === 'first') {
              actualIndex = indexOfElements(daDestination)[0];
            } else if (daPlace === 'last') {
              actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
            }
            daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
            daElement.classList.add(daClassname);
          }
        } else {
          //Возвращаем на место
          if (daElement.classList.contains(daClassname)) {
            dynamicAdaptBack(daElement);
            daElement.classList.remove(daClassname);
          }
        }
      }
      customAdapt();
    }

    //Вызов основной функции
    dynamicAdapt();

    //Функция возврата на место
    function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute('data-da-index');
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace['parent'];
      const indexPlace = originalPlace['index'];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    }
    //Функция получения индекса внутри родителя
    function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
    }
    //Функция получения массива индексов элементов внутри родителя 
    function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
        const childrenElement = children[i];
        if (back) {
          childrenArray.push(i);
        } else {
          //Исключая перенесенный элемент
          if (childrenElement.getAttribute('data-da') == null) {
            childrenArray.push(i);
          }
        }
      }
      return childrenArray;
    }
    //Сортировка объекта
    function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
        if (a.breakpoint > b.breakpoint) {
          return -1
        } else {
          return 1
        }
      });
      arr.sort(function (a, b) {
        if (a.place > b.place) {
          return 1
        } else {
          return -1
        }
      });
    }
    //Дополнительные сценарии адаптации
    function customAdapt() {
      //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
  }());

  const slider3 = document.querySelector('.slider-container3');

  // let mySwiper = new Swiper(slider, {
  // 	slidesPerView: 3,
  // 	spaceBetween: 10,
  // 	loop: true,
  // 	pagination: {
  // 		el: '.swiper-pagination',
  // 		clickable: true,
  // 	},
  // 	navigation: {
  // 		nextEl: '.swiper-button-next',
  // 		prevEl: '.swiper-button-prev',
  // 	},
  // })
  // Инициализация слайдера
  let mySwiper;

  function mobileSlider() {
    if (window.innerWidth <= 800 && slider3.dataset.mobile == 'false') {
      mySwiper = new Swiper(slider3, {
        slidesPerView: 1,
        slideClass: 'advantages__column',
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          550: {
            slidesPerView: 2,
            spaceBetween: 40,
          }
        }
      });

      slider3.dataset.mobile = 'true';
    }

    if (window.innerWidth > 800) {
      slider3.dataset.mobile = 'false';
      if (slider3.classList.contains('swiper-container-initialized')) {
        mySwiper.destroy();
      }
    }
  }

  mobileSlider()

  window.addEventListener('resize', () => {
    mobileSlider();
  });


  // Кастомный селект
  for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
    dropdown.addEventListener('click', function () {
      this.querySelector('.custom-select').classList.toggle('open');
    })
  }

  for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
      if (!this.classList.contains('selected')) {
        this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
        this.classList.add('selected');
        this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
      }
    })
  }
  window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.custom-select')) {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
      }
    }
  })



  // Табы
  document.querySelectorAll('.tabs-triggers__item').forEach((item) =>
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const id = e.target.getAttribute('href').replace('#', '');

      document.querySelectorAll('.tabs-triggers__item').forEach(
        (child) => child.classList.remove('tabs-triggers__item--active')
      );

      document.querySelectorAll('.tabs-content__item').forEach(
        (child) => child.classList.remove('tabs-content__item--active')
      );

      item.classList.add('tabs-triggers__item--active');
      document.getElementById(id).classList.add('tabs-content__item--active')
    })
  );

  // document.querySelector('.tabs-triggers__item').click();


  document.querySelectorAll('.our-vehicle__trigger').forEach((item) =>
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const id = e.target.getAttribute('href').replace('#', '');

      document.querySelectorAll('.our-vehicle__trigger').forEach(
        (child) => child.classList.remove('our-vehicle__trigger--active')
      );

      document.querySelectorAll('.our-vehicle__content').forEach(
        (child) => child.classList.remove('our-vehicle__content--active')
      );

      item.classList.add('our-vehicle__trigger--active');
      document.getElementById(id).classList.add('our-vehicle__content--active')
    })
  );

  // document.querySelector('.our-vehicle__trigger').click();




  // Swiper
  const sliders = document.querySelectorAll('.swiper-container');


  sliders.forEach((el) => {
    let mySwiper = new Swiper(el, {
      slidesPerView: 1,
      preloadImages: false,
      lazy: true,
      observer: true,
      observeParents: true,
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },
    })
  });


  // Инициализация слайдера
  const sliders1 = document.querySelector('.swiper-container1');

  let mySwiper1 = new Swiper(sliders1, {
    slidesPerView: 'auto',
    spaceBetween: 13,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      500: {
        slidesPerView: 'auto',
        spaceBetween: 13,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    }
  });


  const sliders4 = document.querySelectorAll('.swiper-container4');
  sliders4.forEach((el) => {
    let mySwiper2 = new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 13,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        450: {
          slidesPerView: 2,
          spaceBetween: 13,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 27,
        },
      }
    });
  });



  // Модальные окна
  let modal1 = new tingle.modal({
    footer: true,
  });
  document.querySelectorAll('.btn-1').forEach((item) =>
    item.addEventListener('click', function (e) {
      e.preventDefault();
      modal1.open();
    })
  );
  modal1.setContent(document.querySelector('.modal1').innerHTML);
  document.querySelector('.modal1').remove();

  modal1.addFooterBtn('', 'close-modal', function () {
    // here goes some logic
    modal1.close();
  });

  let modal2 = new tingle.modal({
    footer: true,
  });



  document.querySelectorAll('.btn-2').forEach((item) =>
    item.addEventListener('click', function (e) {
      e.preventDefault();
      modal2.open();
    })
  );

  modal2.setContent(document.querySelector('.modal2').innerHTML);
  document.querySelector('.modal2').remove();

  modal2.addFooterBtn('', 'close-modal', function () {
    // here goes some logic
    modal2.close();
  });

  let modal3 = new tingle.modal({
    footer: true,
  });
  let btn3 = document.querySelector('.btn-3');
  btn3.addEventListener('click', function () {
    modal3.open();
  });
  modal3.setContent(document.querySelector('.modal3').innerHTML);
  document.querySelector('.modal3').remove();
  modal3.addFooterBtn('', 'close-modal', function () {
    // here goes some logic
    modal3.close();
  });

  let modal4 = new tingle.modal({
    footer: true,
    cssClass: ['privacy'],
  });
  let btn4 = document.querySelector('.btn-4');
  btn4.addEventListener('click', function () {
    modal4.open();
  });
  modal4.setContent(document.querySelector('.modal4').innerHTML);
  document.querySelector('.modal4').remove();
  modal4.addFooterBtn('', 'close-modal', function () {
    // here goes some logic
    modal4.close();
  });


  // Маска телефона
  let selector = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+7 (999) 999-99-99');
  im.mask(selector);

  let validateForms = function (selector, rules) {
    new window.JustValidate(selector, {
      rules: rules,
    });
  }
  // Валидация Форм
  validateForms('.form', {
    email: {
      required: true,
      email: true
    },
    tel: {
      required: true
    },
    name: {
      required: true,
      minLength: 3,
    }
  });

  validateForms('.form1', {
    email: {
      required: true,
      email: true
    },
    tel: {
      required: true
    },
    name: {
      required: true,
      minLength: 3,
    }
  });

  // Клик вне области
  // let vneOblsti = document.querySelector('.custom-select.open')
  if (document.querySelector(".custom-select").classList.contains("open")) {
    window.addEventListener('click', function (e) {

      if (!$(this.contains(e.target))) {
        vneoblasti.classList.remove('open');
      }
    });

  }
});