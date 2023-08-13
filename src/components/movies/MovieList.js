import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import MovieRow from './MovieRow';
import { 
	Spinner,
	Center
} from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilState } from 'recoil';
import movieState, { favoriteState } from '../../atoms/movieState';
import paginationState from '../../atoms/paginationState';
import _ from 'lodash/array';

export default function MovieList() {
	const [currentPage, setCurrentPage] = useRecoilState(paginationState)
	const [favorites, setFavorites] = useRecoilState(favoriteState)
	const [movies, setMovies] = useRecoilState(movieState)

	async function fetchMovies() {
		const options = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/discover/movie',
			params: {
				include_adult: 'false',
				include_video: 'false',
				language: 'en-US',
				with_original_language: 'en',
				page: currentPage,
				'release_date.lte': getTodayDate(),
				sort_by: 'release_date.desc',
			},
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWYyMjI4NWNkNjNiZWRmNTJjZWUzZTgzNjZjZjhlZSIsInN1YiI6IjY0ZDUxZGQxZjE0ZGFkMDEzYThhODQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r9erRGRieyDl8130fEVDeVJUJV-h-Y8uAWKm-D23eCw'
			}
		};
		try {
			const response = await axios(options);
			if (response.data?.results?.length > 0) {
				setMovies(_.unionBy([...movies, ...response.data.results], 'id'))
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchMovies();
	}, [currentPage])

	function markFavorite(movieId){
		let favMovies = localStorage.getItem('favorite movies')
		let movieIds = []
		if (favMovies) {
			movieIds = JSON.parse(favMovies)
		}
		if (movieIds.includes(movieId)){
			movieIds = movieIds.filter(id => id != movieId)
		} else movieIds.push(movieId)
		setFavorites(movieIds)
		localStorage.setItem('favorite movies', JSON.stringify(movieIds))
	}

	function isFavorite(movieId){
		return favorites.find(id => id == movieId) ? true : false
	}

	function fetchNextPage(){
		setCurrentPage(currentPage + 1)
	}

	return (
		<Center>
			<InfiniteScroll
				dataLength={movies.length}
				next={fetchNextPage}
				hasMore={true}
				loader={<Spinner size='xl' mt={20}/>}
				endMessage={<p>No more data to load.</p>}
				style={{ margin: 'auto', width: '100%' }}
			>
				{movies.map((movie) => 
					<MovieRow 
						movie={movie} 
						key={movie.id}
						isFavorite={isFavorite}
						markFavorite={markFavorite}
					/>
				)}
			</InfiniteScroll>
		</Center>
	)
}

function getTodayDate(){
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
