const cache = require("../cache/memoryCache");
const { searchSongs } = require("./searchService");

async function getRecommendations(query = "Top Music") {
  const cacheKey = `recommendations:${query}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const songs = await searchSongs(query);

  const recommendations = songs
    .sort(() => Math.random() - 0.5)
    .slice(0, 15);

  cache.set(cacheKey, recommendations, 600);

  return recommendations;
}

async function getRelatedSongs(title, artist) {
  const query = `${title} ${artist}`;

  const cacheKey = `related:${query}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const songs = await searchSongs(query);

  const related = songs.slice(0, 10);

  cache.set(cacheKey, related, 600);

  return related;
}

module.exports = {
  getRecommendations,
  getRelatedSongs
};
