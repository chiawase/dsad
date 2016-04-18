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

window.onload = function (e) {
  if (window.location.href.indexOf('database.html') > -1) {
    var students = document.getElementsByClassName("student-name");
    for (var i = 0; i < students.length; i++) {
      students[i].addEventListener('click', function (e) {
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
  }
}