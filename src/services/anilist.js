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
  await Promise.all(animeList.map(anime => {
    return ani.media.anime(anime.id).then(animeInfo => {
      recommendations.push(...animeInfo.recommendations.slice(0, getRecommendationAmount(animeList.length)))
    }).catch(() => {})
  }))

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
  // TODO: finish this
  const userLists = await ani.lists.anime(userId);
}

function getRecommendationAmount(favoriteAmount) {
  if (favoriteAmount <= 5) {
    return 5;
  }
  if (favoriteAmount <= 9) {
    return 3;
  }
  if (favoriteAmount <= 15) {
    return 2;
  }
  return 1;
}

module.exports = {
  getFavoriteAnimeList,
  getFavoriteMangaList,
  getRecommendationsForAnimeList,
  filterAlreadyWatchedStuff,
};
