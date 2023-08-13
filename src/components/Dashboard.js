import React from 'react'
import { 
	Heading,
	Container,
	Input,
	Flex,
	Box,
	Spacer
} from '@chakra-ui/react'
import MovieList from './movies/MovieList'

export default function Dashboard() {

	return (
		<>
			<Container maxW='100%' centerContent>
				<MovieList />
			</Container>
		</>
	)
}
