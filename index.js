// Initialize Firebase
var config = {
    apiKey: "AIzaSyA5fpUYAH8hZVL7_zIjrLMF6iPDkljgqP8",
    authDomain: "rpsls-multiplayer-jswc.firebaseapp.com",
    databaseURL: "https://rpsls-multiplayer-jswc.firebaseio.com",
    projectId: "rpsls-multiplayer-jswc",
    storageBucket: "rpsls-multiplayer-jswc.appspot.com",
    messagingSenderId: "355529598401"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";
var first = "";
var firstConverted = "";
var currentTime = "";
var tMinutesTillTrain = "";
var nextTrain = "";



$(".btn").on("click", function () {
    
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    first = $("#first").val().trim();
    console.log(first);

    

   
    firstConverted = moment(first, "HH:mm").subtract(1, "years");
    console.log(firstConverted);

   currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    
    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        first: first,
        currentTime: moment(currentTime).format("hh:mm"),
        tMinutesTillTrain: tMinutesTillTrain,
        nextTrain: moment(nextTrain).format("hh:mm"),
    });
    $("#name").val("");
    $("#destination").val("") ;
    $("#frequency").val("");
    $("#first").val("");
    
});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot)
    
    var newRow = $("<tr></tr>");

    var train = $("<td></td>");
    train.text(childSnapshot.val().name);
    $(newRow).append(train);
    console.log(childSnapshot.val().name);
   
    var dest = $("<td></td>");
    dest.text(childSnapshot.val().destination);
    $(newRow).append(dest);
    console.log(childSnapshot.val().destination);

    var freq = $("<td></td>");
    freq.text(childSnapshot.val().frequency);
    $(newRow).append(freq);
    console.log(childSnapshot.val().frequency);

    var next = $("<td></td>");
    next.text(childSnapshot.val().nextTrain);
    $(newRow).append(next);
    console.log(childSnapshot.val().nextTrain);

    var min = $("<td></td>");
    min.text(childSnapshot.val().tMinutesTillTrain);
    $(newRow).append(min);
    console.log(childSnapshot.val().tMinutesTillTrain);


    $(".schedule").append(newRow);

})

