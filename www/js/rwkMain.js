/*jslint browser:true, devel:true, white:true, vars:true */
<<<<<<< HEAD
/*global $:false, mileageData:true, intel:false, Chart:false,
addEntrytoTable, addTestData, readMileageTable, initCharts, initDb*/
=======
/*global $:false, mileage_data:true, intel:false, Chart:false,
addEntrytoTable, addTestData, readDb, initCharts, initDb, createChart, findChart,
writeRecordCount*/
>>>>>>> first commit after init

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
<<<<<<< HEAD
// hook up event handlers
function register_event_handlers(){

=======
// takes an object and in
function populateInputFields(inputs){

}
// mileage datum callback
function mileageDatumCB(resultSet, passthru){

    console.log("there are " + resultSet.rows.length + " rows. Result date: " + resultSet.rows.item(0).date);

    for (var i=0; i< resultSet.rows.length; i++){
        for (var prop in resultSet.rows.item(i))
        console.log("resultSet.rows.item(i)." + prop + " = " + resultSet.rows.item(i)[prop]);

        //var inputElement = document.getElementById("resultSet.rows.item(i)." + prop);
        //inputElement.textContent = resultSet.rows.item(i)[prop];
        $("resultSet.rows.item(i)." + prop).val(resultSet.rows.item(i)[prop]);
    }


}
// get one record from mileage table
function mileageDatum(label){
    var passthru = [label];
    var sqlString = "SELECT * FROM tblMileage WHERE date='" + label + "'";

    readDb(sqlString, mileageDatumCB, passthru);
}
// what to do when a chart is clicked
function onChartClicked(evt){

    var chartObject = findChart($(evt.target));

    var activePoints = chartObject.chartRef.getElementsAtEvent(evt);

    if(activePoints.length > 0){
        $("#btn-grp-Edit").slideDown();
        //get the internal index of slice in pie chart
        var clickedElementIndex = activePoints[0]._index;

        //get specific label by index
        var label = chartObject.chartRef.data.labels[clickedElementIndex];
        console.log("label: " + label);

        mileageDatum(label);

        //get value by index
        //var value = chartObject.chartRef.data.datasets[0].data[clickedElementIndex];

        /* other stuff that requires slice's label and value */
    }
}
// clears all input fields
function clearInputs(){

    $("#start_miles").val("");
    $("#end_miles").val("");
    $("#fuel_bought").val("");
    $("#price_unit").val("");

    $("#result").text("");
}
// hook up event handlers
function register_event_handlers(){

    // edit button
    $(document).on("click", "#btnEdit", function(evt){
        console.log("edit button");
    });
    // cancel button
    $(document).on("click", "#btnCancel", function(evt){
        $("#btn-grp-Edit").slideUp();
    });
    // delete button
    $(document).on("click", "#btnDelete", function(evt){});
>>>>>>> first commit after init
    // button  #commit
    $(document).on("click", "#btnCommit", function(evt){

        addEntrytoTable();
<<<<<<< HEAD
        updateCharts();
=======
        updateChart(window.chartDataArray.find(function(chart){

            return chart.id === 'mileage-chart';
        }));
        clearInputs();
        setDate("today");
        return false;
    });
    // button  #clear
    $(document).on("click", "#btnClear", function(evt){

        clearInputs();
        setDate("today");
>>>>>>> first commit after init
        return false;
    });
    // units toggle
    $(document).on("change", "#units", function(evt){

        changeUnits(this);
        addTestData();
<<<<<<< HEAD
=======
        updateChart(window.chartDataArray[window.chartDataArray.length -1]);
>>>>>>> first commit after init
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
<<<<<<< HEAD
function updateCharts(){
    readMileageTable(function(inData){

        if (inData){
            mileageData = inData;
            for(var i=0; i<mileageData.labels.length; i++){
                console.log("data.labels[" + i + "]:" + mileageData.labels[i]);
                console.log("data.mileage[" + i + "]:" + mileageData.datasets[0].data[i]);
            }
            initCharts(inData);
        }
        else{
             console.log("data: Not yet!");
        }
    });
=======
function updateChart(chartObject){

    console.log("in updateChart: " + chartObject.id + ", " + chartObject.chartRef);
    if (chartObject.chartRef){
        chartObject.chartRef.destroy();
        chartObject.chartRef=null;
        mileageData(chartObject);
    }
}
//formats date to DD MM YYYY
function formatDate(inDate){

    if(inDate.length === 10){
        var temp = inDate.split('-');
        temp.reverse();
        inDate = temp.join('-');
    }
    return inDate;
}
//mileage data callback function
function mileageDataCB(resultSet, passthru){

    var i = 0;

    var chartData = {labels: [], datasets: [{label: null, fill: null, backgroundColor: null, data: []}]};
    var chartOptions = {
        pan: {
            enabled: false,
            mode: 'xy'
        },
        zoom: {
            enabled: false,
            mode: 'xy'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: null
                    }
            }],
            xAxes: [{
                categoryPercentage: null,
                barPercentage: null
            }]
        }};

    chartData.datasets[0].label = "Mileage";
    chartData.datasets[0].fill = false;
    chartData.datasets[0].backgroundColor = "rgba(91, 206, 30, 0.4)";
    chartOptions.scales.yAxes[0].ticks.min = 0;
    chartOptions.scales.xAxes[0].categoryPercentage = 0.9;
    chartOptions.scales.xAxes[0].barPercentage = 0.2;
    //chartOptions.scales.yAxes[0].ticks.stepSize = 1;
    //chartOptions.scales.yAxes[0].scaleLabel.display = true;
    //chartOptions.scales.yAxes[0].gridLines.color = "rgba(255, 0, 0, 1)";

    var chartToUpdate = passthru[0];

    if(chartToUpdate){

        if (resultSet.rows && resultSet.rows.length){
            for (i=0; i< resultSet.rows.length; i++){

                chartData.labels.push(formatDate(resultSet.rows.item(i).date));
                chartData.datasets[0].data.push(resultSet.rows.item(i).mileage);
            }
        }
        createChart(chartToUpdate, chartData, chartOptions);
        console.log("in mileageDataCB: " + chartToUpdate.id + ", " + chartToUpdate.chartRef);
    }
    else{
        console.log("data: Not yet!");
    }
}
//mileage data retreival
function mileageData(chartObject){

    var passthru = [chartObject];
    var sqlString = "SELECT date, mileage FROM tblMileage ORDER BY date ASC";

    readDb(sqlString, mileageDataCB, passthru);
>>>>>>> first commit after init
}
// initialize the app
function initApp(){

<<<<<<< HEAD
    register_event_handlers();
    setDate("today");
    initDb();
    updateCharts();
    initTestCanvas();
=======
    $("#btn-grp-Edit").hide();
    register_event_handlers();
    setDate("today");
    initDb();
    writeRecordCount();
    //updateCharts();
    //initTestCanvas();
>>>>>>> first commit after init
}
// Auto run this function at startup when script loads
(function(){
"use strict";

    // Call this automatically when the script loads at startup
    document.addEventListener("deviceready", initApp, false);

})();
