const alternatives = [
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
  "Back spike": {
    zone: "6",
    type: "attack"
  },
  "Serve ace": {
    zone: "0",
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
  "Right attack out": {
    zone: "2",
    type: "miss"
  },
  "Center attack out": {
    zone: "3",
    type: "mishit"
  },
  "Left attack out": {
    zone: "4",
    type: "mishit"
  },
  "Right attack net": {
    zone: "2",
    type: "mishit"
  },
  "Center attack net": {
    zone: "3",
    type: "mishit"
  },
  "Left attack net": {
    zone: "4",
    type: "mishit"
  },
  "Net touch right": {
    zone: "2",
    type: "unforced"
  },
  "Net touch center": {
    zone: "3",
    type: "unforced"
  },
  "Net touch left": {
    zone: "4",
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