
$(function () {
 // used day.js to get current hour and saved to const "currentHour"
 const currentHour = dayjs().format('HH');
 // Convert dom element class .time-block to a jqery object / used .each to loop through each .time-block element while applying a toggleClass
   function hourlyColor() {
     $('.time-block').each(function() {
       const blockHour = Number(this.id);
       $(this).toggleClass('past', blockHour < currentHour);
       $(this).toggleClass('present', blockHour === currentHour);
       $(this).toggleClass('future', blockHour > currentHour);
     });
   }
 // function to save user input with jqery eventlistener
   function plannerEntry() {
     $('.saveBtn').on('click', function() {
       const key = $(this).parent().attr('id');
       const value = $(this).siblings('.description').val();
       localStorage.setItem(key, value);
     });
   }
  // loops through each .time-block and changes the background color depending on the current time using if/else statements
   function plannerColor() {
     $('.time-block').each(function() {
       const blockHour = Number(this.id);
       if (blockHour == currentHour) {
         $(this).removeClass('past future').addClass('present');
       } else if (blockHour < currentHour) {
         $(this).removeClass('future present').addClass('past');
       } else {
         $(this).removeClass('past present').addClass('future');
       }
     });
   }
   // loops through each time-block-id and sets text area from user input
   $('.time-block').each(function() {
     const key = $(this).attr('id');
     const value = localStorage.getItem(key);
     $(this).children('.description').val(value);
   });

  // function to display time in header using day.js with setinterval to refresh time every second
   function updateTime(){
    var currentTime = dayjs().format('dddd, MMMM D YYYY, h:mm:ss a');
    $('#currentDay').text(currentTime);
  };
  
  setInterval(updateTime, 1000);
  
  hourlyColor();
  plannerEntry();          
  plannerColor();
 
  
});
