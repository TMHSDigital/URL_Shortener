class UrlShortener {
    constructor() {
        this.appElement = document.getElementById('app');
        this.render();
        this.addEventListeners();
    }

    render() {
        this.appElement.innerHTML = Components.urlShortener + Components.urlList;
        this.displayUrlList();
    }

    addEventListeners() {
        document.getElementById('shortenButton').addEventListener('click', () => this.shortenUrl());
        document.getElementById('urlListItems').addEventListener('click', (e) => {
            if (e.target.classList.contains('deleteButton')) {
                this.deleteUrl(e.target.dataset.shortcode);
            }
        });
    }

    shortenUrl() {
        const longUrl = document.getElementById('longUrl').value;
        if (!longUrl) {
            alert('Please enter a URL');
            return;
        }

        const shortCode = this.generateShortCode();
        const shortUrl = `${window.location.origin}?${shortCode}`;

        StorageManager.addUrl(shortCode, longUrl);

        this.displayResult(shortUrl);
        this.displayUrlList();
    }

    generateShortCode() {
        return Math.random().toString(36).substring(2, 8);
    }

    displayResult(shortUrl) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>Shortened URL:</p>
            <a href="${shortUrl}" target="_blank">${shortUrl}</a>
        `;
    }

    displayUrlList() {
        const urlListItems = document.getElementById('urlListItems');
        urlListItems.innerHTML = '';
        const urls = StorageManager.getAllUrls();
        for (const [shortCode, longUrl] of Object.entries(urls)) {
            const shortUrl = `${window.location.origin}?${shortCode}`;
            urlListItems.innerHTML += Components.urlListItem(shortUrl, longUrl, shortCode);
        }
    }

    deleteUrl(shortCode) {
        StorageManager.deleteUrl(shortCode);
        this.displayUrlList();
    }
}

// Initialize the app
const app = new UrlShortener();

// Handle URL redirects
(function() {
    const shortCode = window.location.search.slice(1);
    if (shortCode) {
        const longUrl = StorageManager.getUrl(shortCode);
        if (longUrl) {
            window.location.href = longUrl;
        } else {
            alert('Short URL not found');
        }
    }
})();