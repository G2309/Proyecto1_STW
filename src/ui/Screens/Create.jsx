import React from 'react';
import '../Style/Create.css';
import useApi from '../useApi'; 
import useForm from '../useForm'; 

const Create = ({ navigate }) => {
  const { isLoading, error } = useApi('https://backend-stw-p1.onrender.com/api/blogs'); 
  const { values, handleChange, handleSubmit } = useForm(createPost); 

  async function createPost() {
    try {
      const response = await fetch('https://backend-stw-p1.onrender.com/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }
      navigate('/home');
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  }



  return (
    <div className="create-container">
     <div className='form-container'>
      <h2>Crea un nuevo blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={values.title || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={values.content || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Demon:
          <input
            type="text"
            name="demon"
            value={values.demon || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Level:
          <input
            type="number"
            name="level"
            value={values.level || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Post Date:
          <input
            type="date"
            name="post_date"
            value={values.post_date || ''}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
     </div>
    </div>
  )
}

export default Create

