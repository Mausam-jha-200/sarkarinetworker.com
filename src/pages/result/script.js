let allResults = [];
let visibleResults = 9;

fetch("data.json")
.then(response => response.json())
.then(data => {

    allResults = data;

    renderResults();

});

function renderResults(){

    const container =
    document.getElementById("resultsContainer");

    let html = "";

    allResults.slice(0, visibleResults).forEach(result => {

        html += `
        <div class="result-card"
        onclick="window.location.href='../../data/result/post.html?result=${result.slug}'">

            <div class="result-tag">
                ${result.tag}
            </div>

            <h3>
                ${result.title}
            </h3>

            <p>
                Declared : ${result.declared}
            </p>

            <a href="#"
            class="result-btn">
                View Result
            </a>

        </div>
        `;

    });

    container.innerHTML = html;

    if(visibleResults >= allResults.length){
        document.getElementById("loadMoreBtn")
        .style.display = "none";
    }

}

document
.getElementById("loadMoreBtn")
.addEventListener("click", () => {

    visibleResults += 10;

    renderResults();

});


