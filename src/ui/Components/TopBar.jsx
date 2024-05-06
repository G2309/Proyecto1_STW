import '../Style/TopBar.css'
import useApi from '../useApi'
import {useState,useEffect} from 'react'

const TopBar = ({navigate, postId}) => {
	const [postTitle, setPostTitle] = useState('')
	const {data: post,isLoading,error} = useApi(`http://localhost:8000/api/blogs/${postId}`)
	const [isLogged, setIsLogged] = useState(false)
	
	const handleLogin = () => {
		navigate('/login')
	}

	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn')
		setIsLogged(false)
		navigate('/home')
	}

	useEffect(() => {
		const loggedIn = localStorage.getItem('isLoggedIn')
		if(loggedIn === 'true'){
			setIsLogged(true)
		}
	}, [])

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
		    <h2 className='white'>{postTitle}</h2>
		  </div>

		  {isLogged && (
                	<div className='crud'>
                   	 <button className='button-crud'>Edit</button>
                   	 <button className='button-crud'>Delete</button>
                  	  <button className='button-crud'>Create</button>
              	  </div>
           	 )}

		</div>
	)
}

export default TopBar
