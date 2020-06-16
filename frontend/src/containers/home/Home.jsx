import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.scss';
import Button from '@material-ui/core/Button';
import { getUserInfo } from '../../redux/actions/users';

const Home = (props) => {
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
          getUserInfo()
          .then(res => {
            props.history.push('/dogs')
          })
          .catch(console.error)
        }
    }, [])
    return(
        <Fragment>  
            <div className="home">
                <div className="containerHome">
                <h1>HOT DOGS</h1>
                
                <p>¡¡Únéte a nuestra aplicación y conoce nuevos compañeros de juegos para oler, correr, salir a pasear por el barrio en la mejor de las compañías!!</p>
                
                <Button variant="contained" color="primary" className="loginButton"><NavLink to='/login' exact><strong>Conéctate</strong></NavLink></Button>

                <p>¿No estás registrado?</p>
                
                <Button variant="contained" color="primary" className="registerButton"><NavLink to='/register' exact><strong>Regístrate aquí mismo</strong></NavLink></Button>
                </div>
            </div>
        </Fragment>
    )
}
export default Home;

