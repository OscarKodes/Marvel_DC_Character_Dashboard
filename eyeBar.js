class EyeBar {

    constructor(state, setGlobalState) {
      // initialize properties here
      this.width = window.innerWidth * 0.2;
      this.height = window.innerHeight * 0.2;
      this.margin = 20;
      this.duration = 1000;
      this.format = d3.format(",." + d3.precisionFixed(1) + "f");
      
      this.svg = 
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


      
      
      
    }
  }
  
  export { EyeBar };
  