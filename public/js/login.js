$(document).ready(function() {
  
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(result) {
        let type = result.usertype;
        if(type == "patron"){
          window.location.replace("/members");
        }else{
          window.location.replace("/vendor");
        }
        
        // If there's an error, log the error
      })
      .catch(function(err) {
        $("#login-alert .login-msg").text("Incorrect Email & Password match");
        $("#login-alert").fadeIn(500);
      });
  }

});
