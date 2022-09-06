import Footer from './Footer'
import Header from './Header'
import './Layout.css'

interface Children {
	children: JSX.Element
}

const Layout = ({ children }: Children) => {
	return (
		<>
			<Header />
			<div className="main">
				{children}
			</div>
			<Footer />
		</>
	)
}

export default Layout