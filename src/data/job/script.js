const params = new URLSearchParams(window.location.search);

const jobId = params.get("job");

fetch("data.json")
.then(res => res.json())
.then(data => {

    const job = data.find(
        item => item.id == jobId
    );

    if (!job) {

        document.body.innerHTML =
        "<h1>404 - Job Not Found</h1>";

        return;
    }

    Object.keys(job).forEach(key => {

    const element =
    document.getElementById(key);

    if (!element) return;

    if (element.tagName === "A") {

        element.href = job[key];
;

    } else {

        element.textContent = job[key];

    }

});

/* SEO META TAGS */

document.title = job["meta-title"] || "";

document
.querySelector('meta[name="description"]')
.setAttribute(
    "content",
    job["meta-description"] || ""
);

document
.querySelector('meta[name="keywords"]')
.setAttribute(
    "content",
    job["meta-keywords"] || ""
);

document
.querySelector('meta[property="og:title"]')
.setAttribute(
    "content",
    job["meta-title"] || ""
);

document
.querySelector('meta[property="og:description"]')
.setAttribute(
    "content",
    job["meta-description"] || ""
);

document
.querySelector('meta[name="twitter:title"]')
.setAttribute(
    "content",
    job["meta-title"] || ""
);

document
.querySelector('meta[name="twitter:description"]')
.setAttribute(
    "content",
    job["meta-description"] || ""
);

});