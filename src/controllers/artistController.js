const {
  searchArtists,
  getArtist
} = require("../services/artistService");

const {
  success,
  error
} = require("../utils/response");

async function search(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return error(res, "Search query is required", 400);
    }

    const artists = await searchArtists(query);

    return success(
      res,
      {
        total: artists.length,
        results: artists
      },
      "Artists fetched successfully"
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

async function details(req, res) {
  try {
    const artist = await getArtist(req.params.id);

    return success(
      res,
      artist,
      "Artist details fetched successfully"
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

module.exports = {
  search,
  details
};
