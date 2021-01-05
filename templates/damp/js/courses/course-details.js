geturlparm = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get("id");
  return code;
};

getcoursedetails = () => {
  var id = geturlparm();

  fetch("http://localhost:5000/damp/api/CourseDetails?id=" + id)
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      if (item.res_status == "FOUND") {
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

        document.getElementById("need").innerHTML = item.need;
      }
    });
};

getcoursedetails();
