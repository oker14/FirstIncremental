// Form Atom Formula : (gameStats.AtomGain * ((gameStats.Molecules / 2) + 1)) * ((gameStats.Ions * 2) + 1)

// Molecule Cost Formula : 6 * ((gameStats.Molecules + 1) * (gameStats.Molecules / 2) + 1)
// Ion Cost Formula : 5 * ((gameStats.Ions * gameStats.Ions) + 1)

var gameStats = {
    Atoms: 0,
    AtomGain: 1,

    Molecules: 0,

    Ions: 0, // Rebirth
}   

var savegame = JSON.parse(localStorage.getItem("AtomicIncremental3")) // Load Save
if (savegame !== null) {
    gameStats = savegame
}

function ResetLabels() {
    document.getElementById("AtomsDisplay").innerHTML = gameStats.Atoms.toFixed(2) + " Atoms Formed"
    document.getElementById("AtomGainDisplay").innerHTML = ((gameStats.AtomGain * ((gameStats.Molecules / 2) + 1)) * ((gameStats.Ions * 2) + 1)).toFixed(2)+" Atoms every 1 second"

    document.getElementById("MoleculesDisplay").innerHTML = gameStats.Molecules.toFixed(2) + " Molecules Formed"
    document.getElementById("MoleculeButton").innerHTML = "Create a Molecule ("+ (6 * ((gameStats.Molecules + 1) * (gameStats.Molecules / 2) + 1)).toFixed(2) +" Atoms Required)"

    document.getElementById("IonsDisplay").innerHTML = gameStats.Ions.toFixed(2) + " Ions Constructed"
    document.getElementById("IonButton").innerHTML = "Construct an Ion ("+(5 * ((gameStats.Ions * gameStats.Ions) + 1)).toFixed(2)+" Molecules Required)"
}

function Reset1() {
    gameStats.Atoms = 0
    gameStats.AtomGain = 1
    gameStats.Molecules = 0
}

function FormAtom() {
    gameStats.Atoms += (gameStats.AtomGain * ((gameStats.Molecules / 2) + 1)) * ((gameStats.Ions * 2) + 1)
    ResetLabels()
}

function CreateMolecule() {
    let CostOfUpgrade = 6 * ((gameStats.Molecules + 1) * (gameStats.Molecules / 2) + 1);
    if (gameStats.Atoms >= CostOfUpgrade) { // Costs Atoms
        gameStats.Atoms -= CostOfUpgrade
        gameStats.Molecules += 1 * ((gameStats.Ions / 4) + 1)
        CostOfUpgrade = 10 * (gameStats.Molecules);
        ResetLabels()
    }
}

function ConstructIon() { // Rebirth, (2x to Atoms, 1.25x to Molecules) per
    let CostOfUpgrade = 5 * ((gameStats.Ions * gameStats.Ions) + 1);
    if (gameStats.Molecules >= CostOfUpgrade) { // Costs Molecules
        gameStats.Ions += 1
        Reset1()
        CostOfUpgrade = 10 * (gameStats.Ions * gameStats.Ions);
        ResetLabels()
    }
}

var mainGameLoop = window.setInterval(function() {
    FormAtom()
  }, 1000) // 1000 ms, 1 second

  var saveGameLoop = window.setInterval(function() { // Save every 10 seconds.
    localStorage.setItem("AtomicIncremental3", JSON.stringify(gameStats))
  }, 10000)

ResetLabels()