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

    draw(filteredData) {

      console.log(`Draw ${this.divId}`);

      const barKey = this.divId.split("-")[0].slice(1);
  
      // Get the Property-Count Pairs for each category
      filteredData = d3.groups(filteredData, d => d[barKey]).map(d => {

        return {property: d[0], count: d[1].length};
      }).sort((a, b) => b.count - a.count);



      // SCALES =======================================
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.count)]).nice()
        .range([0, this.width - this.margin * 2]).nice()
  
      const yScale = d3.scaleBand()
          .domain(filteredData.map(d => d.property))
          .range([0, this.height - this.margin])
          .paddingInner(.2)
          .paddingOuter(.1)
  
      // COLOR SCALE ==================================
      const propertyArr = filteredData.map(d => d.property)


      // !!!
      // REMEMBER TO UPDATE
      // !!! REMEMBER TO UPDATE COLORS TO THE NEW GROUPINGS

      const colorRange = {
        'yellow': "yellow",
        'blue': "blue",
        'green': "green",
        'brown': "brown",
        'red': "red",
        'white': "white",
        'black': "black",
        'silver': "silver",
        'mixed': "magenta",
        'purple': "purple",
        "no hair": "lavender",
        "blond": "yellow",
        "burnette": "brown",
        "human": "tan",
        "alien": "green",
        "amazon/atlantean": "cerulean",
        "diety": "yellow",
        "demon": "purple",
        "undead": "brown",
        "mixed-race": "magenta",
        "animal": "orange"
      }


      const colorScale = d3.scaleOrdinal(propertyArr, propertyArr.map(d => colorRange[d]));

      
      // DRAW BARS =====================================
      const bars = this.svg
        .selectAll(`g.${barKey}-bar`)
        .data(filteredData, d => d.property)
        .join(
          enter =>
            enter
              .append("g")
              .attr("class", `${barKey}-bar`)
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
  