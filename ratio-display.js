class RatioDisplay {

    constructor(divId) {
      this.container = d3.select(divId)
      this.duration = 1000
    }
  
    draw(ratioArr) {
      console.log("Draw ratio-display");
  
    
      console.log(ratioArr)

      const selectHeroNum = document.querySelector("#hero-num");
      const selectVillainNum = document.querySelector("#villain-num");

      selectHeroNum.innerHTML = ratioArr[0];
      selectVillainNum.innerHTML = ratioArr[1];
  
      // const metric = this.container
      //   .selectAll("div.metric")
      //   .data(metricData, d => d.State)
      //   .join(
      //     enter =>
      //       enter
      //         .append("div")
      //         .attr("class", "metric")
      //         .call(enter => enter.append("div").attr("class", "title"))
      //         .call(enter => enter.append("div").attr("class", "number")),
      //       update => update,
      //       exit => exit.remove()
      //   ).on("click",  (event, d)=> {
      //     setGlobalState({ selectedMetric: d.metric });
      //   })
  
  
      // metric.select("div.title")
      //   .text(d => d.metric)
  
      // const format = d3.format(",." + d3.precisionFixed(1) + "f")
  
      // metric.select("div.number")
      //   // reference: https://observablehq.com/@d3/transition-texttween
      //   .transition()
      //   .duration(this.duration)
      //   .style("color", d => d.metric === state.selectedMetric ? "purple" : "#ccc")
      //   .textTween(function(d) {
      //     const i = d3.interpolate(0, d.value);
      //     return function(t) { return format(i(t)); };
      //   })
    }
  }
  
  export { RatioDisplay };
  