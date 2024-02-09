import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import btcLoader from '../images/btc-loader.gif';

const List = ({data, setData, isLoading, setIsLoading, searchDisplay, setSearchDisplay, error, setError}) => {
			
	useEffect(() => {
		// Get coin list data
		fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids&price_change_percentage=24h,7d')
		.then(response => response.json())
		.then(coinData => {
		  setData(coinData); 		  
		  setIsLoading(false);
		  setSearchDisplay(true);
		  setError('');
		  
		  document.querySelector('.coin-list').style.display = 'block';
		  
		  // Add coin-percentage-down class to any percentage coin element that has a "-" hyphen character
		  const coinPercentage = document.querySelectorAll('.coin-percentage');
		  coinPercentage.forEach(percentage => {
			if(percentage.innerHTML.includes('-')) {
			percentage.classList.add('coin-percentage-down');
			}
		  });	
		})
		.catch(error => {
		  setError('There was a problem, try refreshing the page!');
		});        
	  }, [setData, setIsLoading, setSearchDisplay, setError]);
	  		
	return (		
		<div>
			{isLoading && (<div className="container loader"><img src={btcLoader} alt="Loading" /></div>)}
			{error && (<h5 className="error text-center mt-5">{error}</h5>)}
			{data.length > 0 && (
				<div className="coin-list">
					<div className="container">
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th>#</th>
										<th>Coin</th>
										<th>Price</th>
										<th>24h</th>
										<th>7d</th>
										<th>Market Cap</th>
										<th>24h Volume</th>
									</tr>
								</thead>
								
								<tbody>
									{
										data.map((coin, index) => {
											return (
												<tr className="coin-info" key={coin.id}>
													<td>{index + 1}</td>
													<td>
														<Link to={`/${coin.id}`} className="coin-link">
															<img src={coin.image} alt={coin.name} className="coin-img" /> 
															<span className="coin-name">{coin.name}</span> 
															<span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
														</Link>
													</td>
													<td>${coin.current_price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 6})}</td>
													<td>
														<span className="coin-percentage">
															{/* {coin.price_change_percentage_24h.toFixed(1)}&#37; error happening here*/}
															{coin.price_change_percentage_24h}&#37;
														</span>
													</td>
													<td>
														<span className="coin-percentage">
															{/* {coin.price_change_percentage_7d_in_currency.toFixed(1)}&#37; */}
															{coin.price_change_percentage_7d_in_currency}&#37;
														</span>
													</td>
													<td>${coin.market_cap.toLocaleString()}</td>
													<td>${coin.total_volume.toLocaleString()}</td>
												</tr>
											)
										})
									}												
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default List;