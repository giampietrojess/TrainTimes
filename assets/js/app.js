// Document Ready on Page Load
$(document).ready(function () {  

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0VF3hGCz6rnW1ZzIBQEQr9tGV8fUAzMs",
    authDomain: "train-times-39021.firebaseapp.com",
    databaseURL: "https://train-times-39021.firebaseio.com",
    projectId: "train-times-39021",
    storageBucket: "",
    messagingSenderId: "243609837543"
  };
    firebase.initializeApp(config);

  var database = firebase.database();

  // Submit Button On Click
  $("#addTrain").on("click", function (event) {
    event.preventDefault();

  // Declare variables from user input values
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var trainTime = $("#trainTime").val().trim();
  var frequency = $("#frequency").val().trim();

  // Push those user input variables to the database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  });
});

// Firebase function for when new trains are added
database.ref().on("child_added", function (childSnapshot) {

  // Declare new train variables
  var newTrain = childSnapshot.val().trainName;
  var newLocation = childSnapshot.val().destination;
  var newFirstTrain = childSnapshot.val().trainTime;
  var newFreq = childSnapshot.val().frequency;

  // First Time (converted to be one year previously to ensure before current time)
  var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(startTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % newFreq;

  // Minutes Until Train
  var tMinutesTillTrain = newFreq - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var catchTrain = moment(nextTrain).format("HH:mm");

  // Append new train information to the DOM with basic table styling
  $("#all-display").append(
    ' <tr><td>' + newTrain +
    ' </td><td>' + newLocation +
    ' </td><td>' + newFreq +
    ' </td><td>' + catchTrain +
    ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

  // Clears user input
  $("#trainName, #destination, #trainTime, #frequency").val("");
  return false;
},

  //Handle the errors
  function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


  $(document).ready(function(){
    $("button").click(function(){
        $("#testTable").toggle();
    });
});



}); //end document ready