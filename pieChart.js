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
          .style("background-color", "lavender");
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
        }).sort((a, b) => b.count - a.count);
  
  
  
        // // SCALES =======================================
        // const xScale = d3.scaleLinear()
        //   .domain([0, d3.max(filteredData, d => d.count)]).nice()
        //   .range([0, this.width - this.margin * 2]).nice()
    
        // const yScale = d3.scaleBand()
        //     .domain(filteredData.map(d => d.property))
        //     .range([0, this.height - this.margin])
        //     .paddingInner(.2)
        //     .paddingOuter(.1)
    
        // COLOR SCALE ==================================
        const propertyArr = filteredData.map(d => d.property)
  
        console.log(filteredData)
        console.log(propertyArr)
  
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
  
        
        // DRAW ARCS =====================================

        const radius = Math.min(this.width, this.height) / 2.5;

        // const g = this.svg.append('g')
        //     .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')')
        
        const pie = d3.pie()
            .value(d => d.count)
        
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
            // .startAngle(0)

        const wedge = this.svg
            .selectAll(`g.${barKey}-wedge`)
            .data(pie(filteredData), d => d.index)
            // .data(filteredData, d => d.property)
            .join(
                enter =>
                  enter
                    .append("g")
                    .attr("class", `${barKey}-wedge`)
                    // .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')')

                    // .append("text").text(d => d.property),
                    .call(enter => enter.append("path")),
                    // .call(enter => enter.append("text")),
                update => update,
                exit => exit.remove())

 
        wedge
            .transition()
            .duration(this.duration)
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')')
            ;

        wedge
            .select('path')
            .transition()
            .duration(this.duration)
            .attr('d', arc)
            .attr('fill', (_, i) => colorScale(i))

        // wedge.append("text")
        //     .transition()
        //     .duration(this.duration)
        //     .attr('transform', d => 'translate(' + arc.centroid(d) + ')')
        //     .text((_, i) => filteredData[i].property)
        //     .attr('fill', 'white')

      }
    }

export { PieChart };
