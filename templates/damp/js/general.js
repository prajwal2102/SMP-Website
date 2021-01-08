function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  
  if (profile.getEmail().slice(-11) === "iitdh.ac.in") {
    console.log("iitdh");
    localStorage.setItem("email", profile.getEmail());
  } else {
    onSignOut();
  }
  document.getElementById("signin-btn").style.display = "none";
  document.getElementById("signout-btn").style.display = "block";
}

function onSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
    localStorage.setItem("email", "");
    document.getElementById("signin-btn").style.display = "block";
    document.getElementById("signout-btn").style.display = "none";
  });
}
