$(function () {
  $('.toggle > input[type="submit"]').click(function () {
    if ($('#user-toggle').find(":selected").text() == 'Student') {
      // If Student Login
      window.location.href= 'student/index.html';
    } else {
      // If Guidance Login
      window.location.href = 'guidance/dashboard.html';
    } 
  });

  $('#new-student').submit(function (e) {
    console.log("yo")
  });

  // add more code here
});