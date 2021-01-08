geturlparm = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get("type");
  return code;
};

getcourses = () => {
  document.getElementById("courses").innerHTML = "";
  var sem = ["0"];
  var ids = ["courses"];
  var type = geturlparm();

  if (type == "DeptElectCSE") {
    document.getElementById("branchName").innerHTML =
      "Computer Science and Engineering";
    document.getElementById("branchName1").innerHTML =
      " Computer Science and Engineering";
    document.getElementById("course-banner").style.background =
      "url('img/courses/course-CSE.jpg')  no-repeat center center";

    document.getElementById("typeCourse").innerHTML = "Department Electives";
    sem = ["Autumn", "Spring"];
    ids = ["autumn-Courses", "spring-Courses"];
    document.getElementById("autumn-Courses").innerHTML = `<h1>
          Autumn
        </h1>
        <hr></hr>`;
    document.getElementById("spring-Courses").innerHTML = `<h1>
          Spring
        </h1>
        <hr></hr>`;
  } else if (type == "DeptElectEE") {
    document.getElementById("branchName").innerHTML = "Electrical Engineering";
    document.getElementById("branchName1").innerHTML =
      " Electrical Engineering";
    document.getElementById("course-banner").style.background =
      "url('img/courses/course-EE.jpg')  no-repeat center center";

    document.getElementById("typeCourse").innerHTML = "Department Electives";
    sem = ["Autumn", "Spring"];
    ids = ["autumn-Courses", "spring-Courses"];
    document.getElementById("autumn-Courses").innerHTML = `<h1>
          Autumn
        </h1>
        <hr></hr>`;
    document.getElementById("spring-Courses").innerHTML = `<h1>
          Spring
        </h1>
        <hr></hr>`;
  } else if (type == "DeptElectME") {
    document.getElementById("branchName").innerHTML = "Mechanical Engineering";
    document.getElementById("branchName1").innerHTML =
      " Mechanical Engineering";
    document.getElementById("course-banner").style.background =
      "url('img/courses/course-MECH.jpg')  no-repeat center center";

    document.getElementById("typeCourse").innerHTML = "Department Electives";
    sem = ["Autumn", "Spring"];
    ids = ["autumn-Courses", "spring-Courses"];
    document.getElementById("autumn-Courses").innerHTML = `<h1>
          Autumn
        </h1>
        <hr></hr>`;
    document.getElementById("spring-Courses").innerHTML = `<h1>
          Spring
        </h1>
        <hr></hr>`;
  } else if (type == "HSS") {
    document.getElementById("branchName").innerHTML = "HSS Electives";
    document.getElementById("branchName1").innerHTML = " HSS Electives";
    document.getElementById("courses").innerHTML = `<h1>
          Electives
        </h1>
        <hr></hr>`;
  } else if (type == "Institute") {
    document.getElementById("branchName").innerHTML = "Institute Electives";
    document.getElementById("branchName1").innerHTML = "Institute Electives";
    document.getElementById("courses").innerHTML = `<h1>
          Electives
        </h1>
        <hr></hr>`;
  }

  var no = 0;

  for (no = 0; no < sem.length; no++) {
    fetch(
      "http://localhost:3000/damp/api/Courses?sem=" +
        sem[no].toString() +
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
            document.getElementById(ids[sem.indexOf(res.semester)]).innerHTML +=
              `
                    <div class="single_course">

                <a href="course-details.html?id=` +
              item._id.$oid.toString() +
              `&type=Elect">
                  <div class="course_content" >
                    <span class="tag mb-4 d-inline-block">Elective </span>
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
