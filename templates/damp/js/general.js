function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  if (profile.getEmail().slice(-11) === "iitdh.ac.in") {
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
