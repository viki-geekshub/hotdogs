import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Register.scss';
import { register } from '../../../redux/actions/users';
import {  notification } from 'antd';
import { NavLink } from 'react-router-dom';

const Register = props => { 
    const handleSubmit = event =>{
        event.preventDefault();
        const user ={
            name:event.target.name.value,
            email:event.target.email.value,
            password:event.target.password.value,
            dog_images: event.target.dog_images.value,
            about_me: event.target.about_me.value,
            city: event.target.city.value,
            age: event.target.age.value,
            race: event.target.race.value,
            color: event.target.color.value,
            human_name: event.target.human_name.value,
            human_images: event.target.human_images.value,
            about_my_human: event.target.about_my_human.value,
            age_my_human: event.target.age_my_human.value
        }
        register(user)
        .then(res => {
            notification.success({message:'Registro',description:res.data.message}) 
            setTimeout(() => {
                //this.router.navigate([])
                props.history.push('/login')
            }, 1500);
        })
        .catch(()=>{
            notification.error({message:'Registro',description:'Hubo un problema al registrarse'})
        })
    }
    return (
        <div className="registerContainer">
            <form onSubmit={handleSubmit}>
            <h2>Regístrate:</h2>
                <TextField type="text" label="Nombre" name="name" autoFocus placeholder="¿Como se llama tu perro?" />
                <TextField type="email" label="Email" name="email" placeholder="¿Cuál es tu mail?" />
                <TextField type="password" label="Contraseña" name="password" placeholder="Introduce tu contraseña" />
                <TextField type="text" label="Mis fotos" name="dog_images" placeholder="Agrega imágenes de tu perro" />
                <TextField type="text" label="Sobre mí" name="about_me" placeholder="Háblanos de tu perro" />
                <TextField type="text" label="Vivo en" name="city" placeholder="¿En qué ciudad vives?" />
                <TextField type="number" label="Edad" name="age" placeholder="¿Qué edad tiene tu perro?" />
                <TextField type="text" label="Raza" name="race" placeholder="¿De qué raza es?" />
                <TextField type="text" label="Color" name="color" placeholder="¿De qué color es?" />
                <hr></hr>
                <TextField type="text" label="Nombre de mi humano" name="human_name" placeholder="¿Cuál es tu nombre?" />
                <TextField type="text" label="Fotos de mi humano" name="human_images" placeholder="Agrega imágenes tuyas" />
                <TextField type="text" label="Sobre mi humano" name="about_my_human" placeholder="Háblanos de ti" />
                <TextField type="number" label="Edad de mi humano" name="age_my_human" placeholder="¿Qué edad tienes?" />
                <Button type="submit" variant="contained" color="primary">
                    Registrar
                </Button> <br></br> 
                <p>Si ya tienes cuenta en Hot Dogs:</p>
                <NavLink to='/login' exact>Conéctate aquí</NavLink>
            </form>  
        </div>
    )
}

export default Register;