import React, { useEffect } from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';

import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import MovieDetails from './components/movies/MovieDetails';
import FavoriteMovies from './components/movies/FavoriteMovies';

function App() {
  return (
		<BrowserRouter>
			<RecoilRoot>
				<ChakraProvider theme={theme}>
					<NavBar />

					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="movies/:movieId" element={<MovieDetails />} />
						<Route path="favorites" element={<FavoriteMovies />} />
					</Routes>
					
				</ChakraProvider>
			</RecoilRoot>
		</BrowserRouter>		
  );
}

export default App;
