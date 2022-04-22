
// #######################################################
// GLOBALS AND CONSTANTS #################################
const width = window.innerWidth * 0.2;
const height = window.innerHeight * 0.2;
const margin = 20;

let eyeBarSVG;

// #######################################################
// STATE #################################################

let state = {
  data: [],
  prevFilteredData: [],
  currFilteredData: [],
  activeToggles: [
    "marvel",
    "dc",
    "male",
    "female",
    "other",
    "good",
    "bad"
  ],
  allEyeData: null
};


// #######################################################
// DATA ##################################################

d3.csv("./complete_row_data.csv", d3.autoType).then(data => {

  console.log("data", data);
  state.data = data;
  state.currFilteredData = data;

  init();
});


// #######################################################
// INITIALIZE ############################################

function init() {

  // SET UP SVGS TO BE REMOVED
  // (each time the vis updates, it removes, then redraws)
  // (we need to give d3 something to remove for the first iteration)

  // eyeBarSVG = d3
  //   .select("#eye-bar")
  //   .append("svg");

  // SET UP EVENT LISTENERS ON TOGGLES ------------------

  const selectToggles = document.querySelectorAll(".slider_click");

  for (let i = 0; i < selectToggles.length; i++) {

    selectToggles[i].addEventListener("click", function(event) {
      
      let sliderName = event.path[0].id;
      
      sliderName = sliderName.split(" ")[0].toLowerCase();
      
      if (state.activeToggles.includes(sliderName)) {

        let idx = state.activeToggles.indexOf(sliderName);
        state.activeToggles.splice(idx, 1);
      } 
      
      else {
        state.activeToggles.push(sliderName);
      }

      draw();
    });
  }

  draw();
}

// #######################################################
// DRAW ##################################################

function draw() {

  state.prevFilteredData = state.currFilteredData;

  // FILTER DATA BY ACTIVE TOGGLES ======================
  state.currFilteredData = state.data.filter(d => {
  
    let publisherCheck = state.activeToggles.includes(d.publisher);
    let genderCheck = state.activeToggles.includes(d.gender);
    let alignmentCheck = state.activeToggles.includes(d.alignment);

    return publisherCheck && genderCheck && alignmentCheck;
  });

  console.log("DRAW");
  console.log(state.currFilteredData);

  drawEyeBar();
}


function drawEyeBar(){

  // ASSEMBLE EYE COLOR COUNT DATA --------------------------

  let eyeColorArr;

  function getEyeData(theData) {
    let counterObj = {
      "yellow": 0,
      "blue": 0,
      "green": 0,
      "brown": 0,
      "red": 0,
      "purple": 0,
      "white": 0,
      "black": 0,
      "silver": 0,
      "mixed": 0 
    };
  
    theData.map(d => {
      counterObj[d.eye]++;
    });
  
    eyeColorArr = Object.keys(counterObj);
  
    let finalData = eyeColorArr
      .sort((a, b) => counterObj[b] - counterObj[a])
      .map(color => {
        return {"color": color, "count": counterObj[color]}
      });

    return finalData;
  }

  if (state.allEyeData === null) {
    state.allEyeData = getEyeData(state.data);
  };

  const prevEyeData = getEyeData(state.prevFilteredData);
  const currEyeData = getEyeData(state.currFilteredData);


  // SCALES -----------------------------------------------
  const xScale = d3.scaleLinear()
  .domain([0, d3.max(state.allEyeData, d => d.count)])
  .range([0, width - margin * 2])
  .nice()

  const yScale = d3.scaleBand()
    .domain(state.allEyeData.map(d => d.color))
    .range([0, height - margin])
    .paddingInner(.2)
    .paddingOuter(.1)

  const colorRange = [
    'yellow', 'blue', 'green', 
    'brown', 'red', 'purple', 
    'white', 'black', 'silver', 
    'orange'
  ];

  const colorScale = d3.scaleOrdinal(eyeColorArr, colorRange);


  // AXES ------------------------------------------------
  const xAxis = d3.axisBottom()
    .scale(xScale);

  const yAxis = d3.axisLeft()
    .scale(yScale);
  
  
  // SVG ------------------------------------------------
  
  eyeBarSVG.remove();

  eyeBarSVG = d3
    .select("#eye-bar")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "purple");

  // bars
  eyeBarSVG.selectAll(".eye_color_bar")
    .data(currEyeData)
    .join(
      enter => enter
        .append("rect")
          .attr("height", yScale.bandwidth())
          .attr("width", d => {
            let prevMatch = prevEyeData.find(g => g.color === d.color);
            let prevCount = prevMatch.count;
            return xScale(prevCount);
          })
          .attr("x", 0)
          .attr("y", (_, i) => {
            let prevColor = prevEyeData[i].color;
            return yScale(prevColor);
          })
          .attr("fill", (_, i) => {
            let prevColor = prevEyeData[i].color;
            return colorScale(prevColor);
          })
          .attr("transform", `translate(${margin}, 0)`)
          .attr("stroke", "grey")
        .call(enter => enter
          .transition()
            .duration(500)
            .delay(50)
            .attr("width", d => d.count))
            .attr("y", d => yScale(d.color))
            .attr("fill", d => colorScale(d.color)),
      update => update,
      exit => exit.remove()
    );

  // // bar numbers
  // svg.selectAll(".bar-nums")
  //   .data(data)
  //   .join(
  //     enter => enter
  //       .append("text")
  //       .attr("class", "bar-nums")
  //       .attr("x", 0)
  //       .attr("y", d => yScale(d.album) + yScale.bandwidth() / 2)
  //       .attr("opacity", 0)
  //       .text(d => `${d.usSales} mill`)
  //       .call(enter => enter
  //         .transition()
  //           .duration(1600)
  //           .delay((_, i) => i * 200)
  //           .attr("opacity", 1)
  //           .attr("x", d => xScale(d.usSales) + margin + 10)
  //       )
  //   )
    

  // // xAxis ticks
  // svg.append("g")
  //   .attr("transform", `translate(${margin}, ${height - margin})`)
  //   .style("font-size", "0.8rem")
  //   .call(xAxis);

  // // yAxis ticks
  // svg.append("g")
  //   .attr("transform", `translate(${margin}, 0)`)
  //   .style("font-size", "0.8rem")
  //   .call(yAxis);

  // // xAxis title
  // svg.append("text")
  //   .attr("text-anchor", "end")
  //   .attr("x", (width / 2) + margin)
  //   .attr("y", height - margin * .5)
  //   .style("font-weight", "bold")
  //   .style("font-size", "1.1rem")
  //   .text("Albums Sold (Millions)");

  // // yAxis title
  // svg.append("text")
  //   .attr("y", margin / 8)
  //   .attr("x", -margin * 2.5)
  //   .attr("transform", "rotate(-90)")
  //   .style("font-weight", "bold")
  //   .style("font-size", "1.1rem")
  //   .text("Album Title");
}
