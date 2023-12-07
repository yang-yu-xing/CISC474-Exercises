$(document).ready(function() {
    console.log("ready!");

    $("#go").click( function (event) {
        event.preventDefault();
        var firstName = $("#fname").val();
        var lastName = $("#lname").val();
        $("#jumbotron").text(firstName + ' ' + lastName);
    });

});