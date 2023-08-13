import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import MovieRow from './MovieRow';
import { 
	Spinner,
	Container,
	Input,
	Box,
} from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilState } from 'recoil';
import movieState from '../../atoms/movieState';
import paginationState from '../../atoms/paginationState';
import _ from 'lodash';
import { CloseIcon } from '@chakra-ui/icons'

export default function MovieList() {
	const queryInput = useRef(null)
	const [currentPage, setCurrentPage] = useRecoilState(paginationState)
	const [query, setQuery] = useState('')
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
			headers: requestHeader
		};
		try {
			const response = await axios(options);
			if (response.data?.results?.length > 0) {
				currentPage === 1 ? setMovies(response.data.results) : setMovies(_.unionBy([...movies, ...response.data.results], 'id'))
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchMoviesBasedOnQuery() {
		const options = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/search/movie',
			params: {
				query: query,
				include_adult: false,
				language: 'en-US',
				page: currentPage
			},
			headers: requestHeader
		};
		try {
			const response = await axios(options);
			if (response.data?.results?.length > 0) {
				currentPage === 1 ? setMovies(response.data.results) : setMovies(_.unionBy([...movies, ...response.data.results], 'id'))
			}
		} catch (error) {
			console.error(error);
		}
	}

	function callAPI() {
		if (query.length > 0) fetchMoviesBasedOnQuery()
		else fetchMovies();
	}

	useEffect(() => {
		callAPI()
	}, [currentPage])

	useEffect(() => {
		if (currentPage === 1) callAPI()
		else setCurrentPage(1)
	}, [query])

	function fetchNextPage(){
		setCurrentPage(currentPage + 1)
	}

	function handleQuery(event){
		setQuery(event.target.value);
	}

	function clearQueryInput(){
		setQuery('')
		queryInput.current.value = '';
	}

	useEffect(() => {
		queryInput.current.addEventListener('input', _.debounce(handleQuery, 1000))
	}, [])

	return (
		<>
			<Container maxW="100%" width={["100%", "80%", "60%"]} centerContent>
				<Box>
					<Input 
						width="300px" my={5}
						ref={queryInput} 
						placeholder='Search Movie'
					/>
					<CloseIcon 
						ml='2' color='red' 
						style={{ cursor: 'pointer'}} 
						onClick={clearQueryInput}
					/>
				</Box>
				{movies.length > 0 ?
					<InfiniteScroll
						dataLength={movies.length}
						next={fetchNextPage}
						hasMore={true}
						loader={<center><Spinner size='xl' mt={20}/></center>}
						endMessage={<p>No more data to load.</p>}
						style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: '100%', overflow: 'hidden' }}
					>
						{movies.map((movie) => 
							<MovieRow
								movie={movie} 
								key={movie.id}
							/>
						)}
					</InfiniteScroll> :
					<Spinner size='xl' mt={20}/>
				}
			</Container>
		</>
	)
}

function getTodayDate(){
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

const requestHeader = {
	accept: 'application/json',
	Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWYyMjI4NWNkNjNiZWRmNTJjZWUzZTgzNjZjZjhlZSIsInN1YiI6IjY0ZDUxZGQxZjE0ZGFkMDEzYThhODQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r9erRGRieyDl8130fEVDeVJUJV-h-Y8uAWKm-D23eCw'
}
