class Fullpage {

  constructor() {

    this.setVars();

    if(this.setVars && window.innerWidth >= this.settings.breakpoint) {
      this.setEvents();
    }

  }

  setVars() {
    this.sections = document.querySelectorAll(`*[data-fullpage]`);
    this.navigation = document.querySelector(`*[data-fullpage-nav]`)

    this.settings = {
      index: 0,
      scrolled: false,
      breakpoint: 550,
      initialScroll: 0,
    }

    this.arrows = {
      up: 38,
      down: 40,
      home: 36,
      end: 35,
    }

  }

  setEvents() {
    window.addEventListener('wheel', e => this.wheelHandler(e));
    window.addEventListener('scroll', e => this.scrollHandler(e));
    document.addEventListener('keydown', e => this.pressHandler(e));
    window.addEventListener('load', () => this.navigationInit());
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
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScroll > 0 && this.settings.initialScroll <= currentScroll){
      this.slideDown();
    } else {
      this.slideUp();
    }
    this.settings.initialScroll = currentScroll;
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
    this.settings.scrolled = true;

    const test = this;

    setTimeout(function() {
      test.enableScrolling();
    }, 500);
  }

  enableScrolling() {
    this.settings.scrolled = false;
  }

  slideUp() {
    if (this.settings.index > 0 && !this.settings.scrolled) {

      for (let i = 0; i < this.settings.index; i++) {
        this.scrollTo(i);
      }

      this.settings.index--;

    }
  }

  slideDown() {
    if (this.settings.index <= this.sections.length-2 && !this.settings.scrolled) {
      this.settings.index++;

      for (let i = 0; i < this.settings.index; i++) {
        this.scrollTo(i+1);
      }

    }
  }

  scrollToTop() {
    this.scrollTo(0);

    this.settings.index = 0;
  }

  scrollToBottom() {
    this.scrollTo(this.sections.length-1);
    this.settings.index = this.sections.length-1;
  }

  scrollTo(target) {
    this.sections[target].scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });

    this.preventScrolling();
  }

  navigationInit() {

    for(let i = 0; i <= this.sections.length - 1; i++) {
      const navItem = document.createElement('li');
      const navItemCLickable = document.createElement('a');

      navItemCLickable.setAttribute('data-fullpage-nav-item', i);
      navItemCLickable.setAttribute('href', i);
      navItem.appendChild(navItemCLickable);
      this.navigation.appendChild(navItem);
    }

    document.querySelectorAll(`*[data-fullpage-nav-item]`).forEach(
      (navItem) => navItem.addEventListener('click', this.navigationHandler)
    )
  }

  navigationHandler(e) {
    e.preventDefault();

    const navTarget = e.currentTarget.getAttribute('data-fullpage-nav-item');

    this.sections[navTarget].scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });

    this.scrollTo(navTarget);

    this.settings.index = 0;
    this.preventScrolling();

  }

}


new Fullpage();