let allAdmissions = [];
let visibleAdmissions = 10;

fetch("data.json")
.then(response => response.json())
.then(data => {

    allAdmissions = data;

    renderAdmissions();

});

function renderAdmissions(){

    const container =
    document.getElementById("admissionContainer");

    let html = "";

    allAdmissions
    .slice(0, visibleAdmissions)
    .forEach(admission => {

        html += `
        <div class="admission-card"
        onclick="window.location.href='../../data/admissions/post.html?admission=${admission.slug}'">

            <div class="admission-tag">
                ${admission.tag}
            </div>

            <h3>
                ${admission.title}
            </h3>

            <p>
                Qualification :
                ${admission.qualification}
            </p>

            <p>
                Last Date :
                ${admission.lastDate}
            </p>

            <a href="#"
            class="admission-btn">
                Apply Now
            </a>

        </div>
        `;

    });

    container.innerHTML = html;

    if(visibleAdmissions >= allAdmissions.length){

        document
        .getElementById("loadMoreBtn")
        .style.display = "none";

    }

}

document
.getElementById("loadMoreBtn")
.addEventListener("click", () => {

    visibleAdmissions += 10;

    renderAdmissions();

});