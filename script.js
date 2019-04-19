let index = 0;
let scrolled = false;
const body = document.querySelector('body');
const sections = document.querySelectorAll('.fullPage');

window.addEventListener('wheel', scrollHandler);
body.addEventListener('transitionend', enableScrolling);
document.addEventListener('keydown', pressHandler);

function scrollHandler(e) {
  if (e.deltaY < 0 && index > 0 && !scrolled) {slideUp();
  }
  else if (e.deltaY > 0 && index <= sections.length-2 && !scrolled) {
    slideDown();
  }
}

function pressHandler(e) {
  if (e.keyCode==38 && index > 0 && !scrolled) {
    slideUp();
  } 
  else if (e.keyCode==40 && index <= sections.length-2 && !scrolled) {
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
  index--;
  let position = 0;
  
  for (i = 0; i < index; i++) {
    position -= sections[i].offsetHeight;
  }

  console.log(position)
  
  body.style.top = position;
  preventScrolling();
}

function slideDown() {
  index++;
  let position = 0;
  
  for (i = 0; i < index; i++) {
    position -= sections[i].offsetHeight;
  }

  console.log(position)
  
  body.style.top = position;
  preventScrolling();
}
