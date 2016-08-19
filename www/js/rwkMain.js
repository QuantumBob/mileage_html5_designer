/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, mileage_data:true, intel:false, Chart:false */

// quick test function
function test(inText){
    $('#test').text(inText);
}
//calculate todays date and return it
function todaysDate() {
    "use strict";

    var date = new Date(), day = date.getDate(), month = date.getMonth() + 1,
        year = date.getFullYear(), today;

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }

    today = year + "-" + month + "-" + day;
    return today;
}
// Set the date field
function setDate(inDate){

    if(inDate == "today"){
        var myDate = todaysDate();

        $("#miles_date").val(myDate);
    }
}
// calculate the mileage on the fly as each value is inputed
function calcMileage() {
    "use strict";

    var result_label = document.getElementById("result"),
        s_miles = document.getElementById("start_miles"),
        e_miles = document.getElementById("end_miles"),
        fuel_bought = document.getElementById("fuel_bought"),
        price_unit = document.getElementById("price_unit"),
        convertion = 1.00,
        mileage;

    if (s_miles === null || e_miles === null || fuel_bought === null || price_unit === null) {
        console.log("calcMiles: All inputs are null");
        return;
    }

    if (document.getElementById("units").value !== 'litres'){
        convertion = 0.219;
    }

    if (e_miles.value === ""){
        //mileage = s_miles.value / (fuel_bought.value / (price_unit.value/convertion));
        mileage = (s_miles.value * price_unit.value ) / (fuel_bought.value * convertion);
    }
    else{
        //mileage = (e_miles.value - s_miles.value) / (fuel_bought.value / (price_unit.value/convertion));
        mileage = ((e_miles.value - s_miles.value) * price_unit.value ) / (fuel_bought.value * convertion);
    }
    result_label.textContent = mileage.toFixed(2);
}
// change the units from gallons to litres or back
function changeUnits(inElement) {

    var toggle = document.querySelector('#mpu');
    var label = document.querySelector('label[for="price_unit"]');

    if (inElement.value === 'litres'){
        label.textContent = 'Price per gallon';
        toggle.textContent = "mpg";
        inElement.value = 'gallons';
    }
    else{
        label.textContent = 'Price per litre';
        toggle.textContent = "mpl";
        inElement.value = 'litres';
    }

    if (document.getElementById("result").textContent !== ""){
        calcMileage();
    }
}
// hook up event handlers
function register_event_handlers(){

    // button  #commit
    $(document).on("click", "#btnCommit", function(evt){

        addEntrytoTable();
        updateCharts();
        return false;
    });
    // units toggle
    $(document).on("change", "#units", function(evt){

        changeUnits(this);
        addTestData();
    });
    // input event for text inputs
    $(document).on("input", ".calc-miles", function(evt){
        console.log("calc-miles event fired");
        calcMileage();
    });
    // back button
    $(document).on("backbutton", function(evt){

        navigator.app.exitApp();
    });
}
//initialise the test canvas
function initTestCanvas(){

    var canvas = document.getElementById('test-canvas');
    if(canvas !== null){
        var ctx = canvas.getContext('2d');

        var data = {
            "labels": [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June"
            ],
            "datasets": [
                {
                    "fillColor": "rgba(172,194,132,0.4)",
                    "strokeColor": "#ACC26D",
                    "pointColor": "#fff",
                    "pointStrokeColor": "#9DB86D",
                    "data": [
                        203,
                        156,
                        99,
                        251,
                        305,
                        247
                    ]
                }
            ]
        };
        var chart = new Chart(ctx, {
            type:'bar',
            data: data
        });
    }
}
//update chart
function updateCharts(){
    readDb(function(inData){

        if (inData){
            //mileage_data = inData;
            for(var i=0; i<mileage_data.labels.length; i++){
                console.log("data.labels[" + i + "]:" + mileage_data.labels[i]);
                console.log("data.mileage[" + i + "]:" + mileage_data.datasets[0].data[i]);
            }
            initCharts(inData);
        }
        else{
             console.log("data: Not yet!");
        }
    });
}
// initialize the app
function initApp(){

    register_event_handlers();
    setDate("today");
    initDb();
    updateCharts();
    initTestCanvas();
}
// Auto run this function at startup when script loads
(function(){
"use strict";

    // Call this automatically when the script loads at startup
    document.addEventListener("deviceready", initApp, false);

})();
