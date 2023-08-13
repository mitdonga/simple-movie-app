import React from 'react'
import { 
	Heading,
	Box,
	Flex,
	Spacer,
	Stack,
	Text,
	Button,
	Image,
	Badge
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { formateReleaseDate } from '../../shared/dateFunctions'

export default function MovieRow({ movie, isFavorite, markFavorite }) {
	const navigate = useNavigate()

	function showMovieDetails(){
		navigate(`/movies/${movie.id}`)
	}
	return (
		<>
			<Stack
				width="80%" 
				spacing={3} direction='row' my={3} 
				boxShadow='md' p='3' 
				rounded='md'
				className='movie-row'
				onClick={showMovieDetails}
			>
				<Box width="120px">
					<Image
						boxSize='100px'
						objectFit='cover'
						src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://www.namepros.com/attachments/empty-png.89209/'} 
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