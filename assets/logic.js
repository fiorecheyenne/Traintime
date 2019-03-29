$(document).ready(function () {
    var database = firebase.database();
    var currentTime = "";
    var chooName = '';
    var chooDest = '';
    var chooFreq = 0;
    var chooArriv = 0;
    var nxtChooChoo = 0;
    var diffTime = 0;
    var remTime = 0;
    var minAway = 0;
    var newChoo = {
        name: chooName,
        dest: chooDest,
        freq: chooFreq,
        first: chooArriv,
    }

    var firstChooChoo = "";

    $("#submit").on("click", function (event) {
        event.preventDefault();
        firstChooChoo = moment($("#arrival-input").val().trim(), "HH:mm").format("HH:mm");

        if (firstChooChoo !== 'Invalid date') {

            newChoo.name = $("#train-name-input").val().trim();
            newChoo.dest = $("#destination-input").val().trim();
            newChoo.freq = $("#frequency-input").val().trim();
            newChoo.first = firstChooChoo;
        } else {
            alert("Enter a valid CHOO CHOO TIME >:(");
            emptyInput();
        }


        database.ref().push(newChoo);
        emptyInput();
        return false;


    })

    function emptyInput() {
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
        $("#arrival-input").val("");
    }


    database.ref().on("child_added", function (Snapshot) {
        console.log(Snapshot.val().name);
        console.log(Snapshot.val().dest);
        console.log(Snapshot.val().freq);
        // console.log(childSnapshot.val().arriv);

        //If user enters time outside of military 
        if (firstChooChoo !== 'Invalid date') {
            chooName = Snapshot.val().name;
            chooDest = Snapshot.val().dest;
            chooArriv = moment(Snapshot.val().first, "HH:mm");
            chooFreq = Snapshot.val().freq;

            //chooArriv pushed back 
            var choochooConvoo = moment(chooArriv, "HH:mm").subtract(1, "years");

            currentTime = moment().format("HH:mm");
            console.log("Current time: " + currentTime);

            diffTime = moment().diff(moment(choochooConvoo), "minutes");
            // console.log("Time remaining: " + diffTime);

            remTime = diffTime % chooFreq;
            console.log("Remaining time: " + remTime);

            minAway = chooFreq - remTime;
            console.log(minAway);

            nxtChooChoo = moment().add(minAway, "minutes").format("HH:mm");
            console.log(nxtChooChoo);

            $("#table-rows").append("<tr><td>" + Snapshot.val().name + "</td>" +
                "<td>" + chooDest + "</td>" +
                "<td>" + chooFreq + "</td>" +
                "<td>" + nxtChooChoo + "</td>" +
                "<td>" + minAway + "</td></tr>");
        }
    });
})
    // });
