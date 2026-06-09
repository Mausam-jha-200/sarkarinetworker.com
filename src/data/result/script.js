const params = new URLSearchParams(window.location.search);

const resultId = params.get("result");

fetch("data.json")
.then(res => res.json())
.then(data => {

    const result = data.find(
        item => item.id == resultId
    );

    if (!result) {

        document.body.innerHTML = `
        <h1 style="text-align:center;padding:100px">
        404 - Result Not Found
        </h1>
        `;

        return;
    }

    Object.keys(result).forEach(key => {

        const element =
        document.getElementById(key);

        if (!element) return;

        if (element.tagName === "A") {

            element.href = result[key];
            element.target = "_blank";

        } else {

            element.textContent = result[key];

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