class PieChart {

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
          .append('g')
          .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
      }
  
      draw(filteredData) {
  

        const barKey = this.divId.split("-")[0].slice(1);

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

        const radius = Math.min(this.width, this.height) / 2.5;

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

      }
    }

export { PieChart };
