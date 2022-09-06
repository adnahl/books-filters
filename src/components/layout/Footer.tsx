import React from 'react'

const styles = {
	footer: {
		height: '5vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '.9em'
	}
}

const Footer = () => {
	return (
		<div style={styles.footer}>
			<a target="_blank" href='https://adnahl.com'>adnahl</a>
		</div>
	)
}

export default Footer