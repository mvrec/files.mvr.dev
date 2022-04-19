// CODED :  ZO.CORE DEV
// licensed : Mix Vibe Rec
function Ready() {
  inputrefID = document.getElementById("refID").value;
  FetchReviewData();
  $(".inrefid").text(inputrefID);
  $("#refID").val("");
}
const reviewList = document.getElementById("review-list");
const artDList = document.getElementById("artD-list");
const DList = document.getElementById("D-list");
function FetchReviewData() {
  var firebaseRef = firebase.database().ref();
  firebaseRef
    .child("Reviews")
    .orderByChild("refId")
    .equalTo(inputrefID)
    .on("value", (snapshot) => {
      data = snapshot.val();
      for (var taskID in data) {
        reviewList.innerHTML += `
            <div id="TrackList" class="col-lg-6 tracks">
                    <div class="card shadow mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">${data[taskID].trackTitle} - ${data[taskID].artistName}</h6>
                        </div>
                        <div class="card-body">
                        <li><small class="text-muted">Track Ref ID : ${taskID}</small></li>
                        <div class="dropdown-divider"></div>
                        <div>Album Title : ${data[taskID].albumTitle}</div>
                        <div>Track Title : ${data[taskID].trackTitle}</div>
                        <div>Artist Name : ${data[taskID].artistName}</div>
                        <div>Review Status : <b><span class="tStatus">${data[taskID].trackStatus}</span></b></div>
                        <div class="mb-1">Review Feedback : <small>${data[taskID].reviewComments}</small></div>
                        </div>
                    </div>
                </div>
                `
      }

      if (reviewList.innerHTML === "") {
        $(".rdt").css("opacity", "0.5");
      } else {
        $(".rdt").css("color", "#36b9cc");
        $(".rdt").css({ padding: "15px 5px" });
      }

      $(".tStatus").each(function () {
        var el = $(this);
        if (el.text() === "Approved") {
          el.css({ color: "#36b9cc" });
        }
        if (el.text() === "Hold") {
          el.css({ color: "red" });
        }
        if (el.text() === "Pending") {
          el.css({ color: "#f6c23e" });
        }
        if (el.text() === "Rejected") {
          el.css({ color: "red" });
        }
      });
    });
  firebaseRef
    .child("ArtDpt/")
    .orderByChild("refId")
    .equalTo(inputrefID)
    .on("value", (snapshot) => {
      data = snapshot.val();
      for (var taskID in data) {
        artDList.innerHTML += `
            <div id="TrackList" class="col-lg-6 tracks">
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-success">${data[taskID].trackTitle} - ${data[taskID].artistName}</h6>
                </div>
                <div class="card-body">
                <li><small class="text-muted">Track Ref ID : ${taskID}</small></li>
                <div class="dropdown-divider"></div>
                <div>Track Title : ${data[taskID].trackTitle}</div>
                <div>Artist Name : ${data[taskID].artistName}</div>
                <div>Review Status : <b><span class="trackStatus">${data[taskID].trackStatus}</span></b></div>
                <div>Cover Art Status : <span class="coverStatus"><b>${data[taskID].coverStatus}</b></span></div>
                </div>
            </div>
        </div>
             `
      }

      if (artDList.innerHTML === "") {
        $(".adt").css("opacity", "0.5");
      } else {
        $(".adt").css("color", "#36b9cc");
        $(".adt").css({ padding: "15px 5px" });
      }

      $(".tStatus").each(function () {
        var el = $(this);
        if (el.text() === "Approved") {
          el.css({ color: "#36b9cc" });
        }
        if (el.text() === "Hold") {
          el.css({ color: "red" });
        }
        if (el.text() === "Pending") {
          el.css({ color: "#f6c23e" });
        }
        if (el.text() === "Rejected") {
          el.css({ color: "red" });
        }
      });

      $(".coverStatus").each(function () {
        var el = $(this);
        if (el.text() === "Submitted") {
          el.css({ color: "#36b9cc" });
        }
        if (el.text() === "Not Submitted") {
          el.css({ color: "red" });
        }
      });
    });
  firebaseRef
    .child("Deployment")
    .orderByChild("refId")
    .equalTo(inputrefID)
    .on("value", (snapshot) => {
      data = snapshot.val();
      for (var taskID in data) {
        DList.innerHTML += `
             <div id="TrackList" class="col-lg-6 tracks">
                     <div class="card shadow mb-4">
                         <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                             <h6 class="m-0 font-weight-bold text-info">${data[taskID].trackTitle} - ${data[taskID].artistName}</h6>
                         </div>
                         <div class="card-body">
                         <li><small class="text-muted">Track Ref ID : ${taskID}</small></li>
                         <div class="dropdown-divider"></div>
                         <div>Album Title : ${data[taskID].albumTitle}</div>
                         <div>Track Title : ${data[taskID].trackTitle}</div>
                         <div>Artist Name : ${data[taskID].artistName}</div>
                         <div>Review Status : <b><span class="tStatus">${data[taskID].trackStatus}</span></b></div>
                         </div>
                     </div>
                 </div>
             `
      }

      if (DList.innerHTML === "") {
        $(".dpt").css("opacity", "0.5");
      } else {
        $(".dpt").css("color", "#36b9cc");
        $(".dpt").css({ padding: "15px 5px" });
      }

      $(".tStatus").each(function () {
        var el = $(this);
        if (el.text() === "Approved") {
          el.css({ color: "#36b9cc" });
        }
        if (el.text() === "Hold") {
          el.css({ color: "red" });
        }
        if (el.text() === "Pending") {
          el.css({ color: "#f6c23e" });
        }
        if (el.text() === "Rejected") {
          el.css({ color: "red" });
        }
      });
    });
}
