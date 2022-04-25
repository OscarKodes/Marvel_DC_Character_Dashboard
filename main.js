// // import our components
import { Sliders } from "./sliders.js";
import { BarChart } from "./barChart.js";
import { PieChart } from "./pieChart.js";
// import { RatioDisplay } from "./ratio-display.js";
// import { BoxingRing } from "./boxingring.js";


let eyeBar, sliders, hairBar, raceBar, publisherPie, genderPie, ratioDisplay;

// global state
let state = {
  data: [],
  activeSliders: [
    "marvel",
    "dc",
    "male",
    "female",
    "other",
    "good",
    "bad"
  ],
  genderObj: {
    male: 0,
    female: 0,
    other: 0
  },
  publisherObj: {
    marvel: 0,
    dc: 0
  }
};

d3.csv("./complete_row_data.csv", d3.autoType).then(data => {

  console.log("data", data);
  state.data = data;

  init();
});

function init() {
  sliders = new Sliders(state, setGlobalState);
  eyeBar = new BarChart("#eye-bar", setGlobalState);
  hairBar = new BarChart("#hair-bar", setGlobalState);
  raceBar = new BarChart("#race-bar", setGlobalState);
  publisherPie = new PieChart("#publisher-pie", setGlobalState);
  genderPie = new PieChart("#gender-pie", setGlobalState);
//   ratioDisplay = new RatioDisplay(state, setGlobalState);

  sliders.draw(state, setGlobalState);
  draw();
}


function draw() {
  

  eyeBar.draw(state, setGlobalState);
  hairBar.draw(state, setGlobalState);
  raceBar.draw(state, setGlobalState);
  publisherPie.draw(state, setGlobalState);
  genderPie.draw(state, setGlobalState);
//   ratioDisplay.draw(state, setGlobalState);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}
