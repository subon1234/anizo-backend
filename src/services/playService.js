const ytdlp = require("yt-dlp-exec");
const { WATCH_URL, YTDLP_OPTIONS } = require("../config/youtube");
const cache = require("../cache/memoryCache");

async function getSong(videoId) {
  const cacheKey = `play:${videoId}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const info = await ytdlp(
    `${WATCH_URL}${videoId}`,
    YTDLP_OPTIONS
  );

  const audioFormats = (info.formats || [])
    .filter(
      format =>
        format.acodec !== "none" &&
        format.vcodec === "none" &&
        format.url
    )
    .sort((a, b) => (b.abr || 0) - (a.abr || 0));

  const streams = audioFormats.map(format => ({
    quality: `${format.abr || "Unknown"} kbps`,
    bitrate: format.abr || null,
    codec: format.acodec || null,
    container: format.ext || null,
    url: format.url
  }));

  const bestAudio = streams[0] || null;

  const thumbnails = info.thumbnails || [];

  const artwork =
    thumbnails.length > 0
      ? thumbnails[thumbnails.length - 1].url
      : info.thumbnail;

  const song = {
    success: true,

    videoId,

    title: info.title || "",

    artist: {
      name: info.uploader || "",
      id: info.channel_id || "",
      thumbnail: artwork
    },

    album: info.album || null,

    duration: info.duration || 0,

    views: info.view_count || 0,

    uploadDate: info.upload_date || null,

    description: info.description || "",

    artwork,

    lyricsAvailable: false,

    stream: bestAudio,

    streams
  };

  cache.set(cacheKey, song, 300);

  return song;
}

module.exports = {
  getSong
};
