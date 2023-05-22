const urlParams = new URLSearchParams(window.location.search);
var typeParam = urlParams.get('type');
var variantParam = urlParams.get('variant');

if(typeParam != null) {
    select_by_attribute(document.getElementById("type_selector"), typeParam);
} else {
    select_by_attribute(document.getElementById("type_selector"), "random");
}

if(variantParam != null) {
    select_by_attribute(document.getElementById("variant_selector"), variantParam);
} else {
    select_by_attribute(document.getElementById("variant_selector"), "random");
}

var select_menus = document.getElementsByClassName("select_menu");
for (var i = 0; i < select_menus.length; i++) {
   
    var options = select_menus[i].children;

    for (var c = 0; c < options.length; c++) {
        
        options[c].onclick = function(e) {
            //console.log(this.getAttribute('data-option'));
            this.parentElement.getElementsByClassName("selected")[0].className = "";
            this.className = "selected";

            set_search_params(
                document.getElementById("type_selector").getElementsByClassName("selected")[0].getAttribute('data-option'),
                document.getElementById("variant_selector").getElementsByClassName("selected")[0].getAttribute('data-option'),
            )
        }
    }
}

function set_search_params(type = "", variant = "", user = "") {
    // Get current URL parts
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    // Update query string values
    if (type != "") params.set('type', type);
    if (variant != "") params.set('variant', variant);
    if (user != "") params.set('user', user);

    // Encode URL
    // numerical=123&string=yummy&multiple=a%2Cb%2Cc&foreignChar=%C3%A9
    console.log(params.toString());

    // Update URL
    window.history.replaceState({}, '', `${path}?${params.toString()}${hash}`);
}

function select_by_attribute(parent, attribute) {
    for (var i = 0; i < parent.children.length; i++) {
        if(parent.children[i].getAttribute("data-option") != attribute) continue;
        
        var currentSelected = parent.getElementsByClassName("selected")[0];
        if(currentSelected != null) currentSelected.className = "";
        parent.children[i].className = "selected";
        return;
    }
}

function get_selected(selector_id) {
    return document.getElementById(selector_id).getElementsByClassName("selected")[0].getAttribute('data-option');
}