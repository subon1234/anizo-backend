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
        format.vcodec === "none"
    )
    .sort((a, b) => (b.abr || 0) - (a.abr || 0));

  const bestAudio = audioFormats[0] || null;

  const song = {
    videoId,
    title: info.title,
    artist: info.uploader,
    duration: info.duration,
    thumbnail: info.thumbnail,

    stream: {
      url: bestAudio?.url || null,
      bitrate: bestAudio?.abr || null,
      codec: bestAudio?.acodec || null,
      container: bestAudio?.ext || null
    }
  };

  cache.set(cacheKey, song, 300);

  return song;
}

module.exports = {
  getSong
};
