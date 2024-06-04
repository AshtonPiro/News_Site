const category = "technology";
const url = `https://inshorts.deta.dev/news?category=${category}`;

async function fetchTechNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      console.log("Technology News:");
      for (const article of data.data) {
        console.log(`  - ${article.title}`);
      }
    } else {
      console.error("Error fetching news:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchTechNews();
