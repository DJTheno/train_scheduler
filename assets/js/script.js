$(document).ready(function () {

    // initialize firebase
    var config = {
        apiKey: "AIzaSyDaClTBNEZc_5UR57EPW9zWcb-VuLKVc14",
        authDomain: "trainsched2.firebaseapp.com",
        databaseURL: "https://trainsched2.firebaseio.com",
        projectId: "trainsched2",
        storageBucket: "trainsched2.appspot.com",
        messagingSenderId: "709314067728"
    };


    // Initialize Firebase
    firebase.initializeApp(config);

    
    // a var to represent the database
    var database = firebase.database();


    // button to submit the user given info
    $("#trainInfoBtn").on("click", function (event) {
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

        database.ref().push({
            train: name,
            trainGoing: destination,
            trainComing: time,
            everyXMin: frequency,
        });

        //clears element before new text is added
        $("#name").val("");
        $("#destination").val("");
        $("#time").val("");
        $("#frequency").val("");

        //prevents page from refreshing everytime
        return false;

    });

    database.ref().on("child_added", function (childSnapshot, ) {
        var newName = childSnapshot.val().train;
        var destination = childSnapshot.val().trainGoing;
        var time = childSnapshot.val().trainComing;
        var frequency = childSnapshot.val().everyXMin;
        console.log (newName,destination,time,frequency)


        //makes first train time neater
        var trainTime = moment.unix(time).format("hh:mm");
        //calculate difference between times
        var difference = moment().diff(moment(trainTime), "minutes");

        //time apart(remainder)
        var trainRemain = difference % frequency;

        //minutes until arrival
        var minUntil = frequency - trainRemain;

        //next arrival time
        var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

        //adding info to DOM table 
        $("tbody").append("<tr><td>" + newName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

        console.log($("tbody"))




    });


});