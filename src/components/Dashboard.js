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
				<Box mt="3">
					<Input 
						placeholder='Search' 
						size='lg'
					/>
				</Box>
				<MovieList />
			</Container>
		</>
	)
}
