class RatioDisplay {

    constructor(divId) {
      this.container = d3.select(divId)
      this.duration = 1000
    }
  
    draw(filteredData) {
      console.log("Draw ratio-display");
  
      // Get count of heroes and villains
      const countObj = {good: 0, bad: 0};
      filteredData.map(d => countObj[d.alignment]++);

      // Create hero to villain ratio by dividing by the smaller num
      let ratioArr = [countObj.good, countObj.bad];

      let heroBig = ratioArr[0] >= ratioArr[1];
      let biggerNum = heroBig ? ratioArr[0] : ratioArr[1];
      let smallerNum = heroBig ? ratioArr[1] : ratioArr[0];

      let ratioFloat = Math.round((smallerNum / biggerNum) * 5);
      
      ratioArr = heroBig ? [5, ratioFloat] : [ratioFloat, 5];
      
      // // simplify any multiple ratios (10:5 to 2:1)
      // for (let i = ratioArr[1]; i > 1; i--) {
      //   if((ratioArr[0] % i) == 0 && (ratioArr[1] % i) == 0) {
      //       ratioArr[0] = ratioArr[0] / i;
      //       ratioArr[1] = ratioArr[1] / i;
      //   }
      // }

      console.log(countObj);
      console.log(ratioArr)



  
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
  