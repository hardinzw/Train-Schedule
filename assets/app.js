//Initialize Firebase
var config = {
    apiKey: "AIzaSyC50syMNfiapcBp-bap4xVLgVsUWAYjx5Q",
    authDomain: "train-time-93e9b.firebaseapp.com",
    databaseURL: "https://train-time-93e9b.firebaseio.com",
    storageBucket: "train-time-93e9b.appspot.com",
    messagingSenderId: "926140960114",
};

firebase.initializeApp(config);

var database = firebase.database();

//Add Train Information
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

//Grab user input
var trainName = $("#train-input").val().trim();
var trainDest = $("#destination-input").val().trim();
var trainTime = $("#time-input").val().trim();
var trainFreq = $("#frequency-input").val().trim();

//Creates "temporary" objects
var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainTime,
    frequency: trainFreq
};

//Upload train data to database
database.ref().push(newTrain);

//Log input to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.start);
console.log(newTrain.frequency);

//clear input boxes
$("#train-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");
});

//Create Firebase event for adding employee to database and html table
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var trainTime = childSnapshot.val().start;
var trainFreq = childSnapshot.val().frequency;

console.log(trainName);
console.log(trainDest);
console.log(trainTime);
console.log(trainFreq);


//Time to be entered on entry form
var firstTime = 0;

var firstTimeConvert = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConvert);

//Current time
var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("HH:mm"));

//Difference between times
var timeDiff = moment().diff(moment(firstTimeConvert), "minutes");
    console.log("Difference in time: " + timeDiff);

//Frequency
var timeRemain = timeDiff % trainFreq;
    console.log(timeRemain);

//Minutes away
var minTilTrain = trainFreq - timeRemain;
    console.log("Minutes away: " + minTilTrain);

//Next arrival
var nextTrain = moment().add(minTilTrain, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));

//Create new rows
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(minTilTrain)
);
//Append rows to table
$("#train-table > tbody").append(newRow);
});

