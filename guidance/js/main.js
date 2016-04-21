window.onload = function (e) {
  // localStorage.clear(); // only uncomment this pag may errors sa database
  if (window.location.href.indexOf('database.html') > -1) {
    // load students from localStorage
    var noOfStudents = localStorage.getItem("studentIndex");
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
      urgency.className = 'urgency ' + student["urgency"];
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
      // add input field
      var inputRemarks = document.createElement("input");
      inputRemarks.type = 'text';
      inputRemarks.disabled = 'true';
      inputRemarks.className = 'remarks-text';
      if (student["remarks"] != null) {
        inputRemarks.value = student["remarks"];
      } else {
        inputRemarks.value = "";
      }
      studentRemarks.appendChild(inputRemarks);

      // add edit button
      var editButton = document.createElement("a");
      editButton.className = 'button edit-remarks';
      editButton.innerHTML = '<i class="fa fa-edit"></i>';
      studentRemarks.appendChild(editButton); 
      studentRow.appendChild(studentRemarks);

      studentDetails.appendChild(studentRow);
    }

    // set up toggle buttons for URGENT, SERIOUS, and NORMAL (and ALL)
    var urgencyButtons = document.getElementsByClassName("status-item");
    for (var u = 0; u < urgencyButtons.length; u++) {
      urgencyButtons[u].addEventListener('click', function (e) {
        for (var d = 0; d < urgencyButtons.length; d++) {
          urgencyButtons[d].className = 'status-item';
        }
        this.className += ' active';
        var studentRows = document.getElementsByClassName("student");
        for (var s = 0; s < studentRows.length; s++) {
          studentRows[s].style.display = 'none';
        }

        var status = document.getElementsByClassName("urgency");
        switch (this.id) {
          case "status-urgent":
            status = document.getElementsByClassName("urgent");
            break;
          case "status-serious":
            status = document.getElementsByClassName("serious");
            break;
          case "status-normal":
            status = document.getElementsByClassName("normal");
            break;
        }

        for (var i = 0; i < status.length; i++) {
          if (status[i].parentElement.parentElement.className == 'student') {
            status[i].parentElement.parentElement.style.display = 'table-row';
          }
        }
      });
    }

    var students = document.getElementsByClassName("student-name");
    for (var j = 0; j < students.length; j++) {
      students[j].addEventListener('click', function (e) {
        var studentIndex = localStorage.getItem("studentIndex");
        for (var i = 1; i <= studentIndex; i++) {
          var currStudent = JSON.parse(localStorage.getItem("student"+i));
          if (this.innerText == currStudent["name"]) {
            var bottomPosition = this.getBoundingClientRect().bottom;
            var studentPreview = document.getElementById("student-preview");
            studentPreview.style.top = bottomPosition+'px';
            var urgency = document.getElementById("urgency-select");
            for (var x = 0; x < urgency.length; x++) {
              if (urgency[x].id == currStudent["urgency"]) {
                urgency.value = urgency[x].text;
              }
            }

            urgency.addEventListener('change', function (e) {
              studentPreview.getElementsByClassName("urgency")[0].className = 'urgency ' + this.options[this.selectedIndex].text.toLowerCase();
            });

            studentPreview.getElementsByClassName("urgency")[0].className = 'urgency ' + currStudent["urgency"];
            document.getElementById("preview-name").value = currStudent["name"];
            document.getElementById("preview-idnum").value = currStudent["id-number"];
            document.getElementById("preview-yrcourse").value = currStudent["year-course"];
            document.getElementById("preview-cellno").value = currStudent["cell-num"];
            document.getElementById("preview-dob").value = currStudent["birthday"];
            document.getElementById("preview-email").value = currStudent["email"];
          }
        }

        if (studentPreview.style.display != 'flex') {
          studentPreview.style.display = 'flex';
          this.nextSibling.nextSibling.nextSibling.children[0].style.display = 'block';
          this.nextSibling.nextSibling.nextSibling.children[0].removeAttribute('disabled');
          this.nextSibling.nextSibling.nextSibling.children[0].autofocus = 'true';
          this.nextSibling.nextSibling.nextSibling.children[1].style.display = 'block';
        } else {
          studentPreview.style.display = 'none';
          this.nextSibling.nextSibling.nextSibling.children[0].disabled = 'true';
          this.nextSibling.nextSibling.nextSibling.children[0].style.display = 'none';
          this.nextSibling.nextSibling.nextSibling.children[1].style.display = 'none';
        }
      });
    }

    var previewSidebar = document.getElementById("student-sidebar");
    var selectedIndex = 1;
    previewSidebar.addEventListener('click', function (e) {
      var selected = document.getElementsByClassName("selected")[0];
      switch (e.target.id) {
        case "up-sidebar":
          var newSelect = selected.previousElementSibling;
          newSelect.className = 'session selected';
          selected.className = 'session';
          if (newSelect.id.indexOf("session-") > -1) {
            selectedIndex = newSelect.id.substr(newSelect.id.length - 1);
            document.getElementById("session-info").style.display = 'block';
            document.getElementById("student-area").style.display = 'none';
          } else {
            selectedIndex = 0;
            document.getElementById("student-area").style.display = 'flex';
            document.getElementById("session-info").style.display = 'none';
          }
          break;
        case "down-sidebar":
          var newSelect = selected.nextElementSibling;
          newSelect.className = 'session selected';
          selected.className = 'session';
          if (newSelect.id.indexOf("session-") > -1) {
            selectedIndex = newSelect.id.substr(newSelect.id.length - 1);
            document.getElementById("session-info").style.display = 'block';
            document.getElementById("student-area").style.display = 'none';
          } else {
            selectedIndex = 0;
            document.getElementById("student-area").style.display = 'flex';
            document.getElementById("session-info").style.display = 'none';
          }
          break;
        case "personal-data":
          selected.className = 'session';
          document.getElementById("personal-data").className = 'session selected';
          document.getElementById("student-area").style.display = 'flex';
          document.getElementById("session-info").style.display = 'none';
          break;
        default:
          if (e.target.id.indexOf("session-") > -1) {
            var newSelect = document.getElementById("session-"+selectedIndex);
            newSelect.className = 'session selected';
            selected.className = 'session';
            document.getElementById("session-info").style.display = 'block';
            document.getElementById("student-area").style.display = 'none';
          }
          console.log(document.getElementById("student-area").style.display == 'flex')
          break;
      }
    });

    document.getElementById("save-personal-data").addEventListener('click', function (e) {
      e.preventDefault();
      var currStudent;
      var noOfStudents = localStorage.getItem("studentIndex");
      var idNumber = document.getElementById("preview-idnum").value;
      for (var i = 1; i <= noOfStudents; i++) {
        var currStudent = JSON.parse(localStorage.getItem("student"+i));
        if (currStudent["id-number"] == idNumber) {
          currStudent["urgency"] = document.getElementById("urgency-select").value.toLowerCase();
          currStudent["name"] = document.getElementById("preview-name").value;
          currStudent["id-number"] = document.getElementById("preview-idnum").value;
          currStudent["year-course"] = document.getElementById("preview-yrcourse").value;
          currStudent["cell-num"] = document.getElementById("preview-cellno").value;
          currStudent["birthday"] = document.getElementById("preview-dob").value;
          currStudent["email"] = document.getElementById("preview-email").value;

          for (var j = 0; j < document.getElementsByClassName("student-remarks").length; j++) {
            if (document.getElementsByClassName("student-name")[j].innerText == currStudent["name"]) {
              currStudent["remarks"] = document.getElementsByClassName("student-remarks")[j].children[0].value;
            }
          }

          localStorage.setItem("student"+i, JSON.stringify(currStudent));
          break;
        }
      }
      // window.location = 'database.html';
      document.getElementById("student-preview").style.display = 'none';
      document.getElementById("student-preview").style.display = 'none';
      for (var s = 0; s < document.getElementsByClassName("student-remarks").length; s++) {
        document.getElementsByClassName("student-remarks")[s].children[0].disabled = 'true';
        document.getElementsByClassName("student-remarks")[s].children[1].style.display = 'none';
      }
        
    });
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
  } else if (window.location.href.indexOf('appointments.html') > -1) {
    var days = document.getElementsByClassName("fc-day");
    for (var i = 0; i < days.length; i++) {
      var addButton = document.createElement("a");
      addButton.href = '#';
      addButton.className = 'button add-event';
      addButton.innerHTML = '<i class="fa fa-plus"></i>';
      days[i].appendChild(addButton);
    }

    var buttons = document.getElementsByClassName("fc-button");
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].addEventListener('click', function (e) {
        var days = document.getElementsByClassName("fc-day");
        for (var i = 0; i < days.length; i++) {
          var addButton = document.createElement("a");
          addButton.href = '#';
          addButton.className = 'button add-event';
          addButton.innerHTML = '<i class="fa fa-plus"></i>';
          days[i].appendChild(addButton);
        }
      });
      
    }

    var addEvent = document.getElementsByClassName("add-event");
    addEvent.addEventListener('click', function (e) {

    });
  }
}