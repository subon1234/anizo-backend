const cache = require("../cache/memoryCache");

const playlists = [];

function getAllPlaylists() {
  const cacheKey = "playlists";

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  cache.set(cacheKey, playlists, 300);

  return playlists;
}

function getPlaylist(id) {
  return playlists.find((playlist) => playlist.id === id);
}

function createPlaylist(name) {
  const playlist = {
    id: Date.now().toString(),
    name,
    songs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  playlists.push(playlist);

  cache.set("playlists", playlists, 300);

  return playlist;
}

function addSong(id, song) {
  const playlist = getPlaylist(id);

  if (!playlist) {
    return null;
  }

  playlist.songs.push(song);
  playlist.updatedAt = new Date().toISOString();

  cache.set("playlists", playlists, 300);

  return playlist;
}

function removeSong(id, videoId) {
  const playlist = getPlaylist(id);

  if (!playlist) {
    return null;
  }

  playlist.songs = playlist.songs.filter(
    song => song.videoId !== videoId
  );

  playlist.updatedAt = new Date().toISOString();

  cache.set("playlists", playlists, 300);

  return playlist;
}

function deletePlaylist(id) {
  const index = playlists.findIndex(
    playlist => playlist.id === id
  );

  if (index === -1) {
    return false;
  }

  playlists.splice(index, 1);

  cache.set("playlists", playlists, 300);

  return true;
}

module.exports = {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  addSong,
  removeSong,
  deletePlaylist
};
