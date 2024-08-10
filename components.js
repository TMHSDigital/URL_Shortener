const Components = {
    urlShortener: `
        <div id="shortenUrl">
            <input type="text" id="longUrl" placeholder="Enter your long URL">
            <button id="shortenButton">Shorten</button>
        </div>
        <div id="result"></div>
    `,

    urlList: `
        <div id="urlList">
            <h2>Your Shortened URLs:</h2>
            <ul id="urlListItems"></ul>
        </div>
    `,

    urlListItem: (shortUrl, longUrl, shortCode) => `
        <li>
            <a href="${shortUrl}" target="_blank">${shortUrl}</a> -> ${longUrl}
            <button class="deleteButton" data-shortcode="${shortCode}">Delete</button>
        </li>
    `
};