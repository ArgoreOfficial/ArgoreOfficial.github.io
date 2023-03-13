const image_input = document.getElementById("image_input");
var uploaded_image = "";
var img = new Image();

image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.getElementById("display_image").src = uploaded_image;
        
        img.src = uploaded_image;
        img.onload = function() {
            document.getElementById("output_width").value = img.width;
            document.getElementById("output_height").value = img.height;
        }
        
    });
    reader.readAsDataURL(this.files[0]);
});

function convert() {

    // output stuff
    var output = "file = {}\n\n";
    output += "file.width = " + img.width + "\n"; 
    output += "file.height = " + img.height + "\n\n"; 
    
    output += "file.data = {\n"; 

    if(img.src == "") return;
    console.log("Converting image...");
    
    // loop y
    for (let y = 0; y < img.height; y++) {
        output += "    { ";
        
        // loop x
        for (let x = 0; x < img.width; x++) {
            var pixel = getPixel(x,y);
            output += "{" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + "}";
            
            if (x < img.width-1) {
                output += ", ";
            }
        }

        output += " }";
        if (y < img.height-1) {
            output += ",\n";
        }
    }
    output += "\n}\n\n";
    
    output += "function file.GetPixel(x, y)\n";
    output += "    return ColorRGBA(file.data[y][x][1], self.data[y][x][2], self.data[y][x][3], 255)\n";
    output += "end\n\n";

    output += "return file"
    console.log(output);
}

// returns pixel value
function getPixel(x, y) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(x, y, 1, 1).data;
  }