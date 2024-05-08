import React, { useState, useEffect } from 'react'
import useForm from '../useForm'
import useApi from '../useApi'
import '../Style/Edit.css'

const Edit = ({ navigate }) => {
  const { values, handleChange, handleSubmit } = useForm(updatePost)
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true)
        if (!values.id) {
          return;
        }
        const response = await fetch(`https://backend-stw-p1.onrender.com/api/blogs/${values.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch blog post')
        }
        const postData = await response.json()
        setPost(postData)

        handleChange({
          target: {
            name: 'title',
            value: postData.title
          }
        });
        handleChange({
          target: {
            name: 'content',
            value: postData.content
          }
        });
        handleChange({
          target: {
            name: 'demon',
            value: postData.demon
          }
        });
        handleChange({
          target: {
            name: 'post_date',
            value: postData.post_date
          }
        });

      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [values.id])

  const handleSearch = async () => {
    try {
      setIsLoading(true)
      if (!values.id) {
        return;
      }
      const response = await fetch(`https://backend-stw-p1.onrender.com/api/blogs/${values.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch blog post')
      }
      const postData = await response.json()
      setPost(postData)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function updatePost() {
    try {
      setIsLoading(true)
      const response = await fetch(`https://backend-stw-p1.onrender.com/api/blogs/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: values.id || post.id,
          title: values.title || post.title,
          demon: values.demon || post.demon,
          content: values.content || post.content,
          post_date: values.post_date || post.post_date,
	  level: values.level || post.level
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update blog post')
      }
      navigate('/home')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="edit-container">
      <div className="form-container">
        <h2>Edita un blog existente</h2>
        <form onSubmit={handleSubmit}>
          <label>
            ID del post:
            <input
              type="text"
              name="id"
              value={values.id || ''}
              onChange={handleChange}
              required
            />
          </label>
          <button type="button" onClick={handleSearch}>Buscar</button>
          {post && (
            <div>
              <label>
                Nuevo título:
                <input
                  type="text"
                  name="title"
                  value={values.title || post.title}
                  onChange={handleChange}
                />
              </label>
              <label>
                Nuevo contenido:
                <textarea
                  name="content"
                  value={values.content || post.content}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Actualizar</button>
            </div>
          )}
        </form>
        {isLoading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  )
}

export default Edit

