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
var currentTime = moment();

//Add Train Information
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

var trainName = $("#train-input").val().trim();
var trainDest = $("#destination-input").val().trim();
var trainTime = $("#time-input").val().trim();
var trainFreq = $("#frequency-input").val().trim();

var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainTime,
    frequency: trainFreq
};

database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.start);
console.log(newTrain.frequency);

$("#train-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");
});

