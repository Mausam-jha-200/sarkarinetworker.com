let allAdmits = [];
let visibleAdmits = 10;

fetch("data.json")
.then(response => response.json())
.then(data => {

    allAdmits = data;

    renderAdmits();

});

function renderAdmits(){

    const container =
    document.getElementById("admitContainer");

    let html = "";

    allAdmits
    .slice(0, visibleAdmits)
    .forEach(admit => {

        html += `
        <div class="admit-card"
        onclick="window.location.href='../../data/admitcard/post.html?admit=${admit.slug}'">

            <div class="admit-tag">
                ${admit.tag}
            </div>

            <h3>
                ${admit.title}
            </h3>

            <p>
                Exam Date : ${admit.examDate}
            </p>

            <p>
                Status : ${admit.status}
            </p>

            <a href="#"
            class="admit-btn">
                Download Admit Card
            </a>

        </div>
        `;

    });

    container.innerHTML = html;

    if(visibleAdmits >= allAdmits.length){

        document
        .getElementById("loadMoreBtn")
        .style.display = "none";

    }

}

document
.getElementById("loadMoreBtn")
.addEventListener("click", () => {

    visibleAdmits += 10;

    renderAdmits();

});