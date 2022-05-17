class PieChart {

    constructor(divId) {

        this.width = 880 * 0.25;
        this.height = this.width;
        this.margin = 20;
        this.duration = 1000;
        this.divId = divId;
  
        this.svg = d3
          .select(this.divId)
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height)
          // .style("background-color", "lavender")
          .append('g')
          .attr('transform', 'translate(' + this.width / 2.12 + ',' + this.height / 2.9 + ')');
      
        
        // LEGENDS ==========

        this.legendColor = {
          "#publisher-pie": ["blue", 
                              "red"],
          "#gender-pie": ["purple", 
                          "green", 
                          "grey"]
        }[this.divId];

        this.legendText = {
          "#publisher-pie": ["DC", 
                              "Marvel"],
          "#gender-pie": ["Female", 
                          "Male", 
                          "Other"]
        }[this.divId];

        this.svg
          .selectAll("circle.legend-color")
          .data(this.legendColor)
          .join("circle")
          .attr("class", "legend-color")
          .attr("cx", -40)
          .attr("cy", (_, i) => 97 + i * 18)
          .attr("r", 6)
          .style("fill", d => d)
          .attr("opacity", 0.6)
          .attr("stroke", "black");

        this.svg
          .selectAll("text.legend-text")
          .data(this.legendText)
          .join("text")
          .attr("class", "legend-text")
          .attr("x", -25)
          .attr("y", (_, i) => 98 + i * 18)
          .text(d => d)
          .style("font-size", "13px")
          .style("font-weight", "700")
          .style("font-family", "'Comfortaa', cursive")
          .attr("alignment-baseline","middle");
      }


  
      draw(filteredData) {
  

        const barKey = this.divId.split("-")[0].slice(1);

        const totalCount = filteredData.length;

        // Get the Property-Count Pairs for each category
        const groupedData = d3.groups(filteredData, d => d[barKey]).map(d => {
  
          return {property: d[0], count: d[1].length};
        });

        // Keep all the categories in the same order
        const indexOrder = {
          genderOrder: ["male", "female", "other"],
          publisherOrder: ["marvel", "dc"]
        }

        // Gather all the grouped data and counts in index order
        const stableData = indexOrder[`${barKey}Order`].map(category => {
          
          let groupedCategory = groupedData.find(d => d.property === category);

          let groupedCount = groupedCategory ? 
                              groupedCategory.count : 0;
          
          return {property: category, count: groupedCount};
        });


        // COLOR SCALE ==================================
        const propertyArr = stableData.map(d => d.property)
  

        // !!!
        // REMEMBER TO UPDATE
        // !!! REMEMBER TO UPDATE COLORS TO THE NEW GROUPINGS
  
        const colorRange = {
          "marvel": "red",
          "dc": "blue",
          "male": "green",
          "female": "purple",
          "other": "grey"
        }
  
        const colorScale = d3.scaleOrdinal(propertyArr, propertyArr.map(d => colorRange[d]));
  

        // DRAW PIE =====================================

        const radius = Math.min(this.width, this.height) / 3;

        const pie = d3.pie()
            .value(d => d.count)
        
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        const wedge = this.svg
            .selectAll(`g.${barKey}-wedge`)
            .data(pie(stableData), d => d.index)
            .join(
                enter =>
                  enter
                    .append("g")
                    .attr("class", `${barKey}-wedge`)
                    .call(enter => enter.append("path")),
                    // .call(enter => enter.append("text")),
                update => update,
                exit => exit.remove())

        wedge
            .select('path')
            .transition()
            .duration(this.duration)
            .attr('d', arc)
            .attr('fill', (_, i) => colorScale(i))
            .attr("stroke", "black")
            .attrTween("d", arcTween);

        wedge
            .attr("opacity", .6)

        function arcTween(a) {

          let i = d3.interpolate(this._current, a);
          this._current = i(0);
  
          return t => arc(i(t));
        }    

        // wedge
        //     .select("text")
        //     .transition()
        //     .duration(this.duration)
        //     .attr('transform', d => 'translate(' + arc.centroid(d) + ')')
        //     .text((_, i) => stableData[i].count)
        //     .attr('fill', 'white')

              // Tooltip Handling =============================================
      const tooltip = d3.select("#tooltip");

      // Tooltip Mouseover 
      const tipMouseover = function(event, d) {

        tooltip
          .style("opacity", 1); // Make tooltip div visible
        console.log(d.data);
        const tooltipHTML = `
          <div id="tooltip-box">
              There are ${d.data.count}
              <br>
              ${d.data.property.toUpperCase()}
              ${d.data.property === "other" ? "gender" : ""}
              characters.
              
          </div>
          <div id="tooltip-arrow-frame">
          </div>
          <div id="tooltip-arrow">
          </div>
        `;

        tooltip.html(tooltipHTML)
          .style("left", event.pageX + "px")  
          .style("top", event.pageY - 102 + "px")

        d3.select(this)
          .style("opacity", 1)
          .style("stroke", "black");
        };

        // Tooltip Mouseout
        const tipMouseout = function(event, d) {

          tooltip
            .style("opacity", 0); // Make tooltip div invisible

          d3.select(this)
            .style("opacity", .6)
            .style("stroke", "none");
        };

        wedge
          .on("mouseover", tipMouseover)
          .on("mouseout", tipMouseout);

      }
    }

export { PieChart };
