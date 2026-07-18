const axios = require("axios");
const cache = require("../cache/memoryCache");

async function getLyrics(title, artist) {
  const cacheKey = `lyrics:${title}:${artist}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const url =
      `https://lrclib.net/api/get?track_name=${encodeURIComponent(title)}&artist_name=${encodeURIComponent(artist)}`;

    const { data } = await axios.get(url, {
      timeout: 10000
    });

    const lyrics = {
      success: true,

      title: data.trackName || title,

      artist: data.artistName || artist,

      album: data.albumName || null,

      duration: data.duration || null,

      syncedLyrics: data.syncedLyrics || null,

      plainLyrics: data.plainLyrics || null,

      source: "LRCLIB"
    };

    cache.set(cacheKey, lyrics, 3600);

    return lyrics;
  } catch (err) {
    return {
      success: false,

      title,

      artist,

      album: null,

      duration: null,

      syncedLyrics: null,

      plainLyrics: null,

      source: null,

      message: "Lyrics not available"
    };
  }
}

module.exports = {
  getLyrics
};
