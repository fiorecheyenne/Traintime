$(document).ready(function () {
    var database = firebase.database();
    var name = '';
    var dest = '';
    var freq = 0;
    var arriv = 0;
    var minAwy = 0;

    $("#submit").on("click", function (event) {
        event.preventDefault();

        name = $("#train-name-input").val().trim();
        dest = $("#destination-input").val().trim();
        freq = $("#frequency-input").val().trim();
        arriv = $("#arrival-input").val().trim();

        database.ref().push({
            name: name,
            dest: dest,
            freq: freq,
            arriv: arriv
        });
        database.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().dest);
            console.log(childSnapshot.val().freq);
            console.log(childSnapshot.val().arriv);
        });

        var initTime = arriv;
        var initTimeConvert = moment(initTime, ""
    })
});