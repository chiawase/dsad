$(function () {
  $('.button').click(function () {
    if ($('#user-toggle').find(":selected").text() == 'Student') {
      // If Student Login
      window.location.href= 'student/index.html';
    } else {
      // If Guidance Login
      window.location.href = 'guidance/database.html';
    } 
  });
});