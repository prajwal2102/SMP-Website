index = () => {
  fetch("/api/team")
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      item.map((item, i) => {
        
        if (i == 0) {
          document.getElementById("teamDetailsFaculty").innerHTML +=
            `
                <div class="card img-fluid index-card"style='background-image: url("https://drive.google.com/uc?export=view&id=` +
            item.photoUrl +
            `");' >
							
							<div class="card-img-overlay info">

								<h4 class="card-title">` +
            item.name +
            `</h4>
								<h4 class="card-title">` +
            item.position +
            `</h4>
								<h4 class="card-title">Phone: ` +
            item.phone +
            ` </h4>
								<h4 class="card-title">Email: ` +
            item.email +
            `</h4>

							</div>
						</div>`;
        } else if (i < 2) {
          document.getElementById("teamDetailsCordinator").innerHTML +=
            `
                <div class="card img-fluid index-card"style='background-image: url("https://drive.google.com/uc?export=view&id=` +
            item.photoUrl +
            `");' >
							
							<div class="card-img-overlay info">

								<h4 class="card-title">` +
            item.name +
            `</h4>
								<h4 class="card-title">` +
            item.position +
            `</h4>
								<h4 class="card-title">Phone: ` +
            item.phone +
            ` </h4>
								<h4 class="card-title">Email: ` +
            item.email +
            `</h4>

							</div>
						</div>`;
        } else if (i < 4) {
          document.getElementById("teamDetailsAssCordinators").innerHTML +=
            `
                <div class="card img-fluid index-card"style='background-image: url("https://drive.google.com/uc?export=view&id=` +
            item.photoUrl +
            `");' >
							
							<div class="card-img-overlay info">

								<h4 class="card-title">` +
            item.name +
            `</h4>
								<h4 class="card-title">` +
            item.position +
            `</h4>
								<h4 class="card-title">Phone: ` +
            item.phone +
            ` </h4>
								<h4 class="card-title">Email: ` +
            item.email +
            `</h4>

							</div>
						</div>`;
        } else{
          document.getElementById("teamDetailsMentors").innerHTML +=
            `
                <div class="card img-fluid index-card"style='background-image: url("https://drive.google.com/uc?export=view&id=` +
            item.photoUrl +
            `");' >
							
							<div class="card-img-overlay info">

								<h4 class="card-title">` +
            item.name +
            `</h4>
								<h4 class="card-title">` +
            item.position +
            `</h4>
								<h4 class="card-title">Phone: ` +
            item.phone +
            ` </h4>
								<h4 class="card-title">Email: ` +
            item.email +
            `</h4>

							</div>
						</div>`;
        }
      });
    });
};
index();
