// // import our components
// import { Sliders } from "./sliders.js";
import { EyeBar } from "./eyeBar.js";
// import { HairBar } from "./hairBar.js";
// import { RaceBar } from "./raceBar.js";
// import { PublisherPie } from "./publisherPie.js";
// import { RatioDisplay } from "./ratio-display.js";
// import { GenderPie } from "./genderPie.js";
// import { BoxingRing } from "./boxingring.js";


let eyeBar, hairBar, raceBar, ratioDisplay;

let activeSliders = [
  "marvel",
  "dc",
  "male",
  "female",
  "other",
  "good",
  "bad"
];

// global state
let state = {
  data: [],
  filteredData:[],
  domain: []
};

d3.csv("./complete_row_data.csv", d3.autoType).then(data => {

  console.log("data", data);
  state.data = data;
  state.filteredData = data;

  init();
});

function init() {
//   sliders = new Sliders(state, setGlobalState);
  eyeBar = new EyeBar(state, setGlobalState);
//   hairBar = new HairBar(state, setGlobalState);
//   raceBar = new RaceBar(state, setGlobalState);
//   ratioDisplay = new RatioDisplay(state, setGlobalState);

  let allSliders = document.querySelectorAll(".slider_click");

  for (let i = 0; i < allSliders.length; i++) {
    allSliders[i].addEventListener("click", function(event) {
      
      setTimeout(() => {
        let sliderName = event.path[0].id;
        
        sliderName = sliderName.split(" ")[0].toLowerCase();
        
        if (activeSliders.includes(sliderName)) {
          let idx = activeSliders.indexOf(sliderName);

          activeSliders.splice(idx, 1);
        } 
        
        else {
          activeSliders.push(sliderName);
        }

        console.log(activeSliders);
        
        updateFilteredData();
      }, 150);
    });
  }


  draw();
}

function updateFilteredData() {

  state.filteredData = state.data.filter(d => {

    let publisherCheck = activeSliders.includes(d.publisher);
    let genderCheck = activeSliders.includes(d.gender);
    let alignmentCheck = activeSliders.includes(d.alignment);

    return publisherCheck && genderCheck && alignmentCheck;
  });

  

  console.log(state.filteredData);
};

function draw() {
//   sliders.draw(state);
  eyeBar.draw(state, setGlobalState);
//   hairBar.draw(state, setGlobalState);
//   raceBar.draw(state, setGlobalState);
//   ratioDisplay.draw(state, setGlobalState);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}
