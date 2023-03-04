"use strict";

// get DOM elements
const leftPanel  = document.querySelector(".--left");
const rightPanel = document.querySelector(".--right");
const separator = document.getElementById('separator');
const sliderTypeSize = document.getElementById('type-size');
const sliderTypeGap = document.getElementById('type-gap');
const sliderTypeBreak = document.getElementById('type-break');
const btnSearch = document.getElementById('btn--search');

// data setup
let paldeaDex = paldeaPokedex; // added from script

// set event listeners
document.addEventListener('click', event => {
  if (!event.target.matches('.img')) return;
  this.onImageClick(event.target.id);
});
btnSearch.addEventListener('click', searchRandom);
sliderTypeSize.addEventListener('change', evt => onChangeRange(evt.target.id));
sliderTypeGap.addEventListener('change', evt => onChangeRange(evt.target.id));
sliderTypeBreak.addEventListener('change', evt => onChangeRange(evt.target.id));

// functions
function onImageClick(id) {
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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max + min) + min);
}

function searchRandom() {
  // pick random id + retrieve pokemon info
  const pokemonId = randomInt(1, 400);
  const hits = paldeaDex.filter(pok => pok.regid === pokemonId);
  const chosen = hits.length > 1 ? hits[randomInt(0, hits.length - 1)] : hits[0];

  // add img to the page
  let pokemonElement = document.createElement('div');
  pokemonElement.classList.add('pokemon-card');
  pokemonElement.classList.add('flex--column');
  pokemonElement.classList.add('--center');
  pokemonElement.innerHTML = `
    <img class="pokemon-img" src="${chosen.img}" alt="image de ${chosen.namefr}">
    <div class="pokemon-infos flex">
      <span class="pokemon-regid">#${chosen.regid}</span>
      <span>&nbsp;‒&nbsp;</span>
      <span class="pokemon-name">${chosen.namefr}</span>
    </div>
  `;
  document.getElementById('random-pokemon__output').replaceChildren(pokemonElement);
}

function dragElement(element) {
  let md; // remember mouse down info
  element.onmousedown = onMouseDown;

  function onMouseDown(e) {
    md = {
      e,
      offsetLeft:  element.offsetLeft,
      offsetTop:   element.offsetTop,
      firstWidth:  leftPanel.offsetWidth,
      secondWidth: rightPanel.offsetWidth
    };

    document.onmousemove = onMouseMove;
    document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
    }
  }

  function onMouseMove(e) {
    let delta = {
      x: e.clientX - md.e.clientX,
      y: e.clientY - md.e.clientY
    };

    // Prevent negative-sized elements
    delta.x = Math.min(
      Math.max(delta.x, -md.firstWidth),
      md.secondWidth
    );

    element.style.leftPanel = md.offsetLeft + delta.x + "px";
    leftPanel.style.width = (md.firstWidth + delta.x) + "px";
    rightPanel.style.width = (md.secondWidth - delta.x) + "px";
  }
}


dragElement(separator);
