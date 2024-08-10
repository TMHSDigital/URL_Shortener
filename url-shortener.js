function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    if (!longUrl) {
        alert('Please enter a URL');
        return;
    }

    const shortCode = generateShortCode();
    const shortUrl = `${window.location.origin}?${shortCode}`;

    StorageManager.addUrl(shortCode, longUrl);

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
    const urls = StorageManager.getAllUrls();
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
    StorageManager.deleteUrl(shortCode);
    displayUrlList();
}

// Check if this is a shortened URL and redirect if necessary
(function() {
    const shortCode = window.location.search.slice(1);
    if (shortCode) {
        const longUrl = StorageManager.getUrl(shortCode);
        if (longUrl) {
            window.location.href = longUrl;
        } else {
            alert('Short URL not found');
        }
    } else {
        displayUrlList();
    }
})();
