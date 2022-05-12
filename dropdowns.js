class Dropdowns {

    constructor(setGlobalState) {
      

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
      const eyeMenuData = [{key: "all", label: "All"}]

      // Fill eyeMenuData with the possible data vis options
      eyeColors.map(color => {
        eyeMenuData.push({
          key: color, 
          label: color === "NA" ?
                  "Unknown" :
                  color === "mixed" ?
                    "Multi-Colored":
                    `${color[0].toUpperCase() + color.slice(1)}`
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
      // PUBLISHER DROPDOWN MENUS =============================

      // Grab elements for listeners and values
      const publisherMenu = d3.select("#publisher-select");

      const publisherChoices = [
        "marvel", "dc"
      ].sort();

      // Create array for holding vis options 
      const publisherMenuData = [{key: "all", label: "All"}]

      // Fill publisherMenuData with the possible data vis options
      publisherChoices.map(choice => {
        publisherMenuData.push({
          key: choice, 
          label: choice === "dc" ?
              "DC" : 
              `${choice[0].toUpperCase() + choice.slice(1)}`
        })
      });

      // Create options in UI menu for user to click
      publisherMenu
        .selectAll("option")
        .data(publisherMenuData)
        .join("option")
        .attr("value", d => d.key)
        .text(d => d.label);

      // Listen for user changes on menu and call draw
      publisherMenu.on("change", event => {

        const selectedPublisherChoice = event.target.value;

        setGlobalState({ 
          activePublisher: selectedPublisherChoice
        });
      });




      // ################################################
      // ALIGHTMENT DROPDOWN MENUS =============================

      // Grab elements for listeners and values
      const alignmentMenu = d3.select("#alignment-select");

      const alignmentChoices = [
        "good", "bad"
      ].sort();

      // Create array for holding vis options 
      const alignmentMenuData = [{key: "all", label: "All"}]

      // Fill alignmentMenuData with the possible data vis options
      alignmentChoices.map(choice => {
        alignmentMenuData.push({
          key: choice, 
          label: choice === "good" ?
              "Hero" : choice === "bad" ?
              "Villain" : 
              `${choice[0].toUpperCase() + choice.slice(1)}`
        })
      });

      // Create options in UI menu for user to click
      alignmentMenu
        .selectAll("option")
        .data(alignmentMenuData)
        .join("option")
        .attr("value", d => d.key)
        .text(d => d.label);

      // Listen for user changes on menu and call draw
      alignmentMenu.on("change", event => {

        const selectedAlignmentChoice = event.target.value;

        setGlobalState({ 
          activeAlignment: selectedAlignmentChoice
        });
      });



      // ################################################
      // GENDERS DROPDOWN MENUS =============================

      // Grab elements for listeners and values
      const genderMenu = d3.select("#gender-select");

      const genderChoices = [
        "male", "female", "other"
      ].sort();

      // Create array for holding vis options 
      const genderMenuData = [{key: "all", label: "All"}]

      // Fill genderMenuData with the possible data vis options
      genderChoices.map(choice => {
        genderMenuData.push({
          key: choice, 
          label: `${choice[0].toUpperCase() + choice.slice(1)}`
        })
      });

      // Create options in UI menu for user to click
      genderMenu
        .selectAll("option")
        .data(genderMenuData)
        .join("option")
        .attr("value", d => d.key)
        .text(d => d.label);

      // Listen for user changes on menu and call draw
      genderMenu.on("change", event => {

        const selectedGenderChoice = event.target.value;

        setGlobalState({ 
          activeGender: selectedGenderChoice
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
      ].sort().concat(['mixed', "no hair", "NA"]);

      // Create array for holding vis options 
      const hairMenuData = [{key: "all", label: "All"}]

      // Fill hairMenuData with the possible data vis options
      hairColors.map(color => {
        hairMenuData.push({
          key: color, 
          label: color === "mixed" ?
                  "Multi-Colored": color === "no hair" ?
                  "No Hair" : color === "NA" ?
                    "Unknown" :
                      `${color[0].toUpperCase() + color.slice(1)}`
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
      const raceMenuData = [{key: "all", label: "All"}]

      // Fill raceMenuData with the possible data vis options
      raceTypes.map(race => {
        raceMenuData.push({
          key: race, 
          label: race === "amazon/atlantean" ?
                  "Amazons/Atlanteans": race === "NA" ?
                      "Unknown" : race === "diety" ?
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
  
  export { Dropdowns };
  