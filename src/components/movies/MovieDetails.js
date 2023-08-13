import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
	Spinner,
	Box,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	VStack,
	Button,
	Heading,
	SimpleGrid,
	StackDivider,
	Badge,
	List,
	ListItem,
} from '@chakra-ui/react'
import { MdLocalShipping } from 'react-icons/md'
import { formateReleaseDate } from '../../shared/dateFunctions';

export default function MovieDetails() {
	const { movieId } = useParams()
	const [movie, setMovie] = useState(null)

	async function fetchMovieDetails() {
			const options = {
				method: 'GET',
				url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWYyMjI4NWNkNjNiZWRmNTJjZWUzZTgzNjZjZjhlZSIsInN1YiI6IjY0ZDUxZGQxZjE0ZGFkMDEzYThhODQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r9erRGRieyDl8130fEVDeVJUJV-h-Y8uAWKm-D23eCw'
				}
			};
			try {
				const response = await axios(options);
				if (response?.data) {
					setMovie(response.data)
				}
			} catch (error) {
				console.error(error);
			}
	}

	useEffect(() => {
		if (movieId) {
			fetchMovieDetails()
		}
	}, [movieId])

	return (
		<>
			{movie ? 
				<Container maxW={'7xl'}>
					<SimpleGrid
						columns={{ base: 1, lg: 2 }}
						spacing={{ base: 8, md: 10 }}
						py={{ base: 18, md: 24 }}>
						<Flex>
							<Image
								rounded={'md'}
								alt={movie.title}
								src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://www.namepros.com/attachments/empty-png.89209/'} 
								// fit={'cover'}
								align={'center'}
								// w={'100%'}
								h={{ base: '100%', sm: '400px', lg: '500px' }}
							/>
						</Flex>
						<Stack spacing={{ base: 6, md: 10 }}>
							<Box as={'header'}>
								<Heading
									lineHeight={1.1}
									fontWeight={600}
									fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
									{movie.title}
								</Heading>
								<Text
									fontWeight={300}
									fontSize={'4xl'}>
									<Badge colorScheme='green'>Release Date - {formateReleaseDate(movie.release_date)}</Badge>
								</Text>
							</Box>
		
							<Stack
								spacing={{ base: 4, sm: 6 }}
								direction={'column'}
								divider={
									<StackDivider/>
								}>
								<VStack spacing={{ base: 4, sm: 6 }}>
									<Text fontSize={'lg'}>
										{movie.overview}
									</Text>
								</VStack>
								<Box>
									<Text
										fontSize={{ base: '16px', lg: '18px' }}
										fontWeight={'500'}
										textTransform={'uppercase'}
										mb={'4'}>
										Details
									</Text>
		
									<List spacing={2}>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
												Original Language:
											</Text>{' '}
											{movie.original_language?.toUpperCase()}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
												Original Title:
											</Text>{' '}
											{movie.original_language?.toUpperCase()}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
												Genres:
											</Text>{' '}
											{movie.genres.length > 0 ? movie.genres.map(genere => `${genere.name} `) : " -"}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
											Spoken Languages:
											</Text>{' '}
											{movie.spoken_languages?.length > 0 ? movie.spoken_languages.map(l => `${l.name} `) : " -"}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
												Popularity:
											</Text>{' '}
											{movie.popularity}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
											Status:
											</Text>{' '}
											{movie.status}
										</ListItem>
									</List>
								</Box>
							</Stack>
						</Stack>
					</SimpleGrid>
				</Container>
				: <center><Spinner size='xl' mt={20}/></center>
			}
		</>
	)
}