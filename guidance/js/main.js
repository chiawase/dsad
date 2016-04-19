window.onload = function (e) {
  if (window.location.href.indexOf('database.html') > -1) {
    // load students from localStorage
    var noOfStudents = localStorage.getItem("studentIndex");
    // var studentRow = document.getElementsByClassName("student");
    var studentDetails = document.getElementById("student-details");
    for (var i = 1; i <= noOfStudents; i++) {
      var student = JSON.parse(localStorage.getItem("student"+i));

      var studentRow = document.createElement("tr");
      studentRow.className = 'student';

      // add student NAME
      var studentName = document.createElement("td");
      studentName.className = 'student-name';
      // add a div depending on urgency
      var urgency = document.createElement("div");
      urgency.className = 'urgency urgent'; // temporary, add an if statment here
      // LEGEND: (for now until Iman updates me)
      // 0 - 21 -- OK
      // 22 - 42 -- WARNING
      // 43 - 63 -- URGENT
      studentName.appendChild(urgency);
      studentName.appendChild(document.createTextNode(student["name"]));

      studentRow.appendChild(studentName);

      // add student ID NUMBER
      var studentID = document.createElement("td");
      studentID.className = 'student-idnum';
      studentID.appendChild(document.createTextNode(student["id-number"]));

      studentRow.appendChild(studentID);

      // add student YEAR & COURSE
      var studentYrCourse = document.createElement("td");
      studentYrCourse.className = 'student-yrcourse';
      studentYrCourse.appendChild(document.createTextNode(student["year-course"]));

      studentRow.appendChild(studentYrCourse);

      // add student REMARKS
      var studentRemarks = document.createElement("td");
      studentRemarks.className = 'student-remarks';
      if (student["remarks"] != null) {
        studentRemarks.appendChild(document.createTextNode(student["remarks"]));
      } else {
        studentRemarks.appendChild(document.createTextNode(""));
      }
      studentRow.appendChild(studentRemarks);

      studentDetails.appendChild(studentRow);
    }

    var students = document.getElementsByClassName("student-name");
    for (var j = 0; j < students.length; j++) {
      students[j].addEventListener('click', function (e) {
        var parent = this.parentElement;
        if (document.getElementById("student-preview").style.display != 'flex') {
          document.getElementById("student-preview").style.display = 'flex';
        } else {
          document.getElementById("student-preview").style.display = 'none';
        }
          
      });
    }
  } else if (window.location.href.indexOf('send-message.html') > -1) {
    document.getElementById("show-message").style.display = 'block';
  } else if (window.location.href.indexOf('inbox.html') > -1) {
    var emails = document.getElementsByClassName("email");

    for (var i = 0; i < emails.length; i++) {
      emails[i].addEventListener('click', function (e) {
        // get data
        var sender = this.children[0].innerText;
        
        var emailDetails = this.children[1].getElementsByTagName("span");
        var emailSubject = emailDetails[0].innerText;
        var emailPreview = emailDetails[1].innerText;

        var date = this.children[2].innerText;

        // set data to preview
        var previewBox = document.getElementById("show-message");
        previewBox.style.display = 'block';
        previewBox.getElementsByClassName("subject")[0].innerText = emailSubject;
        var emailForm = document.getElementById("email-message");
        emailForm.children[0].value = sender;
        emailForm.children[1].value = date;
        emailForm.children[2].value = 'iamhamilton@dsad.ph (you)';
        emailForm.children[3].innerText = emailPreview;
      });
    }
  }
}