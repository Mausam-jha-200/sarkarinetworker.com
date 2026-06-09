const params = new URLSearchParams(window.location.search);

const admissionId = params.get("admission");

fetch("data.json")
.then(res => res.json())
.then(data => {

    const admission = data.find(
        item => item.id == admissionId
    );

    if (!admission) {

        document.body.innerHTML = `
        <h1 style="text-align:center;padding:100px">
        404 - Admission Not Found
        </h1>
        `;

        return;
    }

    Object.keys(admission).forEach(key => {

        const element =
        document.getElementById(key);

        if (!element) return;

        if (element.tagName === "A") {

            element.href = admission[key];
            element.target = "_blank";

        } else {

            element.textContent = admission[key];

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