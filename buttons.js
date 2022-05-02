class Buttons {

    constructor(state, setGlobalState) {
      
      

      // select the toggle switches
      let allButtons = document.querySelectorAll("input");


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

          // if a btn is clicked we change the .checked classes
          

          // theParentDiv.classList.add("checked");

          const theContainerDiv = event.target.parentNode.parentNode;
          const theClickedDiv = event.target.parentNode;
          const allBtnDivs = theContainerDiv.querySelectorAll(".btn");

          for (let i = 0; i < allBtnDivs.length; i++) {
            let thisDiv = allBtnDivs[i];

            thisDiv.classList.remove("checked");
          }

          theClickedDiv.classList.add("checked");


          setGlobalState({ 
            activeButtons: activeButtonsArr
          });
        });
      };


      // if click on the btn's div, it auto clicks the btn
      const selectDiv = document.querySelectorAll(".btn");
      
      for (let i = 0; i < selectDiv.length; i++) {

        const thisDiv = selectDiv[i];

        thisDiv.addEventListener("click", function(event){

          event.target.querySelector("input").click();
        })
      }

    }
  
  }
  
  export { Buttons };
  