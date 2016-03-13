$(function () {
  $('.toggle > input[type="submit"]').click(function () {
    if ($('#user-toggle').find(":selected").text() == 'Student') {
      // If Student Login
      window.location.href= 'student/login.html';
    } else {
      // If Guidance Login
      window.location.href = 'guidance/dashboard.html';
    }
  });
});