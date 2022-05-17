class MedianDisplay {

    constructor(divId) {

        this.width = window.innerWidth * 0.2;
        this.height = window.innerHeight * 0.2;
        this.margin = 20;
        this.duration = 1000;
        this.divId = divId;


      }
  
      draw(weight, height) {

        const selectDisplay = document.querySelector(this.divId);
        const selectSpans = selectDisplay.querySelectorAll("span")

        if (!weight) {
            weight = 0;
        }

        if (!height) {
            height = 0;
        }

        selectSpans[0].innerHTML = `Weight: ${Math.round(weight)} kg`;
        selectSpans[1].innerHTML = `Height: ${Math.round(height)} cm`;
    
      }
    }

export { MedianDisplay };
