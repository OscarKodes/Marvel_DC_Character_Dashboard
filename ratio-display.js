class RatioDisplay {

    constructor(divId) {
      this.container = d3.select(divId)
      this.duration = 1000
    }
  
    draw(totalNums, ratioArr) {

      const selectHeroTotal = document.querySelector("#hero-total");
      const selectVillainTotal = document.querySelector("#villain-total");

      selectHeroTotal.innerHTML = totalNums[0];
      selectVillainTotal.innerHTML = totalNums[1];

      const selectHeroRatio = document.querySelector("#hero-ratio");
      const selectVillainRatio = document.querySelector("#villain-ratio");

      selectHeroRatio.innerHTML = ratioArr[0];
      selectVillainRatio.innerHTML = ratioArr[1];
    }
  }
  
  export { RatioDisplay };
  