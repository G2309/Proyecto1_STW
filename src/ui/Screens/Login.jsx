import { useState } from 'react';
import '../Style/Login.css';
import smt from './smt.jpg';

function Login({navigate, handleLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/';
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className='page'>
            <img src={smt} className='image' alt="SMT Image" />
            <div className='main'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Usuario'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='input'
                    />
                    <input
                        type='password'
                        placeholder='Contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input'
                    />
                    <button type='submit' className='button'>Iniciar sesión</button>
                    {error && <p className='error'>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;

