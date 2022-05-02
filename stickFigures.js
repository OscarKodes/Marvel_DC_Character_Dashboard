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

  draw(ratioArr) {


    let numVisible = this.alignment === "hero" ? ratioArr[0] : ratioArr[1];

    for (let i = 1; i <= 5; i++) {

      const figure = document.querySelector(`#${this.alignment}-${i}`);

      figure.classList = numVisible >= i ? [""] : ["invisible"];
    }




    // const barKey = this.divId.split("-")[0].slice(1);

    // // Get the Property-Count Pairs for each category
    // filteredData = d3.groups(filteredData, d => d[barKey]).map(d => {

    //   return {property: d[0], count: d[1].length};
    // }).sort((a, b) => b.count - a.count);


    // AXIS SCALES. COLOR SCALES. ====================
    
    // DRAW BARS =====================================

  }

}
  
export { StickFigures };
  