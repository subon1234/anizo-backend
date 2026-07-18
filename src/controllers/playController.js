const { getSong } = require("../services/playService");
const { getLyrics } = require("../services/lyricsService");
const { validateVideoId } = require("../utils/validator");
const { success, error } = require("../utils/response");

async function play(req, res) {
  try {

    const id = req.query.id;

    const validation = validateVideoId(id);

    if (!validation.valid) {
      return error(res, validation.message, 400);
    }

    const song = await getSong(id);

    let lyrics = {
      synced: null,
      plain: null
    };

    try {

      const lyricData = await getLyrics(
        song.title,
        song.artist.name
      );

      lyrics = {
        synced: lyricData.syncedLyrics,
        plain: lyricData.plainLyrics
      };

    } catch (e) {
      console.log("Lyrics not found");
    }

    return success(
      res,
      {
        ...song,
        lyrics
      },
      "Song loaded successfully"
    );

  } catch (err) {

    return error(
      res,
      err.message,
      500
    );

  }
}

module.exports = {
  play
};
