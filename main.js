// // import our components
import { Sliders } from "./sliders.js";
import { BarChart } from "./barChart.js";
import { PieChart } from "./pieChart.js";
import { RatioDisplay } from "./ratio-display.js";
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
  ]
};

d3.csv("./complete_row_data.csv", d3.autoType).then(data => {

  console.log("data", data);
  state.data = data;

  init();
});

function init() {
  sliders = new Sliders(state, setGlobalState);
  eyeBar = new BarChart("#eye-bar");
  hairBar = new BarChart("#hair-bar");
  raceBar = new BarChart("#race-bar");
  publisherPie = new PieChart("#publisher-pie");
  genderPie = new PieChart("#gender-pie");
  ratioDisplay = new RatioDisplay("#ratio-display");

  draw();
}


function draw() {
  
  // FILTER DATA BASED ON ACTIVE SLIDERS ========
  let filteredData = state.data.filter(d => {
    
    let publisherCheck = state.activeSliders.includes(d.publisher);
    let genderCheck = state.activeSliders.includes(d.gender);
    let alignmentCheck = state.activeSliders.includes(d.alignment);

    return publisherCheck && genderCheck && alignmentCheck;
  });

  // Draw Bar Charts
  eyeBar.draw(filteredData);
  hairBar.draw(filteredData);
  raceBar.draw(filteredData);

  // Draw Pie Charts
  publisherPie.draw(filteredData);
  genderPie.draw(filteredData);

  // Draw Ratio Display
  ratioDisplay.draw(filteredData);

  
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}