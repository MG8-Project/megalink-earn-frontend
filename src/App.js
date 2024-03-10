import React from 'react';
import Header from './components/header';
import Home from './pages/Home';
import Footer from './components/footer';
import './styles/Home.css';
import './styles/footer.css';
import './styles/header.css';
import './styles/nav.css';
import './styles/pages.css';

function App () {
	return (
		<div className="App">
			<Header />
			<Home />
			<Footer />
		</div>
  );
}

export default App;
