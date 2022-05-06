class Buttons {

    constructor(state, setGlobalState) {
      
      
      // FOR TOGGLE SWITCHES =============================

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


      // ################################################
      // EYE DROPDOWN MENUS =============================

      // Grab elements for listeners and values
      const eyeMenu = d3.select("#eye-select");

      const eyeColors = [
        'blue', 'brown', 'green', 
        'red', 'black', 'white', 
        'yellow', 'silver', 'purple'
      ].sort().concat(['mixed', "NA"]);

      // Create array for holding vis options 
      const eyeMenuData = [{key: "all", label: "All Eye Colors"}]

      // Fill eyeMenuData with the possible data vis options
      eyeColors.map(color => {
        eyeMenuData.push({
          key: color, 
          label: color === "NA" ?
                  "No Eye Color" :
                  color === "mixed" ?
                    "Heterochromatic Eyes":
                    `${color[0].toUpperCase() + color.slice(1)} Eyes`
        })
      });

      // Create options in UI menu for user to click
      eyeMenu
        .selectAll("option")
        .data(eyeMenuData)
        .join("option")
        .attr("value", d => d.key)
        .text(d => d.label);

      // Listen for user changes on menu and call draw
      eyeMenu.on("change", event => {

        const selectedEyeColor = event.target.value;

        setGlobalState({ 
          activeEyes: selectedEyeColor
        });
      });



      // ################################################
      // HAIR DROPDOWN MENUS =============================

      // Grab elements for listeners and values
      const hairMenu = d3.select("#hair-select");

      const hairColors = [
        "burnette", "blond", "ginger", 
        "white", "green", "silver", 
        "purple", "blue", "pink"
      ].sort().concat(['mixed', "no hair"]);

      // Create array for holding vis options 
      const hairMenuData = [{key: "all", label: "All Hair Colors"}]

      // Fill hairMenuData with the possible data vis options
      hairColors.map(color => {
        hairMenuData.push({
          key: color, 
          label: color === "mixed" ?
                  "Multi-Colored Hair":
                    color === "no hair" ?
                      "No Hair" :
                      `${color[0].toUpperCase() + color.slice(1)} Hair`
        })
      });

      // Create options in UI menu for user to click
      hairMenu
        .selectAll("option")
        .data(hairMenuData)
        .join("option")
        .attr("value", d => d.key)
        .text(d => d.label);

      // Listen for user changes on menu and call draw
      hairMenu.on("change", event => {

        const selectedHairColor = event.target.value;

        setGlobalState({ 
          activeHair: selectedHairColor
        });
      });




      // ################################################
      // RACE DROPDOWN MENUS =============================

      // Grab elements for listeners and values
      const raceMenu = d3.select("#race-select");

      const raceTypes = [
        "human",
        "alien",
        "diety",
        "robot",
        "amazon/atlantean",
        "demon",
        "animal",
        "undead"
    ].sort().concat(["mixed-race", "NA"]);

      // Create array for holding vis options 
      const raceMenuData = [{key: "all", label: "All Races"}]

      // Fill raceMenuData with the possible data vis options
      raceTypes.map(race => {
        raceMenuData.push({
          key: race, 
          label: race === "amazon/atlantean" ?
                  "Amazons/Atlanteans": race === "NA" ?
                      "Unknown race" : race === "diety" ?
                        "Dieties" : race === "mixed-race" ?
                          "Mixed-race" : `${race[0].toUpperCase() + race.slice(1)}s`
        })
      });

      // Create options in UI menu for user to click
      raceMenu
        .selectAll("option")
        .data(raceMenuData)
        .join("option")
        .attr("value", d => d.key)
        .text(d => d.label);

      // Listen for user changes on menu and call draw
      raceMenu.on("change", event => {

        const selectedRaceType = event.target.value;

        setGlobalState({ 
          activeRace: selectedRaceType
        });
      });
    }
  
  }
  
  export { Buttons };
  