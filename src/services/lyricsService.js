const axios = require("axios");

async function getLyrics(title, artist) {
  const url =
    `https://lrclib.net/api/get?track_name=${encodeURIComponent(title)}&artist_name=${encodeURIComponent(artist)}`;

  const { data } = await axios.get(url);

  return {
    title: data.trackName,
    artist: data.artistName,
    album: data.albumName,
    duration: data.duration,
    syncedLyrics: data.syncedLyrics,
    plainLyrics: data.plainLyrics
  };
}

module.exports = { getLyrics };