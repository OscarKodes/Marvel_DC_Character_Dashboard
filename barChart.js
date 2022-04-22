class BarChart {

    constructor(divId) {

      this.width = window.innerWidth * 0.2;
      this.height = window.innerHeight * 0.2;
      this.margin = 20;
      this.duration = 1000;
      this.divId = divId;

      this.svg = d3
        .select(this.divId)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("background-color", "pink");
    }

    draw(state) {

      console.log(`Draw ${this.divId}`);

      // FILTER DATA BASED ON ACTIVE SLIDERS ========
      let filteredData = state.data.filter(d => {
  
        let publisherCheck = state.activeSliders.includes(d.publisher);
        let genderCheck = state.activeSliders.includes(d.gender);
        let alignmentCheck = state.activeSliders.includes(d.alignment);
    
        return publisherCheck && genderCheck && alignmentCheck;
      });

      const barKey = this.divId.split("-")[0].slice(1);
  
      filteredData = d3.groups(filteredData, d => d[barKey]).map(d => {

        return {property: d[0], count: d[1].length};
      })



      // SCALES =======================================
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.count)])
        .range([0, this.width - this.margin * 2])
        .nice()
  
      const yScale = d3.scaleBand()
          .domain(filteredData.map(d => d.property))
          .range([0, this.height - this.margin])
          .paddingInner(.2)
          .paddingOuter(.1)
  
      // COLOR SCALE ==================================
      const propertyArr = filteredData.map(d => d.property)

      console.log(filteredData)
      console.log(propertyArr)

      // !!!
      // REMEMBER TO UPDATE
      // !!! REMEMBER TO UPDATE COLORS TO THE NEW GROUPINGS

      const colorRange = {
        eye: [
          'yellow', 'blue', 'green', 
          'brown', 'red', 'white', 
          'black', 'silver', 'magenta', 
          'purple'
        ],
        hair: [
          'navy', 'blond', 'brown', 
          'red', 'blue', 'green', 
          'white', 'purple', 'magenta', 
          'silver'
        ],
        race: [
          'navy', 'blond', 'brown', 
          'red', 'blue', 'green', 
          'white', 'purple', 'magenta'
        ],
      }
  
      const colorScale = d3.scaleOrdinal(propertyArr, colorRange[barKey]);

      
      // DRAW BARS =====================================
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

      bars
        .transition()
        .duration(this.duration)
        .attr(
          "transform",
          d => `translate(0, ${yScale(d.property)})`
        );

      bars
        .select("rect")
        .transition()
        .duration(this.duration)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", d => colorScale(d.property));

      // bars
      //   .select("text")
      //   .attr("dy", "-.5em")
      //   .text(d => `${d.metric}: ${this.format(d.value)}`);
    }
  }
  
  export { BarChart };
  