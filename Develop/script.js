// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner THEN the current day is displayed at the top of the calendar

// WHEN I scroll down THEN I am presented with timeblocks for standard business hours

// WHEN I view the timeblocks for that day THEN each timeblock is color coded to indicate whether it is in the past, present, or future

// WHEN I click into a timeblock THEN I can enter an event

// WHEN I click the save button for that timeblock THEN the text for that event is saved in local storage

// WHEN I refresh the page THEN the saved events persist

//add in date using moment /
//add in timeblocks using bootstrap /
//input fields in timeblocks-text area? /

//use moment to determine past, present or future for each block and colour code appropriately
//for loop/set attribute?
//loop through blocks, need to give blocks id?

//save events in local storage, clear them overnight
//when page refreshed local storage items retrieved?

//add event listener to save buttons
//clear storage when date changes

var today = moment();
$("#currentDay").text(today.format("MMM Do, YYYY"));

function colourTimeBlocks() {
  //this works but present hour is white not red?
  var currentHour = moment().hour();
  var timeBlockHours = $(".time-block");
  for (var i = 0; i < timeBlockHours.length; i++) {
    var currentTimeBlock = $(timeBlockHours[i]).attr("data-index");
    if (currentHour === currentTimeBlock) {
      $(timeBlockHours[i]).addClass("present");
    } else if (currentHour < currentTimeBlock) {
      $(timeBlockHours[i]).addClass("future");
    } else if (currentHour > currentTimeBlock) {
      $(timeBlockHours[i]).addClass("past");
    }
  }
}

colourTimeBlocks();
