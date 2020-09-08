const Anilist = require('anilist-node');

const ani = new Anilist();

async function getFavoriteAnimeList(userId) {
  const profile = await ani.user.all(userId);
  return profile.favourites.anime;
}

async function getFavoriteMangaList(userId) {
  const profile = await ani.user.all(userId);
  return profile.favorites.manga;
}

async function getRecommendationsForAnimeList(animeList) {
  let recommendations = [];
  // TODO: Promise.all()
  for (const anime of animeList) {
    const animeInfo = await ani.media.anime(anime.id);
    recommendations = [...recommendations, ...animeInfo.recommendations.slice(0, 2)];
  }

  recommendations.sort((a, b) => {
    return a.title - b.title;
  });

  const result = new Map();

  for (const rec of recommendations) {
    result.set(rec.mediaRecommendation.id, rec.mediaRecommendation);
  }

  return [...result.values()];
}

async function filterAlreadyWatchedStuff(list, userId) {
  const userLists = await ani.lists.anime(userId);
  
}

module.exports = {
  getFavoriteAnimeList,
  getFavoriteMangaList,
  getRecommendationsForAnimeList,
  filterAlreadyWatchedStuff,
};
