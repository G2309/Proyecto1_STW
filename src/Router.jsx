import {useState,useEffect} from 'react'
import Home from './ui/Screens/Home'
import Login from './ui/Screens/Login'
import Create from './ui/Screens/Create'
import Edit from './ui/Screens/Edit'

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
			case '/login':
				return <Login navigate={navigate} />
			case '/edit':
				return <Edit navigate={navigate}/>
			case '/create':
				return <Create navigate={navigate}/>
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
