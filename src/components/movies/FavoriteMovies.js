import React, { useEffect } from 'react'
import {
	Center,
	Box,
	Heading,
	Container
} from '@chakra-ui/react'
import MovieRow from './MovieRow'
import movieState, { favoriteState } from '../../atoms/movieState';
import { useRecoilState } from 'recoil'
import _ from 'lodash'

export default function FavoriteMovies() {
	const [movies] = useRecoilState(movieState)
	const [FavoriteMovies] = useRecoilState(favoriteState)

	return (
		<Container maxW='100%' centerContent>
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
