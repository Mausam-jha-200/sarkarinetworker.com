let allInternships = [];
let visibleInternships = 10;

fetch("data.json")
.then(response => response.json())
.then(data => {

    allInternships = data;

    renderInternships();

});

function renderInternships(){

    const container =
    document.getElementById("internshipContainer");

    let html = "";

    allInternships
    .slice(0, visibleInternships)
    .forEach(internship => {

        html += `
        <div class="internship-card"
        onclick="window.location.href='../../data/internship/post.html?internship=${internship.slug}'">

            <div class="internship-tag">
                ${internship.tag}
            </div>

            <h3>
                ${internship.title}
            </h3>

            <p>
                Duration : ${internship.duration}
            </p>

            <p>
                Stipend : ${internship.stipend}
            </p>

            <a href="#"
            class="internship-btn">
                Apply Now
            </a>

        </div>
        `;

    });

    container.innerHTML = html;

    if(visibleInternships >= allInternships.length){

        document
        .getElementById("loadMoreBtn")
        .style.display = "none";

    }

}

document
.getElementById("loadMoreBtn")
.addEventListener("click", () => {

    visibleInternships += 10;

    renderInternships();

});




//intership.html code

