
const ScrollTop = () => {
	const handleClick = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth'
		});
	}
	
	return (
		<div className="scroll-top d-none d-md-block">
			<i className="material-icons" onClick={handleClick}>arrow_circle_up</i>
		</div>
	)
}

export default ScrollTop;