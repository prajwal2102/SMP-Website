geturlparm = (varia) => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get(varia);
  return code;
};

getcoursedetails = () => {
  var id = geturlparm('id');
  var type = geturlparm("type");

  fetch("http://localhost:5000/damp/api/CourseDetails?id=" + id)
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      if (item.res_status == "FOUND") {
        item = item.data[0];
        console.log(item);

        document.getElementById("coursecode").innerHTML = item.courseCode;
        document.getElementById("coursename").innerHTML = item.courseName;
        document.getElementById("instructor").innerHTML = item.instructor;
        document.getElementById("semester").innerHTML = item.semester;
        item.summary.map((element, i) => {
          document.getElementById("summary").innerHTML +=
            `
        <li>` +
            element +
            ` </li>
          `;
        });
        document.getElementById("course-reviews").innerHTML = "";
        document.getElementById("need").innerHTML = item.need;
        if (type == 'Elect') {
          
        
          item.reviews.map((review, i) => {
            document.getElementById("course-reviews").innerHTML +=
              `
                   <div class="review" >

                <div class="reviewer-info">
                  <div class="reviewer-img-parent">
                    <img class="reviewer-img"
                      src="` +
              review.imgUrl +
              `"
          
                      alt="photo">

                  </div>
                  <div class="reviewer-name-parent">
                    <div class="reviewer-name">` +
              review.name +
              `
                    </div>
                    <div class="time">
                      On ` +
              review.time +
              `
                    </div>
                  </div>
                </div>

                <div class="review-text">
                  &#8217&#8217

                  ` +
              review.review +
              `
                  
                  &#8217&#8217
                </div>
              </div>`;
          });
        } else {
          document.getElementById("review-row").style.display = "none";
        }
      }
    });
};

getcoursedetails();

clearReviewMsg = () => {
  document.getElementById("review-msg").innerHTML = "";
}


async function submitReview() {
  var auth2 = gapi.auth2.getAuthInstance();
  if (auth2.isSignedIn.get()) {
    var id = geturlparm('id');
    var review = document.getElementById("review-text").value;

    var profile = auth2.currentUser.get().getBasicProfile();
    var name = profile.getName();
    var email = profile.getEmail();
    var img_url = profile.getImageUrl();

    console.log(review);
    await fetch(
      "http://localhost:5000/damp/api/SubmitCourseReview?id=" +
        id +
        "&review=" +
        review +
        "&email=" +
        email +
        "&name=" +
        name +
        "&imgUrl=" +
        img_url
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.res_status == "SUBMITED") {
          document.getElementById("review-msg").innerHTML = `
          <div style="color:green;    text-align: center;
    font-size: 20px;
    margin: 0px 60%;
    display: inline-block;
    width: max-content;">
          Submitted Successfully 
          </div>
          
          `;
          setTimeout(clearReviewMsg, 5000);
        } else {
          document.getElementById("review-msg").innerHTML = `
          <div style="color:red;    text-align: center;
    font-size: 20px;
    margin: 0px 30%;
    display: inline-block;
    width: max-content;">
          Hmm! There Is Some Error. Try Again Later 
          </div>
          
          `;
          setTimeout(clearReviewMsg, 5000);
        }
        document.getElementById("review-text").value = "";
        getcoursedetails();
      });
    
  } else {
    document.getElementById("review-msg").innerHTML = `
          <div style="color:red;    text-align: center;
    font-size: 20px;
    margin: 0px 30%;
    display: inline-block;
    width: max-content;">
        Please Login To Post comments.
          </div>
          
          `;
    setTimeout(clearReviewMsg, 5000);
  }
}
