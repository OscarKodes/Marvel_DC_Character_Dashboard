class Buttons {

    constructor(state, setGlobalState) {
      
      

      // select the toggle switches
      let allButtons = document.querySelectorAll("input");

      console.log("BUTTONS", allButtons[0].checked);

      for (let i = 0; i < allButtons.length; i++) {

        allButtons[i].addEventListener("click", function(event) {

          let activeButtonsArr = [];

          for (let j = 0; j < allButtons.length; j++) {
            
            let btn = allButtons[j];
            let values = btn.value.split(" ");

            if (btn.checked) {
              activeButtonsArr = activeButtonsArr.concat(values);
            }; 
          }

          console.log("ACTIVE BTNS ARR", activeButtonsArr);

          setGlobalState({ 
            activeButtons: activeButtonsArr
          });
        });
      };

      // loop through all switches and place event listeners on them
      // for (let i = 0; i < allButtons.length; i++) {

      //   // if clicked remove/add the id label to the active array
      //   allButtons[i].addEventListener("click", function(event) {
          
      //     let sliderName = event.path[0].id;
          
      //     sliderName = sliderName.split(" ")[0].toLowerCase();
          
      //     if (activeButtonsArr.includes(sliderName)) {
      //       let idx = activeButtonsArr.indexOf(sliderName);
  
      //       activeButtonsArr.splice(idx, 1);
      //     } 
          
      //     else {
      //       activeButtonsArr.push(sliderName);
      //     }


    }
  
    draw() {
      console.log("test");
    }
  }
  
  export { Buttons };
  