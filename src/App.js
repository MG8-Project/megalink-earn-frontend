import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Footer from './components/footer';
import './styles/Home.css';
import './styles/footer.css';
import './styles/header.css';
import './styles/nav.css';
import './styles/pages.css';

function App () {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route psth="/leaderboard" element={<Leaderboard />}></Route>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
  );
}

export default App;
