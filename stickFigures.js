class StickFigures {

  constructor(alignment) {

    // this.width = window.innerWidth * 0.2;
    // this.height = window.innerHeight * 0.2;
    // this.margin = 20;
    // this.duration = 1000;
    // this.divId = divId;

    // this.svg = d3
    //   .select(this.divId)
    //   .append("svg")
    //   .attr("width", this.width)
    //   .attr("height", this.height);

    this.alignment = alignment;
  }

  draw(ratioArr, filteredData) {


    let numVisible = this.alignment === "hero" ? ratioArr[0] : ratioArr[1];

    for (let i = 1; i <= 5; i++) {

      const figure = document.querySelector(`#${this.alignment}-${i}`);

      figure.classList = numVisible < i ? ["invisible"] : [""];
    }


    // const barKey = this.divId.split("-")[0].slice(1);

    // // Get the Property-Count Pairs for each category
    // filteredData = d3.groups(filteredData, d => d[barKey]).map(d => {

    //   return {property: d[0], count: d[1].length};
    // }).sort((a, b) => b.count - a.count);


    // AXIS SCALES. COLOR SCALES. ====================
    
    // DRAW BARS =====================================

    // Tooltip Handling =============================================
    const tooltip = d3.select("#tooltip");
    const figures = d3.selectAll(`#${this.alignment}-figures img`);

    
    

    // Tooltip Mouseover 
    const tipMouseover = function(event, d) {

      const randomIdx = Math.floor(Math.random() * filteredData.length);
      const characterName = filteredData[randomIdx].name;

      // console.log(event.target);

      tooltip
        .style("opacity", 1); // Make tooltip div visible

      const tooltipHTML = `
        <div id="tooltip-box">
            Hello. <br> 
            I'm ${characterName}.
        </div>
        <div id="tooltip-arrow-frame">
        </div>
        <div id="tooltip-arrow" style="bottom: 40px;">
        </div>
      `;

      // const titleLabel = event.target.parentNode.parentNode.parentNode.querySelector("h3");
      // const xCoord = titleLabel.getBoundingClientRect().left;
      // const yCoord = titleLabel.getBoundingClientRect().top;
      const isTopFigure = event.target.parentNode.classList.value === "top-figures"
      const xCoord = isTopFigure ?
                      event.target.offsetLeft + 13 :
                      event.target.offsetLeft + 11;
      const yCoord = isTopFigure ?
                      event.target.offsetTop - 90 :
                      event.target.offsetTop - 162 ;

      tooltip.html(tooltipHTML)
        .style("left", xCoord + "px")  
        .style("top", yCoord + "px")

      d3.select(this)
        .style("filter", "contrast(250%)");
    };

    // Tooltip Mouseout
    const tipMouseout = function(event, d) {

      tooltip
        .style("opacity", 0); // Make tooltip div invisible

        d3.select(this)
        .style("filter", "brightness(115%)");
    };

    figures
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);

  }

}
  
export { StickFigures };
  