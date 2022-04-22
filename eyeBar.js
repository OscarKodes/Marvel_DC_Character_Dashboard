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
        .attr("height", this.height)
        .style("background-color", "pink");

    }

  
    draw(state, setGlobalState) {

      console.log("now I am drawing my EyeBar");


      // // remove svg each time and redraw - ghetto workaround ----
      // this.svg.remove();
      // this.svg = d3
      //   .select("#eye-bar")
      //   .append("svg")
      //   .attr("width", this.width)
      //   .attr("height", this.height)
      //   .style("background-color", "purple");


      // filter the data based on active sliders -------
      console.log("bar first draw");
      let filteredData = state.data.filter(d => {
  
        let publisherCheck = state.activeSliders.includes(d.publisher);
        let genderCheck = state.activeSliders.includes(d.gender);
        let alignmentCheck = state.activeSliders.includes(d.alignment);
    
        return publisherCheck && genderCheck && alignmentCheck;
      });

      filteredData = d3.groups(filteredData, d => d.eye).map(d => {

        return {color: d[0], count: d[1].length};
      })



        /* SCALES */
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.count)])
        .range([0, this.width - this.margin * 2])
        .nice()
  
      const yScale = d3.scaleBand()
          .domain(filteredData.map(d => d.color))
          .range([0, this.height - this.margin])
          .paddingInner(.2)
          .paddingOuter(.1)
  
        // COLOR SCALE
  
        const eyeColorArr = [
          'yellow', 'blue', 'green', 
          'brown', 'red', 'purple', 
          'white', 'black', 'silver', 
          'mixed'
        ];
  
        const colorRange = [
          'yellow', 'blue', 'green', 
          'brown', 'red', 'purple', 
          'white', 'black', 'silver', 
          'orange'
        ];
  
        const colorScale = d3.scaleOrdinal(eyeColorArr, colorRange);

        


      

      // // AXIS
      // const xAxis = d3.axisBottom()
      //   .scale(xScale);

      // const yAxis = d3.axisLeft()
      //   .scale(yScale);
      
      /* HTML ELEMENTS */
      
      // bars

      // const bars = this.svg
      //   .selectAll(".eye_color_bar")
      //   .data(filteredData, d => d.color)
      //   .join("rect")
      //   .attr("x", 0)
      //   .attr("y", d => yScale(d.color))
      //   // .attr("transform", `translate(${this.margin}, 0)`)
      //   .attr("stroke", "grey")
      //   .attr("width", d => xScale(d.count))
      //   .attr("height", yScale.bandwidth())
      //   .attr("fill", d => colorScale(d.color));
      
      const bars = this.svg
        .selectAll("g.bar")
        .data(filteredData, d => d.color)
        .join(
          enter =>
            enter
              .append("g")
              .attr("class", "bar")
              .call(enter => enter.append("rect")),
              // .call(enter => enter.append("text")),
          update => update,
          exit => exit.remove()
        )

        // .attr("x", 0)
        // .attr("y", d => this.yScale(d.color))
        // // .attr("transform", `translate(${this.margin}, 0)`)
        // .attr("stroke", "grey")
        // .attr("width", d => this.xScale(d.count))
        // .attr("height", this.yScale.bandwidth())
        // .attr("fill", d => this.colorScale(d.color));

      bars
        .transition()
        .duration(this.duration)
        .attr(
          "transform",
          d => `translate(0, ${yScale(d.color)})`
        );

      bars
        .select("rect")
        .transition()
        .duration(this.duration)
        // .data(filteredData, d => d.color)
        // .attr("x", 0)
        // .attr("y", d => this.yScale(d.color))
        // .attr("transform", `translate(${this.margin}, 0)`)
        // .attr("stroke", "grey")
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", d => colorScale(d.color));

      // bars.exit.remove()

      // this.bars
      //   .select("text")
      //   .attr("dy", "-.5em")
      //   .text(d => `${d.metric}: ${this.format(d.value)}`);

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
  