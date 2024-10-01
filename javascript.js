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
        currentCallsignIndex += 1;
        showCalls();
    }
    else{
        alert("not good");
    }
}

function skip(){
    currentCallsignIndex += 1;
    showCalls();
}

function check(){
    const Callsign = document.getElementById("Callsign");
    const ICAOcode = document.getElementById("ICAOcode");
    const currentCallsign = IcaoCallsigns[currentCallsignIndex];

    //const isCallsignCorrect = 

    if(mode === "basic"){
        if(currentCallsign.calls === Callsign.value){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        if(currentCallsign.icaoc === ICAOcode.value){
            return true;
        }
        else{
            return false;
        }
    }
}