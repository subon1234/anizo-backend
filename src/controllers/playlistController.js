const {
  getAllPlaylists,
  createPlaylist,
  addSong,
  removeSong,
  deletePlaylist
} = require("../services/playlistService");

const {
  validatePlaylistName
} = require("../utils/validator");

const {
  success,
  error
} = require("../utils/response");

async function getPlaylists(req, res) {
  try {
    const playlists = getAllPlaylists();

    return success(
      res,
      {
        total: playlists.length,
        results: playlists
      },
      "Playlists fetched successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
}

async function create(req, res) {
  try {
    const { name } = req.body;

    const validation = validatePlaylistName(name);

    if (!validation.valid) {
      return error(res, validation.message, 400);
    }

    const playlist = createPlaylist(name);

    return success(
      res,
      playlist,
      "Playlist created successfully",
      201
    );
  } catch (err) {
    return error(res, err.message);
  }
}

async function add(req, res) {
  try {
    const { id } = req.params;
    const song = req.body;

    const playlist = addSong(id, song);

    if (!playlist) {
      return error(res, "Playlist not found", 404);
    }

    return success(
      res,
      playlist,
      "Song added successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
}

async function remove(req, res) {
  try {
    const { id, videoId } = req.params;

    const playlist = removeSong(id, videoId);

    if (!playlist) {
      return error(res, "Playlist not found", 404);
    }

    return success(
      res,
      playlist,
      "Song removed successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
}

async function removePlaylist(req, res) {
  try {
    const { id } = req.params;

    const deleted = deletePlaylist(id);

    if (!deleted) {
      return error(res, "Playlist not found", 404);
    }

    return success(
      res,
      {},
      "Playlist deleted successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
}

module.exports = {
  getPlaylists,
  create,
  add,
  remove,
  removePlaylist
};
