import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import btcLoader from '../images/btc-loader.gif';
import {Line} from 'react-chartjs-2';


const CoinDetails = ({isLoading, setIsLoading, searchDisplay, setSearchDisplay, error, setError}) => {
	const {id} = useParams();
	const [coinDetails, setCoinDetails] = useState([]);	
	const [detailsLoading, setDetailsLoading] = useState(true);
	
	useEffect(() => {
		fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&price_change_percentage=1h,24h,7d,14d,30d,1y&sparkline=true`)
		.then(response => response.json())
		.then(coinInfo => {
			setCoinDetails(coinInfo)
			setDetailsLoading(false);
			setSearchDisplay(false);
			setError('');
			
			const coinDetailsPercentage = document.querySelector('.coin-details-percentage');	
						
			if(coinDetailsPercentage.innerHTML.includes('-')) {
				coinDetailsPercentage.classList.add('coin-details-percentage-down');
			}
			
			const coinRangePercentage = document.querySelectorAll('.coin-range-percentage');
			
			coinRangePercentage.forEach(percentage => {
				if(percentage.innerHTML.includes('-')) {
				percentage.classList.add('coin-range-percentage-red');
				}
			  });
		})
		.catch(error => {
			setError('There was a problem, try refreshing the page!');
		});  
				
		setIsLoading(true);		
	},[id, setIsLoading, setSearchDisplay, setError]);
	
	return (
		<div className="coin-details">
			<div className="container">
				{detailsLoading && (<div className="container loader"><img src={btcLoader} alt="Loading" /></div>)}
				{error && (<h5 className="error text-center mt-5">{error}</h5>)}
				{coinDetails.length > 0 && (
					<>
						{
							coinDetails.map(coin => {											
								return (
									<div key={coin.id}>
										<div className="row">
											<div className="col-lg-7">
												<h3>
													<span className="badge badge-warning">Rank #{coin.market_cap_rank}</span>
													<br />
													<img src={coin.image} alt={coin.name} className="coin-details-img" /> 
													{coin.name} 
													<span className="badge badge-light coin-details-symbol">{coin.symbol.toUpperCase()}</span>									
												</h3>											
												<h2 className="coin-price">
													${coin.current_price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 6})}
													<span className="badge coin-details-percentage">
														{coin.price_change_percentage_24h.toLocaleString('en-US', {maximumFractionDigits: 1})}&#37;
													</span>
												</h2>
												
												<div className="row">
													<div className="col-md-6">
														{coin.market_cap && (<p>Market Cap: ${coin.market_cap.toLocaleString()}</p>)}							
														{coin.circulating_supply && (<p>Circulating Supply: {coin.circulating_supply.toLocaleString()}</p>)}	
													</div>
													<div className="col-md-6">
														{coin.total_supply && (<p>Total Supply: {coin.total_supply.toLocaleString()}</p>)}	
														{coin.max_supply && (<p className="max-supply">Max Supply: {coin.max_supply.toLocaleString()}</p>)}
													</div>												
												</div>	
												
												<div className="coin-chart">
													<Line									
														data={{
															labels: coin.sparkline_in_7d.price,
															datasets: [{
																label: coin.name,
																backgroundColor: 'rgb(22, 199, 132)',
																borderColor: 'rgb(22, 199, 132)',
																data: coin.sparkline_in_7d.price
															}]																								
														}}
														
														options={{
															scales: {
																x: {
																	grid: {
																		display: false
																	},
																	ticks: {
																		display: false
																	}
																}
															},
															plugins: {
																legend: {
																	display: false
																},
																title: {
																	display: true,
																	text: `${coin.name} 7d Price Chart`
																}
															}						
														}}
													 />	
												 </div>		
												
												<h6 className="coin-gains-losses">{coin.name} Gains / Losses</h6>
												<div className="table-responsive">
													<table className="table mt-2">
														<thead>
															<tr>
																<th>1h</th>
																<th>24h</th>
																<th>7d</th>
																<th>14d</th>
																<th>30d</th>
																<th>1y</th>
															</tr>
														</thead>
														
														<tbody>
															<tr>
																{coin.price_change_percentage_1h_in_currency && (
																	<td className="coin-range-percentage">{coin.price_change_percentage_1h_in_currency.toFixed(2)}&#37;</td>
																)}
																
																{coin.price_change_percentage_24h_in_currency && (
																	<td className="coin-range-percentage">{coin.price_change_percentage_24h_in_currency.toFixed(2)}&#37;</td>
																)}
																
																{coin.price_change_percentage_7d_in_currency && (
																	<td className="coin-range-percentage">{coin.price_change_percentage_7d_in_currency.toFixed(2)}&#37;</td>
																)}
																
																{coin.price_change_percentage_14d_in_currency && (
																	<td className="coin-range-percentage">{coin.price_change_percentage_14d_in_currency.toFixed(2)}&#37;</td>
																)}
																
																{coin.price_change_percentage_30d_in_currency && (
																	<td className="coin-range-percentage">{coin.price_change_percentage_30d_in_currency.toFixed(2)}&#37;</td>
																)}
																
																{coin.price_change_percentage_1y_in_currency && (
																	<td className="coin-range-percentage">{coin.price_change_percentage_1y_in_currency.toFixed(2)}&#37;</td>
																)}
															</tr>
														</tbody>
													</table>	
												</div>														
											</div>
											
											<div className="col-lg-5">
												<div className="coin-stats-panel">
													<h4 className="panel-heading">{coin.symbol.toUpperCase()} Price Stats</h4>
													
													<table className="table">
														<tbody>
															{coin.market_cap_rank && (
																<tr>
																	<th>Market Cap Rank</th>
																	<td>#{coin.market_cap_rank}</td>
																</tr>
															)}
															{coin.current_price && (
																<tr>
																	<th>{coin.symbol.toUpperCase()} Price <span className="sm">(current)</span></th>
																	<td>${coin.current_price.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
																</tr>
															)}
															{coin.market_cap && (
																<tr>
																	<th>Market Cap</th>
																	<td>${coin.market_cap.toLocaleString()}</td>
																</tr>
															)}
															{coin.total_volume && (
																<tr>
																	<th>Trading Volume</th>
																	<td>${coin.total_volume.toLocaleString()}</td>
																</tr>
															)}
															{coin.low_24h && (
																<tr>
																	<th>24 hour Low / 24 hour High</th>
																	<td>
																		${coin.low_24h.toLocaleString('en-US', {minimumFractionDigits: 2})} / 
																		${coin.high_24h.toLocaleString('en-US', {minimumFractionDigits: 2})}
																	</td>
																</tr>
															)}
															{coin.ath && (
																<tr>
																	<th>All-Time High</th>
																	<td>
																		${coin.ath.toLocaleString('en-US', {minimumFractionDigits: 2})}
																		<br />
																		{coin.ath_date.substring(0, coin.ath_date.indexOf('T'))}
																	</td>
																</tr>
															)}
															{coin.atl && (
																<tr>
																	<th>All-Time Low</th>
																	<td>
																		${coin.atl.toLocaleString('en-US', {minimumFractionDigits: 2})}
																		<br />
																		{coin.atl_date.substring(0, coin.ath_date.indexOf('T'))}																
																	</td>
																</tr>
															)}
														</tbody>
													</table>
												</div>										
											</div>
										</div>
									</div>
								)
							})
						}
					</>
				)}								
			</div>			
		</div>
	)
}

export default CoinDetails;