$(document).ready(function () {
   
        // initialize firebase
        var config = {
            apiKey: "AIzaSyDOmtdX2B1KWayUv8IrL4Gt5z4j4_Vk4_M",
            authDomain: "train-scheduler-315ed.firebaseapp.com",
            databaseURL: "https://train-scheduler-315ed.firebaseio.com",
            projectId: "train-scheduler-315ed",
            storageBucket: "train-scheduler-315ed.appspot.com",
            messagingSenderId: "86375747096"
          };
          firebase.initializeApp(config);


    // Initialize Firebase
    firebase.initializeApp(config);
    // a var to represent the database
    var database = firebase.database();


    // button to submit the user given info
$("#trainInfoBtn").on("click", function(event){
     //no button reset
    event.preventDefault();
    

	//creating variables for each value
    var name = $("#name").val().trim();
    
    var destination = $("#destination").val().trim();
    
    var time = moment($("#time").val().trim(), "hh:mm").subtract(1, "years").format("X");
    
	var frequency = $("#frequency").val().trim();
    
    //variable for current time from moment
	var currentTime = moment();
    console.log("CURRENT TIME:" + moment(currentTime).format("hh:mm"));
    //new train info
    var newTrain ={
        train: name,
        trainGoing: destination,
        trainComing: time,
        everyXMin: frequency,
    };


    database.ref().push(newTrain);

    //clears element before new text is added
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");

    //prevents page from refreshing everytime
    return false;

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var newName = childSnapshot.val().train;
    var destination =childSnapshot.val().trainGoing;
    var time = childSnapshot.val().trainComing;
    var frequency = childSnapshot.val().everyXMin;


    
//makes first train time neater
var trainTime = moment.unix(time).format("hh:mm");
//calculate difference between times
var difference =  moment().diff(moment(trainTime),"minutes");

//time apart(remainder)
var trainRemain = difference % frequency;

//minutes until arrival
var minUntil = frequency - trainRemain;

//next arrival time
var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

//adding info to DOM table 
$("#trainTable > tbody").append("<tr><td>" + newName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");






});


});