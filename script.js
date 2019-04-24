class Fullpage {

  constructor() {

    this.setVars();

    if(this.setVars && window.innerWidth >= this.settings.breakpoint) {
      this.setEvents();
    }

  }

  setVars() {
    this.sections = document.querySelectorAll(`*[data-fullpage]`);
    this.allVisible = [];

    this.navigation = {
      container: document.querySelector(`*[data-fullpage-nav]`),
      item: 'data-fullpage-nav-item',
      properties: 'data-fullpage-nav-item-state',
      items: null,

      states: {
        active: 'active',
      }
    }

    this.settings = {
      index: 0,
      scrolled: false,
      breakpoint: 550,
      initialScroll: 0,
      observerInitialize: false,
      delay: 0,
    }

    this.arrows = {
      up: 38,
      down: 40,
      home: 36,
      end: 35,
    }

    this.observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

  }

  setEvents() {
    window.addEventListener('load', this.navigationInit());
    window.addEventListener('wheel', e => this.wheelHandler(e), { passive: false });
    window.addEventListener('scroll', e => this.scrollHandler(e));
    document.addEventListener('keydown', e => this.pressHandler(e));
  }


  wheelHandler(e) {

    e.preventDefault();

    if (e.deltaY < 0) {
      this.slideUp();
    }
    else if (e.deltaY > 0) {
      this.slideDown();
    }

  }

  scrollHandler(e) {
    if (!this.settings.observerInitialize) {
      this.initObserver();
      this.settings.observerInitialize = true;
    }
  }

   pressHandler(e) {

     Object.getOwnPropertyNames(this.arrows).forEach(key => {
      let arrow = this.arrows[key];
      if(e.keyCode === arrow) {
        e.preventDefault();
      }
    });

     switch (e.keyCode) {
       case this.arrows.up:
        this.slideUp();
        break;
       case this.arrows.down:
        this.slideDown();
        break;
       case this.arrows.home:
        this.scrollToTop();
        break;
       case this.arrows.end:
        this.scrollToBottom();
        break;
     }

  }

  preventScrolling() {
    if (!this.settings.scrolled) {
      this.settings.scrolled = true;

      setTimeout(() => {
        this.enableScrolling();
      }, 500);
    }
  }

  enableScrolling() {
    this.settings.scrolled = false;
  }

  slideUp() {
    if (this.settings.index > 0) {

      for (let i = 0; i < this.settings.index; i++) {
        this.scrollTo(this.sections[i]);
      }
      this.settings.index--;

    }
  }

  slideDown() {
    if (this.settings.index <= this.sections.length-2) {
      this.scrollTo(this.sections[this.settings.index+1]);
      this.settings.index++;
    }
  }

  scrollToTop() {
    this.scrollTo(this.sections[0]);

    this.settings.index = 0;
  }

  scrollToBottom() {
    this.scrollTo(this.sections[this.sections.length-1]);
    this.settings.index = this.sections.length-1;
  }

  scrollTo(target) {
    target.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });

    this.preventScrolling();
  }

  navigationInit() {
    for(let i = 0; i <= this.sections.length - 1; i++) {
      const navItem = document.createElement('li');
      const navItemCLickable = document.createElement('a');

      navItemCLickable.setAttribute(this.navigation.item, i);
      navItemCLickable.setAttribute('href', i);
      navItem.appendChild(navItemCLickable);
      this.navigation.container.appendChild(navItem);
    }
    
    this.navigation.items = document.querySelectorAll(`*[data-fullpage-nav-item]`);
    this.navigation.items.forEach(
      (navItem) => navItem.addEventListener('click', this.navigationHandler.bind(this))
    )
  }

  navigationUpdate(index) {
    this.navigation.items.forEach((el) => {
      el.removeAttribute(this.navigation.properties, this.navigation.states.active);
    })

    this.navigation.items[index].setAttribute(this.navigation.properties, this.navigation.states.active);
  }

  initObserver() {
    this.observer = new IntersectionObserver((entries, observer) => {
      this.observerCallback(entries, observer);
    }, this.observerOptions);

    Array.from(this.sections).forEach((el) => {
      this.observer.observe(el);
    });
  }

  observerCallback(entries) {

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.allVisible.push(entry);
      } else {
        this.allVisible = this.allVisible.filter((el) => {
        return el.target != entry.target;});
      }
    });

    let isScrolling = null;
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      let index = 0;
      let generalIndex = 0;
      
      this.allVisible.forEach((el) => {
        if (el.intersectionRatio >= this.allVisible[index].intersectionRatio) {

          index = this.allVisible.indexOf(el);
          generalIndex = Array.from(this.sections).indexOf(el.target)

        }
      })

      this.scrollTo(this.sections[generalIndex]);
      this.settings.index = generalIndex;
      this.navigationUpdate(generalIndex);

    }, this.settings.delay);

    this.settings.delay = 500; //fix
  }

  navigationHandler(e) {

    e.preventDefault();
    const navTarget = e.currentTarget.getAttribute('data-fullpage-nav-item');

    this.scrollTo(this.sections[navTarget]);
    this.settings.index = 0;
  }

}


new Fullpage();
