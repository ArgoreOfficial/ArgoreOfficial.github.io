// calibre values
const calibres = [0,2,7,12,20,30,37,40,45,47,50,55,57,65,73,75,76,80,85,88,90,100,105,107,110,115,120,122,125,128,130,150,152,155,183,200,240];

var types = [];
var type_selector = document.getElementById("type_selector").children;
for (i = 1; i < type_selector.length; i++) {
    types.push(type_selector[i].getAttribute('data-option'));
    console.log(types[types.length - 1]);
}

// get params
var user = urlParams.get('user');
var myrng;

// init generate button
document.getElementById("generate_button").addEventListener("click", buttonclick);
buttonclick();

// onclick function for the generate button
function buttonclick() {
    init_rng();
    
    var typeText = get_selected("type_selector");
    var variantText = get_selected("variant_selector");
    
    if(typeText == "random") variantText = types[getRandomInt(0, types.length - 1)];
    generate_from_type_variant(typeText, variantText);
}

// set up random number generator
function init_rng() {
    if(user == null) { myrng = new Math.seedrandom(); }
    else {
        user = user.replace(/ /g,'').toLowerCase()
        myrng = new Math.seedrandom(user);
        console.log(user);
    }
}

// generates vehicle from type (tank, armoured car, etc.) and variation (light, medium, heavy, etc.)
async function generate_from_type_variant(type, variant) {
    var variantIndex = 0;
    switch(variant) {
        case "superlight": variantIndex = 0; break;
        case "light": variantIndex = 1; break;
        case "medium": variantIndex = 2; break;
        case "heavy": variantIndex = 3; break;
        case "superheavy": variantIndex = 4; break;
        case "random": 
            variantIndex = getRandomInt(0,4);
            break;
    }

    var text = await getFile("./vehicle_types/" + type + ".txt");
    var textByLine = text.split("\n");
    var values = textByLine[variantIndex].split(" ");

    document.getElementById('result').textContent =  generate_vehicle(
        type, variant,
        values[0], values[1], 
        values[2], values[3], 
        values[4], values[5]
    );
}

// generates vehicle using specified min and max values
// vehicle type is only used for text
function generate_vehicle(
    vehicleType, variant,
    minWeight, maxWeight,
    minCrew, maxCrew,
    minCalibre, maxCalibre) 
{
    var vehicle = {};

    vehicle.type = vehicleType;
    vehicle.weight = getRandomInt(minWeight, maxWeight);
    vehicle.variant = variant;
    vehicle.calibre = get_real_calibre(getRandomInt(minCalibre, maxCalibre));
    vehicle.crewCount = getRandomInt(minCrew, maxCrew);
    
    // variant dependant stuff
    if(vehicle.variant == "superlight") { 
        vehicle.cylinderCount = getRandomInt(2, 6);
    }
    else if(vehicle.variant == "light") { 
        vehicle.cylinderCount = getRandomInt(5, 8);
    }
    else if(vehicle.variant == "medium") { 
        vehicle.cylinderCount = getRandomInt(6, 12); 
    }
    else if(vehicle.variant == "heavy") { 
        vehicle.cylinderCount = getRandomInt(9, 30);
    }
    else if(vehicle.variant == "superheavy") { 
        vehicle.cylinderCount = getRandomInt(12, 12 + (vehicle.weight - 100) / 20);
    }
    
    if(vehicle.cylinderCount > 12 && vehicle.cylinderCount & 1) { vehicle.cylinderCount += 1; } // add 1 if the cylinder count is odd and more than 12
    
    vehicle.cylinderVolume = Math.round(get_cylinder_vol(vehicle.weight, vehicle.cylinderCount) * 1000) / 1000;
    
    return wordify(vehicle);
}


function wordify(vehicle) {
    var engineType = "V";
    
    var fullVehicleType = vehicle.variant + " " + vehicle.type.replace("_", " ");
    // random engine type
    var randomEngine = getRandomInt(0,5);
    if(randomEngine == 1) { engineType = "inline "; }
    else if(randomEngine == 2) { engineType = "radial "; }
    var engineText = ", and a " + vehicle.cylinderVolume + " L/cyl " + engineType + vehicle.cylinderCount + " engine!\n";
    
    // superlight special cases
    console.log(vehicle.variant);
    if(vehicle.variant == "superlight") {
        if(vehicle.type == "tank") { 
            fullVehicleType = "tankette"; 
        }
        else if(vehicle.type == "armoured_car") { 
            fullVehicleType = "scout car"; 
        }
    }
    
    var weightTypeGun = "Build a " + vehicle.weight + "-ton " + fullVehicleType + " with a " + vehicle.calibre + "mm gun. ";
    
    if(vehicle.calibre == 0) { // unarmed special case
        weightTypeGun = "Build an unarmed " + vehicle.weight + "-ton " + fullVehicleType + ", "
    }


    return weightTypeGun + vehicle.crewCount + " crew members" + engineText;
    
}

// the texan formula
function get_cylinder_vol(weight, cylCount) {
    
    // "Most tanks need 10-20 hp/ton" - texan
    var hp = weight * (getRandom(10, 21)) // random 10-20 tons
    
    return hp * (1/20) * (1/cylCount) 
}

function get_real_calibre(calibre) {
   
    var closest = calibres.reduce(function(prev, curr) {
        return (Math.abs(curr - calibre) < Math.abs(prev - calibre) ? curr : prev);
    });

    return closest
}


// random

// inclusive min, exclusive max
function getRandom(min, max) {
    return myrng() * (max - min) + min;
}

// inclusive min, inclusive max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(myrng() * (max - min + 1)) + min;
}

