const params = new URLSearchParams(window.location.search);

const internshipId = params.get("internship");

fetch("data.json")
.then(res => res.json())
.then(data => {

    const internship = data.find(
        item => item.id == internshipId
    );

    if (!internship) {

        document.body.innerHTML = `
        <div style="
        text-align:center;
        padding:100px 20px;
        color:white;
        ">
            <h1>404 - Internship Not Found</h1>
            <p>Invalid Internship URL</p>
        </div>
        `;

        return;
    }

    Object.keys(internship).forEach(key => {

        const element =
        document.getElementById(key);

        if (!element) return;

        if (element.tagName === "A") {

            element.href = internship[key];
            element.target = "_blank";

        } else {

            element.textContent = internship[key];

        }

    });

})
.catch(error => {

    console.error(error);

    document.body.innerHTML = `
    <div style="
    text-align:center;
    padding:100px 20px;
    color:white;
    ">
        <h1>404 - Data File Not Found</h1>
    </div>
    `;

});