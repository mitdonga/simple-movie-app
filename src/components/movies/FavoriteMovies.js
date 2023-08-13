import React from 'react'
import {
	Center,
	Box,
	Heading,
	Container
} from '@chakra-ui/react'
import MovieRow from './MovieRow'
import { favoriteState } from '../../atoms/movieState';
import { useRecoilState } from 'recoil'
import _ from 'lodash'

export default function FavoriteMovies() {

	// Favorite Movies will be fetched from the browser's local storage
	const [FavoriteMovies] = useRecoilState(favoriteState)

	return (
		<Container maxW="100%" width={["100%", "80%", "60%"]} centerContent>
			<Heading mt={3}>Favorite Movies</Heading>
			{FavoriteMovies.map((movie) => 
				<MovieRow 
					movie={movie} 
					key={movie.id}
				/>
			)}
		</Container>
	)
}
