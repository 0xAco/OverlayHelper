"use strict";

// SET EVENT LISTENERS
document.addEventListener('click', event => {
  if (!event.target.matches('.img')) return;
  this.onClick(event.target.id);
});

document.addEventListener('change', event => {
  const conditionOnId =
    event.target.matches('#type-size') ||
    event.target.matches('#type-gap') ||
    event.target.matches('#type-break');
  if (!conditionOnId) return;
  this.onChangeRange(event.target.id);
});

// DEFINE FUNCTIONS
function onClick(id) {
  const src = id.slice(0,1);
  const imgClicked = document.getElementById(id);
  const alterEgo = document.getElementById(src === 'o' ? `c-${id.slice(2)}` : `o-${id.slice(2)}`);

  imgClicked.classList.add('--hidden');
  alterEgo.classList.remove('--hidden');
  refreshBreaks();

  return;
}

function removeElementsByClassname(name) {
  const elements = document.getElementsByClassName(name);
  while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function refreshBreaks() {
  const nbBreaks = document.getElementById('type-break--result').innerText;

  // remove existing breaks
  removeElementsByClassname('flex-break');

  // add breaks if needed
  const selected = document.querySelectorAll('#overlay-types img:not(.--hidden)');
  if (selected.length > nbBreaks) {
    const parent = document.getElementById('overlay-types');
    const createEl = () => {
      const breakEl = document.createElement('div');
      breakEl.classList.add('flex-break');
      return breakEl;
    }

    // remove last occurence if selected is divisible by nbBreaks 
    // this avoids adding an unneeded break in last position
    const scope = Number.isInteger(selected.length / nbBreaks) ? selected.length - 1 : selected.length;
    for (let i = 0; i < scope; i++) {
      const number = i + 1;
      if (number % nbBreaks === 0) {
        parent.insertBefore(createEl(), document.getElementById(selected[number].id));
      }
    }
  }
  return;
}

function onChangeRange(id) {
  const type = id.split('-').at(-1);
  const outputValue = document.getElementById(`${id}--result`).innerText;

  if (type === 'gap') {
    const typesClass = document.getElementsByClassName('types');
    for(let i = 0; i < typesClass.length; i++) {
      typesClass[i].style.gap = outputValue + 'px';
    }
  } else if (type === 'size') {
    const imgClass = document.getElementsByClassName('img');;
    for(let i = 0; i < imgClass.length; i++) {
      imgClass[i].style.width = outputValue + 'px';
      imgClass[i].style.height = outputValue + 'px';
    }
  } else refreshBreaks();

  return;
}