class StickFigures {

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
      .attr("height", this.height);

  }

  draw(ratioArr) {

    console.log(`Draw ${this.divId}`);

    console.log("Number of stick figures in ring:", ratioArr);

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
  