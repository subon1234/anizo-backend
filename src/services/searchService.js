const cache = require("../cache/memoryCache");
const { getYoutube } = require("./youtubeService");

async function searchSongs(query) {
  if (!query || !query.trim()) {
    return [];
  }

  const cacheKey = `search:${query.trim().toLowerCase()}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const yt = await getYoutube();

  const result = await yt.search(query, {
    type: "video"
  });

  const songs = (result.results || [])
    .filter(item => item.type === "Video")
    .map(item => {
      const thumbnails = item.thumbnails || item.thumbnail || [];

      const artwork =
        thumbnails.length > 0
          ? thumbnails[thumbnails.length - 1].url
          : "";

      return {
        videoId: item.id,

        title:
          item.title?.text ||
          item.title ||
          "Unknown Title",

        artist: {
          name:
            item.author?.name ||
            item.authors?.[0]?.name ||
            "Unknown Artist",

          id:
            item.author?.id ||
            item.author?.channel_id ||
            null
        },

        duration:
          item.duration?.text ||
          item.duration ||
          "--:--",

        artwork,

        thumbnail: artwork,

        album: null,

        views:
          item.view_count ||
          item.views ||
          null,

        uploadDate:
          item.published?.text ||
          item.published ||
          null,

        explicit: false,

        playable: true
      };
    });

  cache.set(cacheKey, songs, 300);

  return songs;
}

module.exports = {
  searchSongs
};
