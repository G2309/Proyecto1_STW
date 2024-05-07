import '../Style/SideBar.css'
import '../Style/Content.css'
import React, {Suspense, useState} from 'react'
import useApi from '../useApi'
import Content from './Content'
import TopBar from './TopBar'

const SideBar = ({postId,setPostId}) => {
	const [isVisible, setIsVisible] = useState(true)
	const {data,isLoading,error} = useApi('https://backend-stw-p1.onrender.com/api/blogs');

	if (error) {
		return <div>Error: {error.message}</div>
	}

	const handleToggle = () => {
		setIsVisible(!isVisible)
	}

	const handlePostClick = (Id) => {
		setPostId(Id)
	}

	return(
		<div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      		  
		  <div className={`left-sidebar ${isVisible ? 'visible' : 'hidden'}`}>
		    {data && data.map((post) => (
          		<div key={post.id} className='post-item' onClick={() => handlePostClick(post.id)}>
			    <h3>{post.demon}</h3>
            		    <p>{post.post_date}</p>
          		</div>
        	     ))}
      		  </div>

      		  <div className='right-sidebar' onClick={handleToggle}>
			<span>{isVisible ? '<':'>'}</span>
      		  </div>

		   
		   <div className={`content-hidder ${isVisible ? 'visible' : 'hidden'}`}>
		    <Content isVisible={isVisible} postId={postId}/>
		    <TopBar postId={postId}/>
		   </div>
    		</div>
	)
}

export default SideBar
