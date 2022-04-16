class EyeBar {

    constructor(state, setGlobalState) {
      // initialize properties here
      this.width = window.innerWidth * 0.2;
      this.height = window.innerHeight * 0.2;
      this.margin = 20;
      this.duration = 1000;
      this.format = d3.format(",." + d3.precisionFixed(1) + "f");
      
      this.svg = d3
        .select("#eye-bar")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);
    }
  
    draw(state, setGlobalState) {
      console.log("now I am drawing my EyeBar");
  
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

      state.filteredData.map(person => {
        counterObj[person.eye]++;
      });

      let eyeData = Object.keys(counterObj).map(color => {

        return {"color": color, "count": counterObj[color]}
      });

      console.log(eyeData)

        /* SCALES */
      const xScale = d3.scaleLinear()
      .domain([0, d3.max(eyeData, d => d.count)])
      .range([0, this.width - this.margin * 2])
      .nice()

      const yScale = d3.scaleBand()
        .domain(eyeData.map(d => d.color))
        .range([0, this.height - this.margin])
        .paddingInner(.2)
        .paddingOuter(.1)

      // COLOR SCALE

      const eyeColorArr = [
        'yellow', 
        'blue', 
        'green', 
        'brown', 
        'red', 
        'purple', 
        'white', 
        'black', 
        'silver', 
        'mixed'
      ];

      const colorRange = [
        'yellow', 
        'blue', 
        'green', 
        'brown', 
        'red', 
        'purple', 
        'white', 
        'black', 
        'silver', 
        'orange'
      ];

      const colorScale = d3.scaleOrdinal(eyeColorArr, colorRange);

      // AXIS
      const xAxis = d3.axisBottom()
        .scale(xScale);

      const yAxis = d3.axisLeft()
        .scale(yScale);
      
      /* HTML ELEMENTS */
      
      // svg 
      const svg = d3.select("#eye-bar")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("background-color", "purple")

      // bars
      svg.selectAll(".bar")
        .data(eyeData)
        .join(
          enter => enter
            .append("rect")
            .attr("class", "dot")
            .attr("height", yScale.bandwidth())
            .attr("width", 0)
            .attr("x", 0)
            .attr("y", d => yScale(d.color))
            .attr("fill", "white")
            .attr("transform", `translate(${this.margin}, 0)`)
            .attr("stroke", "grey")
            .call(enter => enter
              .transition()
                .duration(800)
                .delay((_, i) => i * 200)
                .attr("width", d => xScale(d.count))
              .transition()
                .duration(800)
                .delay((_, i) => (eyeData.length - 1 - i) * 250)
                .attr("fill", d => colorScale(d.color))
            )
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
  }
  
  export { EyeBar };
  