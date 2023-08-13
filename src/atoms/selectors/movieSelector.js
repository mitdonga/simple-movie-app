import { selector } from "recoil";
import movieState, { favoriteState } from "../movieState";

export const moviesSelector = selector({
	key: 'movies', 
	get: ({get}) => {
		const movies = get(movieState);
		return movies;
	},
});

export const favoritesSelector = selector({
	key: 'favorites', 
	get: ({get}) => {
		const favorites = get(favoriteState);
		return favorites;
	},
});