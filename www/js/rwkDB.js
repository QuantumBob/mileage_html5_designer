/*jslint browser:true, devel:true, white:true, vars:true */
<<<<<<< HEAD
/*global $:false, intel:false*/

var db;
var mileageData;

//initialize the database
function initDb(){

    db=null;
    mileageData=null;
    db = window.sqlitePlugin.openDatabase({name:'mileage.db', location:'default'});
}
=======
/*global $:false, intel:false,
initCharts*/

var db;
//window.internalData = {"labels": [], "datasets": [{"label": null, "backgroundColor": null, "data": []}], "options": {}};

//initialize the database.
// Can we use db = $(document).SQLitePlugin.openDatabase...?
function initDb(){
    db=null;

    db = window.sqlitePlugin.openDatabase({name:'mileage.db', location:'default'},
                                          function(db){
        // code goes here...
    },
                                          function(err){
        window.alert( 'Open database ERROR: ' + JSON.stringify(err));
    });
    if(!db){
        console.log("db=" + db);
    }
}//end of initDb
>>>>>>> first commit after init
//populate database with test values
function addTestData(){
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS tblMileage');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tblMileage (date, start_miles, end_miles, fuel_bought, price_unit, mileage)');
        tx.executeSql('INSERT INTO tblMileage VALUES (?,?,?,?,?,?)', ["2016-01-01", 200, 300, 38, 1.2, 3.16]);
    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Test data added OK');
        writeRecordCount();
    });
}
//add current mileage values to table:tblMileage
function addEntrytoTable(){
<<<<<<< HEAD
=======
    console.log("in addEntryToTable");
>>>>>>> first commit after init
    var inDate = $("#miles_date").val(), inStart_Miles = $("#start_miles").val(), inEndMiles = $("#end_miles").val(),
        inFuel_Bought = $("#fuel_bought").val(), inPrice_Unit = $("#price_unit").val(), inMileage = $("#result").text();

    console.log("in values: " + inDate + "," + inStart_Miles + ","  + inFuel_Bought + ","  + inPrice_Unit + "," + inMileage);

    if(!inDate || !inStart_Miles || !inFuel_Bought || !inPrice_Unit || !inMileage){
        console.log("Some input value is null");
<<<<<<< HEAD
=======
        writeRecordCount();
>>>>>>> first commit after init
        return false;
    }

    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS tblMileage (date, start_miles, end_miles, fuel_bought, price_unit, mileage)');
        tx.executeSql('INSERT INTO tblMileage VALUES (?,?,?,?,?,?)', [inDate, inStart_Miles, inEndMiles, inFuel_Bought, inPrice_Unit, inMileage]);
    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Populated database OK');
        writeRecordCount();
    });
}
// write to console to check everything worked
function writeRecordCount(){
    "use strict";

    db.transaction(function(tx) {
        tx.executeSql('SELECT count(*) AS mycount FROM tblMileage', [], function(tx, rs) {
            console.log('Record count : ' + rs.rows.item(0).mycount);
        }, function(tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    });
}
// delete all entries in the database
function depopulateTable(){
    "use strict";
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS tblMileage');
    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Depopulated table OK');
    });
}
<<<<<<< HEAD
// read the database for all reacords
function readMileageTable(callback){
    "use strict";

    var internalData = {
        "labels": [],
        "datasets": [
            {
                "label": "Mileage",
                "backgroundColor": "rgba(150, 50, 180, 0.4)",
                "data": []
            }
        ],
        "options": {

        }
    };
    var query = "SELECT date, mileage FROM tblMileage ORDER BY date ASC";

=======
// read the database for mileage reacords
function readDb(query, callback, passthru){
    "use strict";

>>>>>>> first commit after init
    db.transaction(function(tx){

        tx.executeSql(query, [], function(tx, resultSet){

<<<<<<< HEAD
            console.log("in execSQL");

            if (resultSet.rows && resultSet.rows.length){
                for (var i=0; i< resultSet.rows.length; i++){
                    internalData.labels.push(resultSet.rows.item(i).date);
                    internalData.datasets[0].data.push(resultSet.rows.item(i).mileage);
                }
            }
            if (typeof(callback) == 'function'){
                callback(internalData);
            }
=======
            if (resultSet.rows && resultSet.rows.length){
                if (typeof(callback) == 'function'){
                    callback(resultSet, passthru);
                }
            }

>>>>>>> first commit after init
        }, function (tx, error) {
            console.log('SELECT error: ' + error.message);
            });
        });
}


