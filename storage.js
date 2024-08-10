const STORAGE_KEY = 'shortUrls';

const StorageManager = {
    saveUrls: function(urls) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    },

    loadUrls: function() {
        const storedUrls = localStorage.getItem(STORAGE_KEY);
        return storedUrls ? JSON.parse(storedUrls) : {};
    },

    addUrl: function(shortCode, longUrl) {
        const urls = this.loadUrls();
        urls[shortCode] = longUrl;
        this.saveUrls(urls);
    },

    getUrl: function(shortCode) {
        const urls = this.loadUrls();
        return urls[shortCode];
    },

    deleteUrl: function(shortCode) {
        const urls = this.loadUrls();
        delete urls[shortCode];
        this.saveUrls(urls);
    },

    getAllUrls: function() {
        return this.loadUrls();
    }
};