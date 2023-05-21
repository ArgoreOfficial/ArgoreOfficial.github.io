

const urlParams = new URLSearchParams(window.location.search);
var user = urlParams.get('user');

var myrng;
if(user == null) { myrng = new Math.seedrandom(); }
else {
    user = user.replace(/ /g,'').toLowerCase()
    myrng = new Math.seedrandom(user);
    console.log(user);
}

// min, max

document.getElementById("json").textContent += JSON.stringify(get_from_variant("tankette"), null, "\t");
document.getElementById("json").textContent += JSON.stringify(get_from_variant("light"), null, "\t");
document.getElementById("json").textContent += JSON.stringify(get_from_variant("medium"), null, "\t");
document.getElementById("json").textContent += JSON.stringify(get_from_variant("heavy"), null, "\t");
document.getElementById("json").textContent += JSON.stringify(get_from_variant("superheavy"), null, "\t");

// generates tank based off of variant
function get_from_variant(variant) {
    if(variant == "tankette") {
        return generate_tank( // tankette
            "tank", // type
            2, 9, // weight
            30, 200, // calibre
            1, 5, // crew
        )
    }
    else if(variant == "light") {
        return generate_tank( // light
            "tank", // type
            10, 19, // weight
            30, 200, // calibre
            1, 5, // crew
        )
    }
    else if(variant == "medium") {
        return generate_tank( // medium
            "tank", // type
            20, 39, // weight
            30, 200, // calibre
            1, 5, // crew
        )
    }
    else if(variant == "heavy") {
        return generate_tank( // heavy
            "tank", // type
            40, 99, // weight
            30, 200, // calibre
            1, 5, // crew
        )
    }
    else if(variant == "superheavy") {
        return generate_tank( // superheavy
            "tank", // type
            100, 200, // weight
            30, 200, // calibre
            1, 5, // crew
        )
    }
}

function generate_tank(
    vehicleType,
    minWeight, maxWeight,
    minCalibre, maxCalibre,
    minCrew, maxCrew) 
{
    var tank = {};
    
    tank.type = vehicleType;
    tank.weight = getRandomInt(minWeight, maxWeight);
    tank.variant = get_weight_variant(tank.weight);
    tank.calibre = getRandomInt(minCalibre, maxCalibre);
    tank.crewCount = getRandomInt(minCrew, maxCrew);
    
    // engine
    
    if(tank.variant == "tankette") { tank.cylinderCount = getRandomInt(2, 6) }
    else if(tank.variant == "light") { tank.cylinderCount = getRandomInt(5, 8) }
    else if(tank.variant == "medium") { tank.cylinderCount = getRandomInt(6, 12) }
    else if(tank.variant == "heavy") { tank.cylinderCount = getRandomInt(8, 16) }
    else if(tank.variant == "superheavy") { tank.cylinderCount = getRandomInt(12, 12 + (tank.weight - 100) / 20) }
    
    if(tank.cylinderCount > 12 && tank.cylinderCount & 1) { tank.cylinderCount += 1; } // add 1 if the cylinder count is odd and more than 12
    
    tank.cylinderVolume = get_cylinder_vol(tank.weight, tank.cylinderCount);
    
    return tank;
}
    
// weights:
// <10 tankette
// 10-20 light
// 20-40 medium
// 40-100 heavy
function get_weight_variant(weight) {
    if(weight < 10) {
        return "tankette";
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

