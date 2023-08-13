import React from 'react'
import { 
	Container,
	Button
} from '@chakra-ui/react'
import { TriangleUpIcon } from '@chakra-ui/icons'
import MovieList from './movies/MovieList'

export default function Dashboard() {
	function handleScrollToTop(){
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
	return (
		<>
			<Container maxW="100%" centerContent>
				<MovieList />
				<Button onClick={handleScrollToTop} id="scrollTop" title="Go to top"><TriangleUpIcon size='lg' /></Button>
			</Container>
		</>
	)
}
