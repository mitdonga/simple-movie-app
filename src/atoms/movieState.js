import { atom } from 'recoil';

export default atom({
  key: 'movies',
  default: [], 
});

export const favoriteState = atom({
	key: 'favorites',
	default: localStorage.getItem('favorite movies') ? JSON.parse(localStorage.getItem('favorite movies')) : [], 
})

export const queryState = atom({
	key: 'query',
	default: ''
})