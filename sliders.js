class Sliders {

    constructor(state, setGlobalState) {
      
      // select the toggle switches
      let allSliders = document.querySelectorAll(".slider_click");

      // array of switches that are toggled on
      let activeSlidersArr = state.activeSliders;

      // loop through all switches and place event listeners on them
      for (let i = 0; i < allSliders.length; i++) {

        // if clicked remove/add the id label to the active array
        allSliders[i].addEventListener("click", function(event) {
          
          let sliderName = event.path[0].id;
          
          sliderName = sliderName.split(" ")[0].toLowerCase();
          
          if (activeSlidersArr.includes(sliderName)) {
            let idx = activeSlidersArr.indexOf(sliderName);
  
            activeSlidersArr.splice(idx, 1);
          } 
          
          else {
            activeSlidersArr.push(sliderName);
          }

          // once the click is finished, 
          // tell all other components about the active sliders
          setGlobalState({ 
            activeSliders: activeSlidersArr
          });
        });
      }
  
    }
  
  }
  
  export { Sliders };
  