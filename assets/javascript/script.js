// Global variables
const calenderDateInput = $( "#datepicker" );

// Create array for time to render to page.
const hoursAvailable = () => {
    const items = [];
    for (let i = 0; i < 24; i++) {
        if (i === 0) {
            items.push(`12 AM`);
        } else if (i < 12) {
            items.push(`${i} AM`);
        } else if (i === 12) {
            items.push(`12 PM`);
        } else {
            items.push(`${i - 12} PM`);
        }
    }
    return items;
}

// Set clock on page with date
let time = $("#dateAndTime");
time.text(moment().format('dddd MMMM Do YYYY, h:mm:ss a'));
let theTime = moment().format('MMMM Do YYYY, h:mm:ss a');
const setTime = () => {
    time.text(moment().format('dddd MMMM Do YYYY, h:mm:ss a'));
    theTime = moment().format('MMMM Do YYYY, h:mm:ss a');
}

// Pick a calender day to add event too
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

// Set data to load on call
const renderTime = () => {

    // Replace current day
    $("#Timeslots").empty();

    // Get day selected
    let currentDaySellected = getDay();

    hoursAvailable().forEach(element => {
        // Create a unique id to prepend to each input and button element
        let ids = `${currentDaySellected}${element.replace(/ /g, '')}`
        
        // Create variables to render
        let tr = $(`<tr id="${ids}_tr">`);
        let tdRow = $(`<td id="${ids}_time" class="tableTime" scope="row">`).text(element);
        // Add stored Event for Input
        let inputItem = $(`<input id="${ids}_input" class="eventInput form-control" type="text">`);
        inputItem.val(localStorage.getItem(`${ids}_storedEvent`));
        let tdCol = $(`<td colspan="12" class="inputContainer">`).append(inputItem);
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


// Change colors depending on current time.
const colorCode = (day) => {
   
    // Grab formatting
    let hour = `${moment(day, "MMMM Do YYYY, h:mm:ss a").format(`h A`)}`;

    // Grab class array of times rendered
    let tableTimeHours = $(`.tableTime`).map(function () {
        return $(this).attr('id');
    })
    for (let i = 0; i < tableTimeHours.length; i++) {

        // Change each index to suit day format
        let trim = tableTimeHours[i].replace("_time", "");

        // Format for testing
        let currentHour = `${moment(day, "MMMM Do YYYY, h:mm:ss a").format(`HH`)}`;
        let currentDay = `${moment(day, "MMMM Do YYYY, h:mm:ss a").format(`D`)}`;
        let currentMonth = `${moment(day, "MMMM Do YYYY, h:mm:ss a").format(`M`)}`;
        let currentYear = `${moment(day, "MMMM Do YYYY, h:mm:ss a").format(`Y`)}`;
        
        let selectedHour = moment(trim, 'MMDDYYYYhA').format('HH');
        let selectedDay = moment(trim, 'MMDDYYYYhA').format('D');
        let selectedMonth = moment(trim, 'MMDDYYYYhA').format('M');
        let selectedYear = moment(trim, 'MMDDYYYYhA').format('Y');
        
        hour = `${moment(day, "MMMM Do YYYY, h:mm:ss a").format(`HH`)}`;
        
        // Set style
        $(`#${tableTimeHours[i]}`).css({'border-right': '1px solid black'});
        $(`#${tableTimeHours[i]}`).siblings('.saveBtn').css({'border-radius': '0 0 20px 20px'});
        
        // If current iteration is equal on all values
        if (selectedHour === currentHour && selectedDay === currentDay && currentMonth === selectedMonth && currentYear === selectedYear) {
            // Make red to indicate current hour
            $(`#${tableTimeHours[i]}`).siblings('.inputContainer').attr('data-currentTime', 'present');

            // If current iteration is less on all values
        } else if (selectedHour < currentHour && selectedDay <= currentDay && currentMonth <= selectedMonth && currentYear <= selectedYear) {
            
            // Make gray to indicate time lapse
            $(`#${tableTimeHours[i]}`).siblings('.inputContainer').attr('data-currentTime', 'past');

            // If current iteration is more on all values
        } else if (selectedHour > currentHour && selectedDay >= currentDay && currentMonth >= selectedMonth && currentYear >= selectedYear) {

            // Make green to indicate available time
            $(`#${tableTimeHours[i]}`).siblings('.inputContainer').attr('data-currentTime', 'future');

            // check to see if day has lapsed
        } else if (selectedDay < currentDay) {

            $(`#${tableTimeHours[i]}`).siblings('.inputContainer').attr('data-currentTime', 'past');

            // Check to see if day is coming
        } else if (selectedDay > currentDay) {

            $(`#${tableTimeHours[i]}`).siblings('.inputContainer').attr('data-currentTime', 'future');

        }
        
    }
}

// Event listeners 
calenderDateInput.on('change', renderTime);

// Function calls
setInterval(function() {
    setTime();
    colorCode(theTime);
}, 1000);




