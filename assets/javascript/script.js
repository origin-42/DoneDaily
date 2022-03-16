// Global Variables
const calenderDateInput = $( "#datepicker" );

// Get available hours
const hoursAvailable = () => {
    const items = [];
    for (let i = 1; i < 25; i++) {
        if (i < 13) {
            items.push(`${i} AM`);
        } else {
            items.push(`${i - 12} PM`);
        }
    }
    return items;
}

// Time Interval
let time = $("#dateAndTime");
time.text(moment().format('dddd MMMM Do YYYY, h:mm:ss a'));
const setTime = () => {
    time.text(moment().format('dddd MMMM Do YYYY, h:mm:ss a'));
}


// Pick a Day
$( function() {
    $( "#datepicker" ).datepicker({
      showOtherMonths: true,
      selectOtherMonths: true
    });
});

// Get Calendar Day Selected
const getDay = () => {
    // Get clicked calendar date.
    let daySelected = calenderDateInput.val().replace(/\//g, '');

    return daySelected;
}

let currentTime = "";
// Render Time
const renderTime = () => {
    $("#Timeslots").empty();

    hoursAvailable().forEach(element => {
        let tr = $(`<tr id="${trim(element)}_tr">`);
        let tdRow = $(`<td scope="row">`);
        let tdCol = $(`<td id="${trim(element)}_input" colspan="8">`);
        let button = $(`<button id="${trim(element)}_button" type="button" class="btn btn-primary .saveBtn"><i class="fa-solid fa-floppy-disk fa-x2"></i></button>`);

        let inputfield = $(`${trim(element)}_input`);
        $(`#${trim(element)}_button`).on('click', function () {
            let dataInput = $(inputfield);

            // Save input

        })

        // Add if to check if time is less than current time (hour), the same as or greater
        let currentHour = new Date().getHours();
        let 
        if (times)
        $("#Timeslots").append(tr.text(element))
    });
}

// Save Event


// Render Event


// Event listeners 
calenderDateInput.on('change', getDay);

// Function calls
setInterval(setTime, 1000);
// change colors every time the hour passes.
