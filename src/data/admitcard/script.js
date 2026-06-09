const params = new URLSearchParams(window.location.search);

const admitId = params.get("admit");

fetch("data.json")
.then(res => res.json())
.then(data => {

    const admit = data.find(
        item => item.id == admitId
    );

    if (!admit) {

        document.body.innerHTML = `
        <h1 style="text-align:center;padding:100px">
        404 - Admit Card Not Found
        </h1>
        `;

        return;
    }

    Object.keys(admit).forEach(key => {

        const element =
        document.getElementById(key);

        if (!element) return;

        if (element.tagName === "A") {

            element.href = admit[key];
            element.target = "_blank";

        } else {

            element.textContent = admit[key];

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