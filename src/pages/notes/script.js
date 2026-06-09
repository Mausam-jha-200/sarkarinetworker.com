let allNotes = [];
let visibleNotes = 2;

fetch("data.json")
.then(response => response.json())
.then(data => {

    allNotes = data;

    renderNotes();

});

function renderNotes(){

    const container =
    document.getElementById("notesContainer");

    let html = "";

    allNotes
    .slice(0, visibleNotes)
    .forEach(note => {

        html += `
        <div class="note-card">

            <div class="note-tag">
                ${note.tag}
            </div>

            <h3>
                ${note.title}
            </h3>

            <p>
                Pages : ${note.pages}
            </p>

            <p>
                Language : ${note.language}
            </p>

            <a href="../../pdf/${note.pdf}"
            class="note-btn">
                Download PDF
            </a>

        </div>
        `;

    });

    container.innerHTML = html;

    if(visibleNotes >= allNotes.length){

        document
        .getElementById("loadMoreBtn")
        .style.display = "none";

    }

}

document
.getElementById("loadMoreBtn")
.addEventListener("click", () => {

    visibleNotes += 10;

    renderNotes();

});