let IcaoCallsigns = [
    {icaoc: "AAL",	calls: "American",	contry: "USA"},
    {icaoc: "AAR",	calls: "Asiana",	contry: "Republic of Korea"},
    {icaoc: "ABD",	calls: "Atlanta",	contry: "Iceland"},
    {icaoc: "ABP",	calls: "B-air",	contry: "Czechia"},
    {icaoc: "ABR",	calls: "Contract",	contry: "Ireland"},


    


];

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter'){
        showNext();
    }
    if (event.key === '1'){
        hint();
    }
});

const dropdownInput = document.querySelector('.dropdown-input');
const dropdownList = document.getElementById('dropdownList');
const arrowdown = document.getElementById('dropdownarrow');
const IcaoHint = document.getElementById("IcaoHint");
const CallsignHint = document.getElementById("CallsignHint");
const CoutryHint = document.getElementById("CoutryHint");
let countryName = '';

//shuffle

let ShuffledCallsigns = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

IcaoCallsigns = shuffle(IcaoCallsigns);

// Megjeleníti a lenyíló menüt, ha az inputra kattintunk
dropdownInput.addEventListener('focus', () => {
    dropdownList.style.display = 'block';
});

arrowdown.addEventListener('click', () => {
    if (dropdownList.style.display === 'block') {
        dropdownList.style.display = 'none';
    } else {
        dropdownList.style.display = 'block';
    }
});

// Elrejti a lenyíló menüt, ha a felhasználó máshová kattint
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdownList.style.display = 'none';
    }
});

// Opció kiválasztása
function selectOption(element) {
    countryName = element.querySelector('.country-name').textContent;
    dropdownInput.value = countryName;
    dropdownList.style.display = 'none';
}


// Opciók szűrése az input mező alapján
function filterOptions() {
    const filter = dropdownInput.value.toLowerCase();
    const options = dropdownList.getElementsByClassName('dropdown-item');

    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const countryName = option.querySelector('.country-name').textContent.toLowerCase();
        
        if (countryName.indexOf(filter) > -1) {
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
            clear()
            if(checkCountry()){
                CallsignHint.innerHTML = "";
            }
            else{
                previousHint();
                CoutryHint.style.backgroundColor = "red";
            }
        }
        else{
            if(checkCountry()){
                alert("if")
                previousHint()
                CoutryHint.style.backgroundColor = "red";
                done();
            }
            else{
                alert("else")
                done();
                clear();
            }
        }
    }
    else{
        alert("not good");
    }

}

function clear(){
    document.getElementById("Callsign").value = "";
    document.getElementById("ICAOcode").value = "";
    document.querySelector(".dropdown-input").value = "";
    CoutryHint.style.backgroundColor = "white";
    IcaoHint.innerHTML = "";
    CoutryHint.innerHTML = "";
    CallsignHint.innerHTML = "";
}

function previousHint(){
    IcaoHint.innerHTML = IcaoCallsigns[currentCallsignIndex - 1].icaoc;
    CallsignHint.innerHTML = IcaoCallsigns[currentCallsignIndex - 1].calls;
    CoutryHint.innerHTML = IcaoCallsigns[currentCallsignIndex - 1].contry;
}

function hint(){
    IcaoHint.innerHTML = IcaoCallsigns[currentCallsignIndex].icaoc;
    CallsignHint.innerHTML = IcaoCallsigns[currentCallsignIndex].calls;
    CoutryHint.innerHTML = IcaoCallsigns[currentCallsignIndex].contry;
    CoutryHint.style.backgroundColor = "white";
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

function checkCountry() {
    if(countryName.toLowerCase() === IcaoCallsigns[currentCallsignIndex - 1].contry.toLowerCase()){
        return true;
    }
    else{
        return false;
    } 
}

function done(){
    alert("done");
    currentCallsignIndex = 0;
    showCalls();
}