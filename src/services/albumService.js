const cache = require("../cache/memoryCache");
const { searchSongs } = require("./searchService");

async function searchAlbums(query) {
  const cacheKey = `albums:${query}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const songs = await searchSongs(query);

  const albumMap = new Map();

  songs.forEach((song) => {
    const album = song.album || "Unknown Album";

    if (!albumMap.has(album)) {
      albumMap.set(album, {
        id: encodeURIComponent(album),
        title: album,
        artist: song.artist || "Unknown Artist",
        cover: song.thumbnail,
        year: song.year || null
      });
    }
  });

  const albums = Array.from(albumMap.values());

  cache.set(cacheKey, albums, 600);

  return albums;
}

async function getAlbum(id) {
  const albumName = decodeURIComponent(id);

  const songs = await searchSongs(albumName);

  return {
    id,
    title: albumName,
    artist: songs[0]?.artist || "Unknown Artist",
    cover: songs[0]?.thumbnail || null,
    tracks: songs
  };
}

module.exports = {
  searchAlbums,
  getAlbum
};
