geturlparm = (varia) => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get(varia);
  return code;
};

toggleShow = (name,email,time,review) => {
  var id = geturlparm("id");
  
  fetch(
    "http://localhost:3000/damp/api/togglecommentshow?id=" +
      id +
      "&email=" +
      email +
      "&review=" +
      review +
      "&time=" +
      time
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.res_status == "UPDATED") {
        getcoursedetails();
      }
    });
}

deleteShow = (name,email,time,review) => {
  var id = geturlparm("id");
  
  fetch(
    "http://localhost:3000/damp/api/deletecomment?id=" +
      id +
      "&email=" +
      email +
      "&review=" +
      review +
      "&time=" +
      time
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.res_status == "UPDATED") {
        getcoursedetails();
      }
    });
}
getcoursedetails = () => {
  
  var id = geturlparm("id");
  var type = geturlparm("type");

  var email = localStorage.getItem('email');
  
  fetch(
    "http://localhost:3000/damp/api/CourseDetails?id=" + id + "&email=" + email
  )
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      if (item.res_status == "FOUND") {
        var role = item.role;
        console.log(item);
        item = item.data[0];
        
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
        if (type == "Elect") {
          item.reviews.map((review, i) => {
            console.log(review.imgUrl);
            if (role == 'admin') {
              document.getElementById("course-reviews").innerHTML +=
                `
                  <div class="review">

              <div class="reviewer-info">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6">
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
                    <div class="col-sm-6">
                      <div style="margin: 0% 10%;
    text-align: center;">
                        <span style="margin: 3%;">
                        ` +
                (review.show ? "Showing to Public" : "Not Showing to Public") +
                `</span><div>
                        <span style="margin: 3%;">
                          <button class="reviewtoggleBtn" onClick="toggleShow( '` +
                review.name +
                `','` +
                review.email +
                `','` +
                review.time +
                `','` +
                review.review +
                `'
                                          )"> Toggle</button>
                        </span>
                        <span style="margin: 3%;">
                          <button class="reviewtoggleBtnDelete" onClick="deleteShow( '` +
                review.name +
                `','` +
                review.email +
                `','` +
                review.time +
                `','` +
                review.review +
                `'
                                          )"> Delete</button>
                        </span></div>
                      </div>
                    </div>
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
            } else if (review.show) {
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
            }});
        } else {
          document.getElementById("review-row").style.display = "none";
        }
      }
    });
};

getcoursedetails();

 var auth2 = gapi.auth2.getAuthInstance();
auth2.currentUser.listen(getcoursedetails);

clearReviewMsg = () => {
  document.getElementById("review-msg").innerHTML = "";
};

async function submitReview() {
  var auth2 = gapi.auth2.getAuthInstance();
  if (auth2.isSignedIn.get()) {
    var id = geturlparm("id");
    var review = document.getElementById("review-text").value;

    var profile = auth2.currentUser.get().getBasicProfile();
    var name = profile.getName();
    var email = profile.getEmail();
    var img_url = profile.getImageUrl();

    console.log(review);
    await fetch(
      "http://localhost:3000/damp/api/SubmitCourseReview?id=" +
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
