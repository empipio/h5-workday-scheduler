//gets todays date from moment and renders to page
var today = moment();
$("#currentDay").text(today.format("MMM Do, YYYY"));

//used in clearScreen function and for dayPlan variable
var todaysDate = moment();

function colourTimeBlocks() {
  //get current hour and data index of time block hour
  var currentHour = moment().hour();
  var timeBlockHours = $(".time-block");

  for (var i = 0; i < timeBlockHours.length; i++) {
    var currentTimeBlock = $(timeBlockHours[i]).attr("data-index");
    //compare data index of time block to current hour and add class accordingly to change time block colour
    if (currentHour == currentTimeBlock) {
      $(timeBlockHours[i]).addClass("present");
    } else if (currentHour < currentTimeBlock) {
      $(timeBlockHours[i]).addClass("future");
    } else if (currentHour > currentTimeBlock) {
      $(timeBlockHours[i]).addClass("past");
    }
  }
}

//empty array in which to store saved tasks
var tasks = [];

function saveTask() {
  //gets data index of parent block to save according to which save button clicked
  var timeBlockHour = $(this).parent().attr("data-index");
  //traverse DOM to navigate to text area where text has been entered
  var textArea = $(this).parent().children().eq(1);
  var textToSave = textArea.val();
  //save data index of time block and text in the text area as an object
  var task = { hour: timeBlockHour, plan: textToSave };

  //push task into tasks array
  tasks.push(task);
  //dayPlan adds in today's date in order to assess when day changes later on
  var dayPlan = {
    date: todaysDate,
    tasks: tasks,
  };
  //saves dayPlan to local storage
  localStorage.setItem("dayPlan", JSON.stringify(dayPlan));
}

function renderTasks() {
  // go through each task, get each task data and time
  for (var j = 0; j < tasks.length; j++) {
    var task = tasks[j];
    var timeBlockHourElements = $(".time-block");
    //Get data index for each timeblock
    timeBlockHourElements.each(function () {
      var timeBlockHour = $(this).data("index");
      //convert data indices to string in order to compare with task.hour
      var timeBlockHourString = timeBlockHour.toString();
      //if data index and task.hour match then fill that text area with text saved in local storage
      if (timeBlockHourString === task.hour) {
        var fillText = $(this).children().eq(1);
        fillText.html(task.plan);
      }
    });
  }
}

function init() {
  //get info from local storage
  var dayPlan = JSON.parse(localStorage.getItem("dayPlan"));

  if (dayPlan !== null) {
    tasks = dayPlan.tasks;
  }

  renderTasks();
}

//clears local storage and reloads page when date changes
function clearScreen() {
  var dayPlan = JSON.parse(localStorage.getItem("dayPlan"));

  if (dayPlan) {
    var dayPlanDate = moment(dayPlan.date);

    if (dayPlanDate.isBefore(todaysDate, "day")) {
      localStorage.clear();
      location.reload();
    } else {
      return;
    }
  }
}

colourTimeBlocks();
init();
clearScreen();

//event listener to check for clicks on save buttons, when clicked saveTask function triggered
var button = $(".saveBtn");
button.on("click", saveTask);
