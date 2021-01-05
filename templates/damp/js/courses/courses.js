geturlparm = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get("type");
  return code;
};

getcourses = () => {
  var type = geturlparm();

  if (type == "coreCSE") {
    document.getElementById("branchName").innerHTML =
      "Computer Science and Engineering";
    document.getElementById("branchName1").innerHTML =
      " Computer Science and Engineering";
    document.getElementById("course-banner").style.background =
      "url('img/courses/course-CSE.jpg')  no-repeat center center";
  } else if (type == "coreEE") {
    document.getElementById("branchName").innerHTML = "Electrical Engineering";
    document.getElementById("branchName1").innerHTML =
      " Electrical Engineering";
    document.getElementById("course-banner").style.background =
      "url('img/courses/course-EE.jpg')  no-repeat center center";
  } else if (type == "coreME") {
    document.getElementById("branchName").innerHTML = "Mechanical Engineering";
    document.getElementById("branchName1").innerHTML =
      " Mechanical Engineering";
    document.getElementById("course-banner").style.background =
      "url('img/courses/course-MECH.jpg')  no-repeat center center";
  }
  var field_name = ["third", "fourth", "fifth", "sixth"];
  var i = 3;
  for (k = 0; k < 6; k++) {
    fetch(
      "http://localhost:5000/damp/api/Courses?sem=" +
        (k + 3).toString() +
        "&type=" +
        type
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        var item = res.data;

        if (item.length) {
          item.map((item, i) => {
            document.getElementById(field_name[res.semester - 3]).innerHTML +=
              `
                    <div class="single_course">

                <a href="course-details.html?id=` +
              item._id.$oid.toString() +
              `">
                  <div class="course_content" >
                    <span class="tag mb-4 d-inline-block">Semester ` +
              item.semester +
              `</span>
                    <h4 class="mb-3" style="height:48px;">
                    ` +
              item.courseName +
              `
                      
                    </h4>
                   
                    <p>
                      Instructor: ` +
              item.instructor +
              `
                    </p>
                  </div>

                </a>
              </div>`;
          });
        }
      });
  }
};

getcourses();
