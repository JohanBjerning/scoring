const alternatives = [
  "Kill",
  "Ace",
  "Block",
  "Unforced",
  "Serve miss",
  "Oklart",
  "Left attack",
  "Center attack",
  "Right attack",
  "Drop left",
  "Drop center",
  "Drop right",
  "Block left",
  "Block center",
  "Block right",
  "Back spike",
  "Serve ace",
  "Net touch",
  "Unforced error",  
  "Rotation error",
  "Unknown error"
]

const alternativesAdvanced = {
  "Left attack" : {
    zone: "4",
    type: "attack"
  },  
  "Center attack" : {
    zone: "3",
    type: "attack"
  },
  "Right attack": {
    zone: "2",
    type: "attack",
  },
  "Drop left": {
    zone: "4",
    type: "attack"
  },
  "Drop center": {
    zone: "3",
    type: "attack"
  },
  "Drop right": {
    zone: "2",
    type: "attack"
  }, 
  "Block left": {
    zone: "4",
    type: "defence"
  },
  "Block center": {
    zone: "3",
    type: "defence"
  },
  "Block right": {
    zone: "2",
    type: "defence"
  },
  "Back spike": {
    zone: "6",
    type: "attack"
  },
  "Serve ace": {
    zone: "0",
    type: "attack"
  },  
  "Net touch": {
    type: "unforced"
  },
  "Unforced error": {
    type: "unforced"
  },
  "Rotation error": {
    type: "unforced"
  },
  "Unknown error": {
    type: "unforced"
  }
}

export {
  alternatives,
  alternativesAdvanced
}