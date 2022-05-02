// // import our components
import { Buttons } from "./buttons.js";
import { BarChart } from "./barChart.js";
import { PieChart } from "./pieChart.js";
import { RatioDisplay } from "./ratio-display.js";
import { StickFigures } from "./stickFigures.js";
import { MedianDisplay } from "./medianDisplay.js";


let eyeBar, 
buttons, 
hairBar, 
raceBar, 
publisherPie, 
genderPie, 
ratioDisplay,
heroFigures,
villainFigures,
heroMedian,
villainMedian;

// global state
let state = {
  data: [],
  activeButtons: [
    "marvel",
    "dc",
    "male",
    "female",
    "other",
    "good",
    "bad"
  ]
};

d3.csv("./data/COMBINED_data_(Red_to_Ginger).csv", d3.autoType).then(data => {

  console.log("data", data);
  state.data = data;

  init();
});

function init() {
  buttons = new Buttons(state, setGlobalState);
  eyeBar = new BarChart("#eye-bar");
  hairBar = new BarChart("#hair-bar");
  raceBar = new BarChart("#race-bar");
  publisherPie = new PieChart("#publisher-pie");
  genderPie = new PieChart("#gender-pie");
  ratioDisplay = new RatioDisplay("#ratio-display");
  heroFigures = new StickFigures("hero");
  villainFigures = new StickFigures("villain");
  heroMedian = new MedianDisplay("#hero-medians");
  villainMedian = new MedianDisplay("#villain-medians");
  
  draw();
}


function draw() {
  
  // FILTER DATA BASED ON ACTIVE BUTTONS ====================
  
  let filteredData = state.data.filter(d => {
    
    let publisherCheck = state.activeButtons.includes(d.publisher);
    let genderCheck = state.activeButtons.includes(d.gender);
    let alignmentCheck = state.activeButtons.includes(d.alignment);

    return publisherCheck && genderCheck && alignmentCheck;
  });

  // GET RATIO OF HEROES AND VILLAINS =======================

  const countObj = {good: 0, bad: 0};
  filteredData.map(d => countObj[d.alignment]++);

  // Create hero to villain ratio by dividing by the smaller num
  let ratioArr = [countObj.good, countObj.bad];

  if (ratioArr[0] + ratioArr[1] > 0) {
    let heroBig = ratioArr[0] >= ratioArr[1];
    let biggerNum = heroBig ? ratioArr[0] : ratioArr[1];
    let smallerNum = heroBig ? ratioArr[1] : ratioArr[0];

    let ratioFloat = Math.round((smallerNum / biggerNum) * 5);
    
    ratioArr = heroBig ? [5, ratioFloat] : [ratioFloat, 5];
  }

  // GET MEDIANS OF HERO AND VILLAIN WEIGHT AND HEIGHT ======

  const heroesOnly = filteredData.filter(d => d.alignment === "good");

  const heroWeightArr = heroesOnly.map(d => d.weight_kg);
  const heroHeightArr = heroesOnly.map(d => d.height_cm);
  
  const heroMedianWeight = d3.median(heroWeightArr);
  const heroMedianHeight = d3.median(heroHeightArr);


  const villainsOnly = filteredData.filter(d => d.alignment === "bad");

  const villainWeightArr = villainsOnly.map(d => d.weight_kg);
  const villainHeightArr = villainsOnly.map(d => d.height_cm);
  
  const villainMedianWeight = d3.median(villainWeightArr);
  const villainMedianHeight = d3.median(villainHeightArr);


  // DRAW THE CHARTS ========================================
  
  // Draw Bar Charts
  eyeBar.draw(filteredData);
  hairBar.draw(filteredData);
  raceBar.draw(filteredData);

  // Draw Pie Charts
  publisherPie.draw(filteredData);
  genderPie.draw(filteredData);

  // Draw Ratio Display and BoxingRing
  ratioDisplay.draw(ratioArr);
  heroFigures.draw(ratioArr);
  villainFigures.draw(ratioArr);

  heroMedian.draw(heroMedianWeight, heroMedianHeight);
  villainMedian.draw(villainMedianWeight, villainMedianHeight);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };

  draw();
}