function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log(profile);
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log(profile.getEmail().slice(-11));
    if (profile.getEmail().slice(-11) === 'iitdh.ac.in') {
        console.log('iitdh');
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
      document.getElementById("signin-btn").style.display = "block";
      document.getElementById("signout-btn").style.display = "none";
  });
}
