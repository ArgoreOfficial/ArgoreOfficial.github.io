// calibre values
const calibres = [12,20,30,37,40,45,47,50,55,57,65,73,75,76,80,85,88,90,100,105,107,110,115,120,122,125,128,130,150,152,155,183,200,240];

// get params
var user = urlParams.get('user');
var myrng;

// init generate button
document.getElementById("generate_button").addEventListener("click", buttonclick);
buttonclick();

function buttonclick() {
    init_rng();
    
    var e = document.getElementById("variant_select");
    var variantText = get_selected("variant_selector");
    var generatedVehicle;
    
    if(variantText == "random") {
        var randomVariant = getRandomInt(0,4);
        switch(randomVariant) {
            case 0:
                generatedVehicle = generate_tank("superlight");
                break;
            case 1:
                generatedVehicle = generate_tank("light");
                break;
            case 2:
                generatedVehicle = generate_tank("medium");
                break;
            case 3:
                generatedVehicle = generate_tank("heavy");
                break;
            case 4:
                generatedVehicle = generate_tank("superheavy");
                break;
        }
    }
    else {
        generatedVehicle = generate_tank(variantText);
    }
    document.getElementById('result').textContent = generatedVehicle;
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

// generates tank based off of variant
function generate_tank(variant) {

    if(variant == "superlight") {
        return generate_vehicle( // superlight / tankette
            "tank", // type
            2, 9, // weight
            2, 3, // crew
            12, 30 // calibre
        )
    }
    else if(variant == "light") {
        return generate_vehicle( // light
            "tank", // type
            10, 19, // weight
            2, 5, // crew
            12, 55 // calibre
        )
    }
    else if(variant == "medium") {
        return generate_vehicle( // medium
            "tank", // type
            20, 39, // weight
            3, 5, // crew
            37, 88 // calibre
        )
    }
    else if(variant == "heavy") {
        return generate_vehicle( // heavy
            "tank", // type
            40, 99, // weight
            4, 6, // crew
            57, 155 // calibre
        )
    }
    else if(variant == "superheavy") {
        return generate_vehicle( // superheavy
            "tank", // type
            100, 200, // weight
            5, 8, // crew
            75, 240 // calibre
        )
    }
}

function generate_vehicle(
    vehicleType,
    minWeight, maxWeight,
    minCrew, maxCrew,
    minCalibre, maxCalibre) 
{
    var vehicle = {};
    
    vehicle.type = vehicleType;
    vehicle.weight = getRandomInt(minWeight, maxWeight);
    vehicle.variant = get_weight_variant(vehicle.weight);
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
    
    var engineType = "V";
    
    var fullVehicleType = vehicle.variant + " " + vehicle.type;

    // special cases
    if(vehicle.variant == "superlight") {
        if(vehicle.type == "tank") { fullVehicleType = "tankette"; }
        if(vehicle.type == "armoured car") { fullVehicleType = "combat car"; }
    }

    // random engine type
    var randomEngine = getRandomInt(0,5);
    if(randomEngine == 1) { engineType = "inline "; }
    else if(randomEngine == 2) { engineType = "radial "; }
    
    return "Build a " + vehicle.weight + "-ton " + fullVehicleType 
        + " with a " + vehicle.calibre + "mm gun. " 
        + vehicle.crewCount + " crew members, and a " + vehicle.cylinderVolume + " L/cyl "
        + engineType + vehicle.cylinderCount + " engine!\n";


}
    
// weights:
// <10 superlight/tankette
// 10-20 light
// 20-40 medium
// 40-100 heavy
function get_weight_variant(weight) {
    if(weight < 10) {
        return "superlight";
    } else if(weight < 20) {
        return "light";
    } else if(weight < 40) {
        return "medium";
    } else if(weight < 100) {
        return "heavy";
    } else {
        return "superheavy";
    }
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

