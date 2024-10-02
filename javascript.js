let IcaoCallsigns = [
    {
        icaoc: "LHBP",
        calls: "Budapest",
        contry: "Hungary"
    },
    {
        icaoc: "LHKE",
        calls: "Kecskemét",
        contry: "Hungary"
    }
];

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter'){
        showNext();
    }
    if (event.key === '1'){
        skip();
    }
});

const dropdownInput = document.querySelector('.dropdown-input');
    const dropdownList = document.getElementById('dropdownList');

    // Megjeleníti a lenyíló menüt, ha az inputra kattintunk
    dropdownInput.addEventListener('focus', () => {
        dropdownList.style.display = 'block';
    });

    // Elrejti a lenyíló menüt, ha a felhasználó máshová kattint
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdownList.style.display = 'none';
        }
    });

    // Opció kiválasztása
    function selectOption(element) {
        dropdownInput.value = element.textContent;
        dropdownList.style.display = 'none';
    }

    // Opciók szűrése az input mező alapján
    function filterOptions() {
        const filter = dropdownInput.value.toLowerCase();
        const options = dropdownList.getElementsByClassName('dropdown-item');
        
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const text = option.textContent || option.innerText;
            
            if (text.toLowerCase().indexOf(filter) > -1) {
                option.style.display = "";
            } else {
                option.style.display = "none";
            }
        }
    }



document.addEventListener("DOMContentLoaded", function() {
    showCalls();
});

let currentCallsignIndex = 0;
let mode = "basic";

//fields

var headerContent = document.getElementById("header");
var IcaoField = document.getElementById("IcaoField");
var CallsignField = document.getElementById("CallsignField");

function switchmodes(){
    if(mode === "basic"){
        mode = "second";
        IcaoField.style.display = "flex";
        CallsignField.style.display = "none";
    }
    else{
        mode = "basic";
        IcaoField.style.display = "none";
        CallsignField.style.display = "flex";
    }
    showCalls()
}

function showCalls(){
    const currentCallsign = IcaoCallsigns[currentCallsignIndex];

    if(mode === "basic"){
        headerContent.innerHTML = currentCallsign.icaoc;
    }
    else{
        headerContent.innerHTML = currentCallsign.calls;
    }
}

function showNext(){
    if(check()){
        if(IcaoCallsigns.length > currentCallsignIndex + 1){
            currentCallsignIndex += 1;
            showCalls();
        }
        else{
            done()
        }
    }
    else{
        alert("not good");
    }
}

function skip(){
    if(IcaoCallsigns.length > currentCallsignIndex + 1){
        currentCallsignIndex += 1;
        showCalls();
    }
    else{
        done()
    }
}

function check(){
    const Callsign = document.getElementById("Callsign");
    const ICAOcode = document.getElementById("ICAOcode");
    const currentCallsign = IcaoCallsigns[currentCallsignIndex];

    if(mode === "basic"){
        if(currentCallsign.calls.toLowerCase() === Callsign.value.toLowerCase()){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        if(currentCallsign.icaoc.toLowerCase() === ICAOcode.value.toLowerCase()){
            return true;
        }
        else{
            return false;
        }
    }
}
function done(){
    alert("done");
    currentCallsignIndex = 0;
    showCalls();
}