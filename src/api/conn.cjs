const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
	user: 'blog_user',
	host: 'localhost',
	database: 'blogs_database',
	password: 'blog123',
	port: 5434,
});

// GET endpoint, will be used for a sidebar
app.get('/api/blogs', async (req,res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM blog');
		client.release();
		res.json(result.rows);
	} catch(err) {
		console.error('Error al ejecutar query',err);
		res.status(500).json({error: 'Error en funcion /GET'});
	}
});

// GET endpoint which requires an specific ID to load a specific blog
app.get('/api/blogs/:id', async (req, res) => {
	const {id} = req.params;
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM blog WHERE id = $1', [id]);
		client.release();
		if (result.rows.length === 0) {
			return res.status(404).json({error: 'Blog no encontrado'});
		}
		res.json(result.rows[0]);
	} catch (err) {
		console.error('Error al buscar blog por ID',err);
		return res.status(500).json({error:'Error en funcion GET:ID'});
	}
});

// POST endpoint, create a new post

app.post('/api/blogs', async (req,res) => {
	const {title, content, demon, level, post_date, image} = req.body;
	try {
		const client = await pool.connect();
		const result = await client.query('INSERT INTO blog (title, content, demon, level, post_date, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [title, content, demon, level, post_date, image]);
		client.release();
		res.status(201).json(result.rows[0]);
	} catch(err) {
		console.error('Error al insertar blog', err);
		return res.status(500).json({error:'Error en la funcion POST'});
	}
});

// PUT endpoint, modify an existing post by ID

app.put('/api/blogs/:id', async (req, res) => {
	const {id} = req.params;
	const {title, content,demon, level, post_date, image} = req.body;
	try {
		const client = await pool.connect();
		const result = await client.query('UPDATE blog SET title = $1, content = $2, demon = $3, level = $4, post_date = $5, image = $6 WHERE id = $7 RETURNING *', [title,content,demon,level,post_date,image,id]);
		client.release();
		if (result.rows.length === 0){
			return res.status(404).json({error: 'Blog no encontrado'});
		}
		res.json(result.rows[0]);
	} catch (err) {
		console.error('Error al ejecutar el query POST',err);
		res.status(500).json({error:'Error en metodo POST'});
	}
});

// DELETE endpoint, delete an existing blog by ID

app.delete('/api/blogs/:id', async (req, res) => {
	const {id} = req.params;
	try {
		const client = await pool.connect();
		const result = await client.query('DELETE FROM blog WHERE id = $1 RETURNING *', [id]);
		client.release();
		if(result.rows.length === 0) {
			return res.status(404).json({error: 'Blog no encontrado'});
		}
		res.json(result.rows[0]);
	} catch (err) {
		console.error('Error al ejecutar query DELETE', err);
		res.status(500).json({error: 'Error en endpoint DELETE'});
	}
});


app.listen(PORT, () => {
	console.log(`Server en http://localhost:${PORT}`);
});
