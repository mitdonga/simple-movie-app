import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
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
	Heading,
	SimpleGrid,
	StackDivider,
	Badge,
	List,
	ListItem,
	Button,
	Show
} from '@chakra-ui/react'
import { formateReleaseDate } from '../../shared/common';

export default function MovieDetails() {
	const navigate = useNavigate();
	const { movieId } = useParams()
	const [movie, setMovie] = useState(null)

	// fetchMovieDetails will fetch the details of the movie
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
					// Once we get the response update the movie state
					setMovie(response.data)
				}
			} catch (error) {
				console.error(error);
			}
	}

	useEffect(() => {
		if (movieId) {
			// On the component mount call the API to fetch details of movie
			fetchMovieDetails()
		}
	}, [])

	return (
		<>
			{movie ? 
				<Container maxW={'7xl'}>
					<Show above='sm'>
						<Button 
							style={{ float: 'right', marginTop: '20px' }}
							onClick={() => navigate(-1)}
						>
							Back
						</Button>
					</Show>
					<SimpleGrid
						columns={{ base: 1, lg: 2 }}
						spacing={{ base: 8, md: 10 }}
						py={{ base: 8, md: 10 }}>
						<Flex>
							<Image
								rounded={'md'}
								alt={movie.title}
								src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'} 
								align={'center'}
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
									fontSize={'3xl'}>
									<Badge colorScheme='green' fontSize='0.5em' >Release Date - {formateReleaseDate(movie.release_date)}</Badge>
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
										fontWeight={'600'}
										textTransform={'uppercase'}
										mb={'6'}>
										Details
									</Text>
		
									<List spacing={2}>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
											Status:
											</Text>{' '}
											{movie.status}
										</ListItem>
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
											{movie.genres.length > 0 ? movie.genres.map(genere => genere.name).join(", ") : " -"}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
											Spoken Languages:
											</Text>{' '}
											{movie.spoken_languages?.length > 0 ? movie.spoken_languages.map(l => l.name).join(", ") : " -"}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
											Production Companies:
											</Text>{' '}
											{movie.production_companies?.length > 0 ? movie.production_companies.map(c => c.name).join(", ") : " -"}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
											Production Countries:
											</Text>{' '}
											{movie.production_countries?.length > 0 ? movie.production_countries.map(c => c.name).join(", ") : " -"}
										</ListItem>
										<ListItem>
											<Text as={'span'} fontWeight={'bold'}>
												Popularity:
											</Text>{' '}
											{movie.popularity}
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
