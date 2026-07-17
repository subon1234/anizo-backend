const cache = require("../cache/memoryCache");
const { getYoutube } = require("./youtubeService");

async function searchSongs(query) {
  const cacheKey = `search:${query.toLowerCase()}`;

  // Return cached result
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const yt = await getYoutube();

  const result = await yt.search(query, {
    type: "video"
  });

  const songs = result.results
    .filter(item => item.type === "Video")
    .map(item => ({
      videoId: item.id,
      title: item.title?.text || item.title || "",
      artist:
        item.author?.name ||
        item.authors?.[0]?.name ||
        "Unknown",
      duration:
        item.duration?.text ||
        item.duration ||
        "",
      thumbnail:
        item.thumbnails?.[0]?.url ||
        item.thumbnail?.[0]?.url ||
        ""
    }));

  // Cache for 5 minutes
  cache.set(cacheKey, songs, 300);

  return songs;
}

module.exports = {
  searchSongs
};
