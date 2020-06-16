import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.scss';
import { login } from '../../../redux/actions/users';
import { notification } from 'antd';
import { NavLink } from 'react-router-dom';

const Login = props => {
    const handleSubmit = event => {
        event.preventDefault();
        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        login(user)
        .then(res => {
            notification.success({ message: 'Inicio sesión', description: res.data.message})
            setTimeout(() => {
                props.history.push('/dogs');
            }, 1500);
        })
        .catch(()=>{
            notification.error({ message: 'Inicio sesión', description: 'Hubo un problema al logearte'})
        })
    }
    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <TextField type="email" label="Email" name="email" autoFocus placeholder="Introduzca su correo electrónico" /><br></br>
                <TextField type="password" label="Contraseña" name="password" placeholder="Introduzca su contraseña" /><br></br>
                <Button type="submit" variant="contained" color="primary" className="button">
                    Iniciar sesión
                </Button> <br></br> <br></br>
                <p>Si aún no tienes cuenta en Hot Dogs:</p>
                <NavLink to='/register' exact>Regístrate aquí</NavLink>
            </form>
        </div>
    )
}

export default Login;