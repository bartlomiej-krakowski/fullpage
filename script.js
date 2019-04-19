let index = 0;
let scrolled = false;
const body = document.querySelector('body');
const sections = document.querySelectorAll('.fullPage');

window.addEventListener('wheel', scrollHandler);
body.addEventListener('transitionend', enableScrolling);
document.addEventListener('keydown', pressHandler);

function scrollHandler(e) {

  if (e.deltaY < 0) {
    slideUp();
  }

  else if (e.deltaY > 0) {
    slideDown();
  }
}

function pressHandler(e) {
  if (e.keyCode==38) {
    slideUp();
  } 
  else if (e.keyCode==40) {
    slideDown();
  }
}

function preventScrolling() {
  scrolled = true;
}

function enableScrolling() {
  scrolled = false;
}

function slideUp() {
  if (index > 0 && !scrolled) {
    index--;
    let position = 0;
    
    for (i = 0; i < index; i++) {
      position -= sections[i].offsetHeight;
    }
  
    body.style.top = `${position}px`;
    preventScrolling();
  }
}

function slideDown() {
  if (index <= sections.length-2 && !scrolled) {
    index++;
    let position = 0;
    
    for (i = 0; i < index; i++) {
      position -= sections[i+1].offsetHeight;
    }
  
    body.style.top = `${position}px`;
    preventScrolling();
  }
}
