document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('cards-container');
    const searchButton = document.getElementById('search-button');
    const searchText = document.getElementById('search-text');

    // Fetch and display news articles from an RSS feed
    async function fetchNews(category = '') {
        newsContainer.innerHTML = ''; // Clear previous news
        const parser = new DOMParser();

        // Construct the URL for the RSS feed
        let url = `https://news.google.com/rss/search?q=${category}&hl=en-US&gl=US&ceid=US:en`;

        try {
            const response = await fetch(url);
            const text = await response.text();
            const xml = parser.parseFromString(text, 'text/xml');

            const items = xml.querySelectorAll('item');
            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                const description = item.querySelector('description').textContent;
                const pubDate = new Date(item.querySelector('pubDate').textContent);
                const source = item.querySelector('source') ? item.querySelector('source').textContent : 'Unknown Source';

                // Create a news card
                const template = document.getElementById('template-news-card').content.cloneNode(true);
                template.querySelector('#news-title').textContent = title;
                template.querySelector('#news-desc').textContent = description;
                template.querySelector('#news-source').textContent = `${source} ${pubDate.toLocaleDateString()}`;
                template.querySelector('a').href = link;

                newsContainer.appendChild(template);
            });
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    // Event listeners for navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.id;
            fetchNews(category);
        });
    });

    // Event listener for the search button
    searchButton.addEventListener('click', () => {
        const query = searchText.value.trim();
        if (query) {
            fetchNews(query);
        }
    });

    // Initial fetch
    fetchNews();
});
