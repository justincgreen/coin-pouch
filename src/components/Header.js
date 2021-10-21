import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import coinPouch from '../images/coin-pouch.png';
 
const Header = ({search, setSearch, searchDisplay, setSearchDisplay, darkMode, setDarkMode, globalData, setGlobalData}) => {
	const handleSearch = (e) => {		
		setSearch(e.target.value.toLowerCase());				
	}
	
	const handleClick = () => {
		setDarkMode(!darkMode);
		
		if(!darkMode) {			
			localStorage.setItem('theme', 'darkMode');
			document.body.classList.add('dark-mode');
			document.querySelector('.sun-icon').classList.add('active');
			document.querySelector('.moon-icon').classList.add('active');
		}else {
			localStorage.setItem('theme', 'lightMode');
			document.body.classList.remove('dark-mode');
			document.querySelector('.sun-icon').classList.remove('active');
			document.querySelector('.moon-icon').classList.remove('active');
		}
	}
	
	useEffect(() => {
		// Search functionality
		let coinInfo = document.querySelectorAll('.coin-info');
		coinInfo.forEach(coin => {
			coin.querySelector('.coin-name').textContent.toLowerCase().startsWith(search) ? coin.style.display = 'table-row' : coin.style.display = 'none';
		});	
		
		// Light / dark mode local storage functionality when app loads
		const localData = localStorage.getItem('theme');
		
		if(localData === 'lightMode') {
			document.body.classList.remove('dark-mode');
			document.querySelector('.sun-icon').classList.remove('active');
			document.querySelector('.moon-icon').classList.remove('active');
		}
		
		if(localData === 'darkMode') {
			setDarkMode(darkMode => !darkMode);
			document.body.classList.add('dark-mode');
			document.querySelector('.sun-icon').classList.add('active');
			document.querySelector('.moon-icon').classList.add('active');
		}
	},[search, setDarkMode]);
	
	useEffect(() => {       
		fetch('https://api.coingecko.com/api/v3/global')
		.then(response => response.json())
		.then(globalMarket => {
		  setGlobalData(globalMarket);
		})
		.catch(error => {
			console.log('There was an error loading the global market data');
		});  
		
	  }, [setGlobalData]);
	

	return (
		<>
			<div className="header-top">
				<div className="container clearfix">
					<div className="global-market">
						{Object.keys(globalData).length !== 0 && (
							<>
								<p className="active-coins">Coins: <span>{globalData.data.active_cryptocurrencies}</span></p>
								<p>Dominance:
									<span className="btc-dominance">BTC {globalData.data.market_cap_percentage.btc.toFixed(2)}&#37;</span>
									<span>ETH {globalData.data.market_cap_percentage.eth.toFixed(2)}&#37;</span>
								</p>
							</>
						)}			
					</div>										
					
					<div className="theme-select" onClick={handleClick}>
						<i className="material-icons sun-icon">light_mode</i>
						<i className="material-icons moon-icon">nightlight_round</i>
					</div>
					
					<div className="watchlist-link">
						<Link to="/watchlist">Watchlist</Link>
					</div>
				</div>
			</div>
			
			<header className="main-header">						
				<div className="container">
					<div className="row">
						<div className="col-md-9">
							<Link to="/" className="logo-link">
								<h1 className="logo">CoinPouch <img src={coinPouch} alt="Coin Pouch" /></h1>
							</Link>
						</div>
						<div className="col-md-3">												
							{searchDisplay === true && (
								<form className="search-form d-none d-sm-block">
									<input type="text" placeholder="Search" className="form-control" onChange={handleSearch} />
								</form>
							)}						
						</div>
					</div>				
				</div>			
			</header>
		</>
	)
}

export default Header;
