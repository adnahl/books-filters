import React from 'react'

const styles = {
	header: {
		height: '5vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '1.5em'
	}
}

const Header = () => {
	return (
		<div style={styles.header}>BOOKS</div>
	)
}

export default Header