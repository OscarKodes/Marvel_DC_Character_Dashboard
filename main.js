// // import our components
import { Dropdowns } from "./dropdowns.js";
import { BarChart } from "./barChart.js";
import { PieChart } from "./pieChart.js";
import { RatioDisplay } from "./ratio-display.js";
import { StickFigures } from "./stickFigures.js";
import { MedianDisplay } from "./medianDisplay.js";


let eyeBar, 
dropdowns, 
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
  activePublisher: "all",
  activeGender: "all",
  activeAlignment: "all",
  activeEyes: "all",
  activeHair: "all",
  activeRace: "all"
};

d3.csv("./data/COMBINED_data_(Red_to_Ginger).csv", d3.autoType).then(data => {

  console.log("data", data);
  state.data = data;

  init();
});

function init() {
  
  dropdowns = new Dropdowns(setGlobalState);

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
    
    let publisherCheck = state.activePublisher === "all" ?
                    true : d.publisher === state.activePublisher;

    let genderCheck = state.activeGender === "all" ?
                    true : d.gender === state.activeGender;

    let alignmentCheck = state.activeAlignment === "all" ?
                    true : d.alignment === state.activeAlignment;

    let eyeCheck = state.activeEyes === "all" ?
                    true : d.eye === state.activeEyes;

    let hairCheck = state.activeHair === "all" ?
                    true : d.hair === state.activeHair;

    let raceCheck = state.activeRace === "all" ?
                    true : d.race === state.activeRace;

    return publisherCheck && genderCheck && alignmentCheck && eyeCheck && hairCheck && raceCheck;
  });

  // GET RATIO OF HEROES AND VILLAINS =======================

  const countObj = {good: 0, bad: 0};
  filteredData.map(d => countObj[d.alignment]++);

  // Create hero to villain ratio by dividing by the smaller num
  let ratioArr = [countObj.good, countObj.bad];
  let totalNums = ratioArr;

  let isSmallRatio = ratioArr[0] <= 5 && ratioArr[1] <= 5;

  if (!isSmallRatio && ratioArr[0] + ratioArr[1] > 0) {
    let heroBig = ratioArr[0] >= ratioArr[1];
    let biggerNum = heroBig ? ratioArr[0] : ratioArr[1];
    let smallerNum = heroBig ? ratioArr[1] : ratioArr[0];

    let ratioFloat = Math.round((smallerNum / biggerNum) * 5);
    
    ratioArr = heroBig ? [5, ratioFloat] : [ratioFloat, 5];
  }

  // if (ratioArr[0] + ratioArr[1] === 10) {
  //   ratioArr = [1, 1];
  // }

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
  console.log("FILTERED DATA", filteredData);

  // Draw Bar Charts
  eyeBar.draw(filteredData);
  hairBar.draw(filteredData);
  raceBar.draw(filteredData);

  // Draw Pie Charts
  publisherPie.draw(filteredData);
  genderPie.draw(filteredData);

  // Draw Ratio Display and BoxingRing
  ratioDisplay.draw(totalNums, ratioArr);
  heroFigures.draw(ratioArr, heroesOnly);
  villainFigures.draw(ratioArr, villainsOnly);

  heroMedian.draw(heroMedianWeight, heroMedianHeight);
  villainMedian.draw(villainMedianWeight, villainMedianHeight);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };

  console.log("STATE", state)
  draw();
}