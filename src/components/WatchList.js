import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WatchList = ({watchlist, setWatchlist, searchDisplay, setSearchDisplay}) => {	
	useEffect(() => {
		// Add coin-percentage-down class to any percentage coin element that has a "-" hyphen character
		const coinPercentage = document.querySelectorAll('.coin-percentage');
			coinPercentage.forEach(percentage => {
			if(percentage.innerHTML.includes('-')) {
				percentage.classList.add('coin-percentage-down');
			}
		});
		
		setSearchDisplay(true);
	}, [setSearchDisplay])
	
	return (
		<div className="watchlist">
			<div className="container">
				<h3>Watchlist</h3>
				{watchlist.length === 0 && (
					<p>There are currently no coins in your watchlist</p>
				)}
				
				{
					watchlist.length > 0 && (
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
										watchlist.map((coin, index) => {
											return (
												<tr className="coin-info" key={coin.id}>
													<td>{coin.marketCapRank}</td>
													<td>
														<Link to={`/${coin.id}`} className="coin-link">
															<img src={coin.image} alt={coin.name} className="coin-img" /> 
															<span className="coin-name">{coin.name}</span> 
															<span className="coin-symbol">{coin.symbol}</span>
														</Link>
													</td>
													<td>${coin.price}</td>
													<td>
														<span className="coin-percentage">
															{coin.priceChange24hr}&#37;
														</span>
													</td>
													<td>
														<span className="coin-percentage">
															{coin.priceChange7d}&#37;
														</span>
													</td>
													<td>${coin.marketCap}</td>
													<td>${coin.totalVolume}</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					)
				}				
			</div>
		</div>
	)
}

export default WatchList;