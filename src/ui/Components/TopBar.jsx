import '../Style/TopBar.css'
import useApi from '../useApi'
import {useState,useEffect} from 'react'

const TopBar = ({postId,navigate}) => {
	const [postTitle, setPostTitle] = useState('')
	const {data: post,isLoading,error} = useApi(`http://localhost:8000/api/blogs/${postId}`)
	const [isLogged, setIsLogged] = useState(false)

	const handleLogin = () => {
		setIsLogged(true)
		navigate('/login')
	}

	const handleLogout = () => {
		setIsLogged(false)
		navigate('/')
	}

	useEffect(()  => { 
		if(post) {
			setPostTitle(post.title)
		}
	}, [post])


	return (
		<div className='topbar'>
		  <div className='login'>
		    {isLogged ? (
			<button className='button-log' onClick={handleLogout}>Logout</button>
		    ) : (
		    	<button className='button-log' onClick={handleLogin}>Login</button>
		    )}
		  </div>	
		  
		  <div className='title'>
		    <h2>{postTitle}</h2>
		  </div>

		  <div className='crud'>
		  
		  </div>

		</div>
	)
}

export default TopBar
