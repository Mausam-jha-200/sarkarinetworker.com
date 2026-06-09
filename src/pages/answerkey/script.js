let allAnswers = [];
let visibleAnswers = 10;

fetch("data.json")
.then(response => response.json())
.then(data => {

    allAnswers = data;

    renderAnswers();

});

function renderAnswers(){

    const container =
    document.getElementById("answerContainer");

    let html = "";

    allAnswers
    .slice(0, visibleAnswers)
    .forEach(answer => {

        html += `
        <div class="answer-card"
        onclick="window.location.href='../../data/answerkey/post.html?answerkey=${answer.slug}'">

            <div class="answer-tag">
                ${answer.tag}
            </div>

            <h3>
                ${answer.title}
            </h3>

            <p>
                Released : ${answer.released}
            </p>

            <p>
                Status : ${answer.status}
            </p>

            <a href="#"
            class="answer-btn">
                View Answer Key
            </a>

        </div>
        `;

    });

    container.innerHTML = html;

    if(visibleAnswers >= allAnswers.length){

        document
        .getElementById("loadMoreBtn")
        .style.display = "none";

    }

}

document
.getElementById("loadMoreBtn")
.addEventListener("click", () => {

    visibleAnswers += 10;

    renderAnswers();

});