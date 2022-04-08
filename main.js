// import our components
import { Sliders } from "./sliders.js";
import { EyeBar } from "./eyeBar.js";
import { HairBar } from "./hairBar.js";
import { RaceBar } from "./raceBar.js";
import { PublisherPie } from "./publisherPie.js";
import { RatioDisplay } from "./ratio-display.js";
import { GenderPie } from "./genderPie.js";
import { BoxingRing } from "./boxingring.js";


let sliders, eyeBar, hairBar, raceBar, ratioDisplay;

// global state
let state = {
  data: [],
  domain: [],
  selectedState: null,
  selectedMetric: null,
};

d3.csv("./statePopulations.csv", d3.autoType).then(data => {
  console.log("data", data);
  state.data = data;
  state.domain = [
    0,
    d3.max(data
      .map(d => [d["Age < 20"], d["Age 20-65"], d["Age 65+"]])
      .flat()
    )]
  init();
});

function init() {
  sliders = new Sliders(state, setGlobalState);
  eyeBar = new EyeBar(state, setGlobalState);
  hairBar = new HairBar(state, setGlobalState);
  raceBar = new RaceBar(state, setGlobalState);
  ratioDisplay = new RatioDisplay(state, setGlobalState);
  draw();
}

function draw() {
  sliders.draw(state);
  eyeBar.draw(state, setGlobalState);
  hairBar.draw(state, setGlobalState);
  raceBar.draw(state, setGlobalState);
  ratioDisplay.draw(state, setGlobalState);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}
