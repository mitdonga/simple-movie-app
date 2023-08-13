import React from 'react'
import { 
	Box,
	Flex,
	Spacer,
	Stack,
	Text,
	Image,
	Badge
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { formateReleaseDate } from '../../shared/common'
import { favoriteState } from '../../atoms/movieState'
import _ from 'lodash'

export default function MovieRow({ movie }) {
	const [favorites, setFavorites] = useRecoilState(favoriteState)
	const navigate = useNavigate()

	function showMovieDetails(){
		navigate(`/movies/${movie.id}`)
	}

	function isFavorite(){
		return _.find(favorites, { id: movie.id }) ? true : false
	}

	// When user click on favorite button, this function will be called
	// If movie was already marked as favorite, then remove from favorites, else add to favorites
	function markFavorite(){
		let favoriteMovies = favorites
		if (_.find(favoriteMovies, { id: movie.id })){
			favoriteMovies = _.filter(favoriteMovies, function(o) { return o.id != movie.id; })
		} else {
			favoriteMovies = [...favoriteMovies, movie]
		}
		setFavorites(favoriteMovies)
		localStorage.setItem('favorite movies', JSON.stringify(favoriteMovies))
	}

	return (
		<>
			<Stack
				width="95%" 
				spacing={3} direction='row' my={3} 
				boxShadow='lg' p='3' 
				rounded='md'
				className='movie-row'
				onClick={showMovieDetails}
			>
				<Box width="120px">
					<Image
						boxSize='100px'
						objectFit='cover'
						src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'} 
					/>
				</Box>	
				<Box width="100%">
					<Flex>
						<Box>
							<Text fontWeight="semibold">{movie.title}</Text>
						</Box>
						<Spacer />
						<Box
							onClick={(e) => {
								e.stopPropagation();
								markFavorite(movie.id);
							}}
						>
							<StarIcon color={isFavorite(movie.id) ? 'red' : '#DADADA'} w={5} h={5} />
						</Box>
					</Flex>
					<Text>
						<Badge colorScheme='green'>{formateReleaseDate(movie.release_date)}</Badge>
					</Text>
					<Box mt={2} width="100%">
						<Text fontSize={{ base: 'sm' }} textAlign={'left'}>
							{movie.overview?.length > 250 ? movie.overview.slice(0,250) + "...." : movie.overview }
						</Text>
					</Box>
				</Box>
    	</Stack>
		</>
	)
}
