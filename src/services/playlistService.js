const ytdlp = require("yt-dlp-exec");

async function getPlaylist(id) {
  const info = await ytdlp(
    `https://www.youtube.com/playlist?list=${id}`,
    {
      dumpSingleJson: true,
      flatPlaylist: true,
      noWarnings: true,
      noCheckCertificates: true
    }
  );

  const thumbnail = Array.isArray(info.thumbnails)
    ? info.thumbnails[info.thumbnails.length - 1]?.url
    : info.thumbnail || null;

  return {
    id: info.id || id,
    title: info.title || "",
    uploader: info.uploader || info.channel || "",
    thumbnail,
    totalTracks: (info.entries || []).length,
    tracks: (info.entries || []).map(video => ({
      videoId: video.id,
      title: video.title || "",
      duration: video.duration || 0
    }))
  };
}

module.exports = { getPlaylist };