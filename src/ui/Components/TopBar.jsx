import '../Style/TopBar.css'
import useApi from '../useApi'
import {useState,useEffect} from 'react'

const TopBar = ({navigate, postId}) => {
	const [postTitle, setPostTitle] = useState('')
	const {data: post,isLoading,error} = useApi(`https://backend-stw-p1.onrender.com/api/blogs/${postId}`)
	const [isLogged, setIsLogged] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [isCreating, setIsCreating] = useState(false)
	
	const handleLogin = () => {
		setIsLogged(true)
		navigate('/login')
	}

	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn')
		setIsLogged(false)
		navigate('/home')
	}

	const handleDelete = async () => {
		try{
			await fetchPost()
			window.location.reload()
		} catch (error) {
			console.error('Error al borrar blog: ',error.message)
		}
	}

	const fetchPost = async () => {
		try {
			const response = await fetch(`https://backend-stw-p1.onrender.com/api/blogs/${postId}`, {
				method: 'DELETE',
			})
			if (!response.ok){
				throw new Error('Failed to delete blog')
			}
		} catch (error) {
			throw new Error('Error al borrar: ${error.message}')
		}
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
    	
	const handleEdit = () => {
        	setIsEditing(true)
		navigate('/edit')
    	}

   	const handleCreate = () => {
        	setIsCreating(true)
		navigate('/create')
    	}


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
                   	 <button className='button-crud' onClick={handleEdit}>Edit</button>
                   	 <button className='button-crud' onClick={handleDelete}>Delete</button>
                  	  <button className='button-crud' onClick={handleCreate}>Create</button>
              	  </div>
           	 )}

		</div>
	)
}

export default TopBar
