document.getElementById("load").addEventListener("click", async () => {
    const resultElement = document.getElementById("result");
    const buttonContainer = document.getElementById("button-container");
    resultElement.textContent = "Loading...";
    buttonContainer.innerHTML = ""; // clear previous button

    try {
        const response = await fetch(
            "https://species.wikimedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*"
        );
        const data = await response.json();

        const title = data.query.random[0].title;
        const pageUrl = "https://species.wikimedia.org/wiki/" + encodeURIComponent(title);

        // make title clickable
        resultElement.innerHTML = `<a href="${pageUrl}" target="_blank">${title}</a>`;

        // create Google Images button
        const btn = document.createElement("button");
        btn.textContent = "Search Images on Google";
        btn.onclick = () => {
            const searchUrl = "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(title);
            window.open(searchUrl, "_blank");
        };

        buttonContainer.appendChild(btn);

    } catch (err) {
        resultElement.textContent = "Error: " + err;
    }
});
