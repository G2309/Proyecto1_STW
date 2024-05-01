import {useState,useEffect} from 'react'
import Home from '../ui/Home'
//import Login from '../ui/Login'

const Router = () => {
	const [ruta, setRuta] = useState(window.location.pathname)

	const navigate = (irRuta) => {
		window.history.pushState({},'',irRuta)
		setRuta(irRuta)
	}

	const renderScreen = () => {
		switch(ruta) {
			case '/home':
				return <Home navigate={navigate} />
		//	case '/login':
		//		return <Login navigate={navigate}/>
		}
	}

	useEffect(() => {
		if(ruta === '/') {
			navigate('/home');
		}
	}, [])

	return (
		<div className='router'>
		  {renderScreen()}
		</div>
	)
}

export default Router
