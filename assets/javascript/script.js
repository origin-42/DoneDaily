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

// Check the time
let currentTime = "";
// Set data to load on call
const renderTime = () => {
    $("#Timeslots").empty();

    // Render Time on Page Load
    let currentDaySellected = getDay();

    hoursAvailable().forEach(element => {
        // Create a unique id to prepend to each input and button element
        let ids = `${currentDaySellected}${element.replace(/ /g, '')}`
        
        // Create variables to render
        let tr = $(`<tr id="${ids}_tr">`);
        let tdRow = $(`<td scope="row">`).text(element);
        // Add stored Event for Input
        let inputItem = $(`<input id="${ids}_input" class="eventInput" type="text" placeholder="Derps">`);
        inputItem.val(localStorage.getItem(`${ids}_storedEvent`));
        let tdCol = $(`<td colspan="8">`).append(inputItem);
        let button = $(`<button id="${ids}_button" type="button" class="btn btn-primary .saveBtn"><i class="fa-solid fa-floppy-disk fa-x2"></i></button>`);

        // Add tags to page
        tr.append(tdRow);
        tr.append(tdCol);
        tr.append(button);
        $("#Timeslots").append(tr);


        // Create a unique event listener for each button
        $(`#${ids}_button`).on('click', function () {
            // Capture input value
            let dataInput = $(`#${ids}_input`);
            // Save input value to localStorage
            localStorage.setItem(`${ids}_storedEvent`, dataInput.val());
        })

    });
}

// Event listeners 
calenderDateInput.on('change', renderTime);

// Function calls
setInterval(setTime, 1000);
// change colors every time the hour passes.




