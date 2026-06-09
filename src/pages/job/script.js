let allJobs = [];
let visibleJobs = 9;

fetch("data.json")
.then(response => response.json())
.then(data => {

    allJobs = data;

    renderJobs();

});

function renderJobs(){

    const container =
    document.getElementById("jobsContainer");

    container.innerHTML = "";

    allJobs
    .slice(0, visibleJobs)
    .forEach(job => {

        container.innerHTML += `
        <div class="job-card"
        onclick="window.location.href='${job.url}'">

            <div class="tag">
                ${job.tag}
            </div>

            <h3>
                ${job.title}
            </h3>

            <p>
                Qualification :
                ${job.qualification}
            </p>

            <p>
                Last Date :
                ${job.lastDate}
            </p>

            <p>
                Total Posts :
                ${job.posts}
            </p>

            <a href="#"
            class="job-btn">
                View Details
            </a>

        </div>
        `;

    });

    if(visibleJobs >= allJobs.length){

        document
        .getElementById("loadMoreBtn")
        .style.display = "none";

    }

}

document
.getElementById("loadMoreBtn")
.addEventListener("click", () => {

    visibleJobs += 10;

    renderJobs();

});