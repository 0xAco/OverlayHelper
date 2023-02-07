"use strict";

// SET EVENT LISTENERS
document.addEventListener('click', event => {
  if (!event.target.matches('.img')) return;
  this.onClick(event.target.id);
});

document.addEventListener('change', event => {
  const conditionOnId = event.target.matches('#type-size') || event.target.matches('#type-gap');
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
  } else { // type = size
    const imgClass = document.getElementsByClassName('img');;
    for(let i = 0; i < imgClass.length; i++) {
      imgClass[i].style.width = outputValue + 'px';
      imgClass[i].style.height = outputValue + 'px';
    }
  }

  return;
}