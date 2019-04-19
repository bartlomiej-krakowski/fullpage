class Fullpage {

  constructor() {

    this.setVars();
    
    if(window.innerWidth >= this.breakpoint) {
      this.setEvents();
    }

  }

  setVars() {
    this.body = document.querySelector('body');
    this.sections = document.querySelectorAll(`*[data-fullpage]`);
    
    this.index = 0;
    this.scrolled = false;
    
    this.arrows = {
      up: 38,
      down: 40,
    }
    this.breakpoint = 550;
    
  }

  setEvents() {
    window.addEventListener('wheel', (e) => this.scrollHandler(e));
    this.body.addEventListener('transitionend', (e) => this.enableScrolling(e));
    document.addEventListener('keydown', (e) => this.pressHandler(e));
  }


  scrollHandler(e) {
    if (e.deltaY < 0) {
      this.slideUp();
    }
  
    else if (e.deltaY > 0) {
      this.slideDown();
    }
  }
  
   pressHandler(e) {
    if (e.keyCode === this.arrows.up) {
      this.slideUp();
    } 
    else if (e.keyCode === this.arrows.down) {
      this.slideDown();
    }
  }
  
   preventScrolling() {
    this.scrolled = true;
  }

   enableScrolling() {
    this.scrolled = false;
  }

  slideUp() {
    if (this.index > 0 && !this.scrolled) {
      this.index--;
      let position = 0;

      for (let i = 0; i < this.index; i++) {
        position -= this.sections[i].offsetHeight;
      }
    
      this.body.style.top = `${position}px`;
      this.preventScrolling();
    }
  }
  
   slideDown() {
    if (this.index <= this.sections.length-2 && !this.scrolled) {
      this.index++;
      let position = 0;
      
      for (let i = 0; i < this.index; i++) {
        position -= this.sections[i+1].offsetHeight;
      }
    
      this.body.style.top = `${position}px`;
      this.preventScrolling();
    }
  }
}


new Fullpage();