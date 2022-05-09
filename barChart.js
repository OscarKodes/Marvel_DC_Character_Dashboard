class BarChart {

    constructor(divId) {

      // this.width = window.innerWidth * 0.22;
      this.width = 424;
      // this.height = window.innerHeight * 0.2;
      this.height = 200;
      this.margin = 20;
      this.duration = 1000;
      this.divId = divId;

      this.svg = d3
        .select(this.divId)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("background-color", "lavender")
        .style("transform", "translate(2px, 0px)");
    }

    draw(filteredData) {
      
      const barKey = this.divId.split("-")[0].slice(1);
  
      const totalCount = filteredData.length;

      // Get the Property-Count Pairs for each category
      filteredData = d3.groups(filteredData, d => d[barKey]).map(d => {

        return {
          property: d[0], 
          count: d[1].length
        };
      }).sort((a, b) => b.count - a.count);


      // SCALES =======================================
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.count)]).nice()
        .range([0, this.width - this.margin * 5.5]).nice()
      // const xScale = d3.scaleLog()
      //   .domain([1, 100]).nice()
      //   .range([0, 250]).nice()
  
      const yScale = d3.scaleBand()
          .domain(filteredData.map(d => d.property))
          .range([0, this.height - this.margin])
          .paddingInner(.3)
          .paddingOuter(0)
  
      // COLOR SCALE ==================================
      const propertyArr = filteredData.map(d => d.property)

      console.log("colors?", propertyArr)
      // !!!
      // REMEMBER TO UPDATE
      // !!! REMEMBER TO UPDATE COLORS TO THE NEW GROUPINGS

      const colorRange = {
        'yellow': "yellow",
        'blue': "blue",
        'green': "green",
        'brown': "brown",
        'red': "red",
        'ginger': "red",
        'white': "white",
        'black': "black",
        'silver': "silver",
        'mixed': "magenta",
        'purple': "purple",
        "pink": "pink",
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
        "animal": "orange",
        "NA": "grey"
      }

      const colorScale = d3.scaleOrdinal(propertyArr, 
        propertyArr.map(d => barKey == "race" ? "gold" : colorRange[d]));

      
      // DRAW BARS =====================================
      const bars = this.svg
        .selectAll(`g.${barKey}-bar`)
        .data(filteredData, d => d.property)
        .join(
          enter =>
            enter
              .append("g")
              .attr("class", `${barKey}-bar`)
              .call(enter => enter.append("rect"))
              .call(enter => 
                enter.append("text")
                .attr("class", "num")
                )
              .call(enter => 
                enter.append("text")
                .attr("class", "label")
                ),
          update => update,
          exit => exit.remove()
        )

      bars
        .transition()
        .duration(this.duration)
        .attr(
          "transform",
          d => `translate(0, ${yScale(d.property) + 10})`
        );

      bars
        .select("rect")
        .transition()
        .duration(this.duration)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", d => colorScale(d.property))
        .attr("opacity", "0.6")
        .attr("stroke", "black")
        .attr("transform", d => `translate(75, 0)`);

      bars
        .select("text.num")
        // .attr("dy", "-.5em")
        .style("font-size", 13)
        .attr("opacity", .85)
        // .style("font-family", "'Fira Code', monospace")
        .style("font-family", "'Comfortaa', cursive")
        .attr("transform", d => `translate(${xScale(d.count) + 80}, 9)`)
        .text(d => `${Math.round(d.count * 100 / totalCount) === 0 ? 
                      "<1" : Math.round(d.count * 100 / totalCount)}%`);

      // bars
      //   .select("text")
      //   // .attr("dy", "-.5em")
      //   .style("font-size", 13)
      //   .style("font-family", "'Prompt', sans-serif")
      //   .attr("transform", d => `translate(${xScale(d.count) + 5}, 7)`)
      //   .text(d => `${
      //     d.property === "no hair" ? 
      //     "No Hair" : d.property === "mixed" ?
      //     "Multi-Color" : d.property === "amazon/atlantean" ?
      //     "Amazon/Atlantean" :
      //     d.property[0].toUpperCase() + 
      //     d.property.slice(1)} ${Math.round(d.count * 100 / totalCount)}%`);

      bars
        .select("text.label")
        .style("font-size", 12.5)
        // .style("letter-spacing", "3px")
        .style("font-family", "'Comfortaa', cursive")
        .style("font-weight", 600)
        .attr("opacity", .9)
        .attr("transform", d => `translate(${70}, 11)`)
        .style("text-anchor", "end")
        .text(d => `${
          d.property === "no hair" ? 
          "No Hair" : d.property === "mixed" ?
          "Multi" : d.property === "amazon/atlantean" ?
          "Amz/Atln" : d.property === "mixed-race" ?
          "Mixed" : d.property === "NA" ?
          "Unknown" :
          d.property[0].toUpperCase() + 
          d.property.slice(1)}`);
    }
  }
  
  export { BarChart };