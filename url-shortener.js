// Load existing URLs from localStorage
let urls = JSON.parse(localStorage.getItem('shortUrls')) || {};

function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    if (!longUrl) {
        alert('Please enter a URL');
        return;
    }

    const shortCode = generateShortCode();
    const shortUrl = `${window.location.origin}?${shortCode}`;

    urls[shortCode] = longUrl;
    localStorage.setItem('shortUrls', JSON.stringify(urls));

    displayResult(shortUrl);
    displayUrlList();
}

function generateShortCode() {
    return Math.random().toString(36).substring(2, 8);
}

function displayResult(shortUrl) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Shortened URL:</p>
        <a href="${shortUrl}" target="_blank">${shortUrl}</a>
    `;
}

function displayUrlList() {
    const urlListDiv = document.getElementById('urlList');
    urlListDiv.innerHTML = '<h2>Your Shortened URLs:</h2>';
    for (const [shortCode, longUrl] of Object.entries(urls)) {
        const shortUrl = `${window.location.origin}?${shortCode}`;
        urlListDiv.innerHTML += `
            <p>
                <a href="${shortUrl}" target="_blank">${shortUrl}</a> -> ${longUrl}
                <button onclick="deleteUrl('${shortCode}')">Delete</button>
            </p>
        `;
    }
}

function deleteUrl(shortCode) {
    delete urls[shortCode];
    localStorage.setItem('shortUrls', JSON.stringify(urls));
    displayUrlList();
}

// Check if this is a shortened URL and redirect if necessary
(function() {
    const shortCode = window.location.search.slice(1);
    if (shortCode) {
        const longUrl = urls[shortCode];
        if (longUrl) {
            window.location.href = longUrl;
        } else {
            alert('Short URL not found');
        }
    } else {
        displayUrlList();
    }
})();
