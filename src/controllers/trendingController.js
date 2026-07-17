const { getTrendingSongs } = require("../services/trendingService");
const { success, error } = require("../utils/response");

async function trending(req, res) {
  try {
    const songs = await getTrendingSongs();

    return success(
      res,
      {
        total: songs.length,
        results: songs
      },
      "Trending songs fetched successfully"
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

module.exports = {
  trending
};
