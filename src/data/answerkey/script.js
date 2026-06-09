const params = new URLSearchParams(window.location.search);

const answerKeyId = params.get("answerkey");

fetch("data.json")
.then(res => res.json())
.then(data => {

    const answerKey = data.find(
        item => item.id == answerKeyId
    );

    if (!answerKey) {

        document.body.innerHTML = `
        <h1 style="text-align:center;padding:100px">
        404 - Answer Key Not Found
        </h1>
        `;

        return;
    }

    Object.keys(answerKey).forEach(key => {

        const element =
        document.getElementById(key);

        if (!element) return;

        if (element.tagName === "A") {

            element.href = answerKey[key];
            element.target = "_blank";

        } else {

            element.textContent = answerKey[key];

        }

    });

})
.catch(error => {

    console.error(error);

    document.body.innerHTML = `
    <h1 style="text-align:center;padding:100px">
    Data File Not Found
    </h1>
    `;

});