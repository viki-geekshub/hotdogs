import React, { Fragment, useEffect} from 'react';
import './Profile.scss'
import { connect } from 'react-redux';
import { logout, getUserInfo } from '../../redux/actions/users';
import {  notification } from 'antd';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Profile = ({ user, history }) => {
    useEffect(() => {
        getUserInfo()
        .catch(console.error)
    }, [])
    const handleLogout = () => {
        logout()
        .then(res => {
            notification.success({message:'Cierre de sesión',description:'Usuario desconectado con éxito'}) 
            setTimeout(() => {
                //this.router.navigate([]) // Otra forma de redireccionar
                history.push('/') // Haciendolo así evito que recargue la página
            }, 100);
        })
        .catch(()=>{
            notification.error({message:'Cierre de sesión',description:'Hubo un problema al intentar desconectar el usuario'})
        })
    }
    return(
        <Fragment>
            { user ?
                <div className="profile">  
                    <h1 className="titleProfile">Mi perfil</h1>
                    <div className="cardDog">
                        <div className="upDog">
                            <img src={user.dog_images} className="photos" />
                            <div className="data">
                                <p className="pDog"><strong>Nombre: </strong>{user.name}</p>
                                <p className="pDog"><strong>Edad: </strong>{user.age}</p>
                                <p className="pDog"><strong>Raza: </strong>{user.race}</p>
                                <p className="pDog"><strong>Color: </strong>{user.color}</p>
                            </div>
                        </div>
                        <p className="description">{user.about_me}</p>
                    </div>
                    
                    <div className="cardHuman">
                        <div className="upHuman">
                            <div className="data">
                                <p><strong>Nombre: </strong>{user.human_name}</p>
                                <p><strong>Edad: </strong>{user.age_my_human}</p>
                                <p><strong>Vivimos en: </strong>{user.city}</p>
                                <p><strong>{user.email}</strong></p>
                            </div>
                            <img src={user.human_images} className="photos"/>
                        </div>
                        <p className="description">{user.about_my_human}</p>
                    </div>
                    <button className="button"><NavLink to='/editprofile' exact><img src="https://image.flaticon.com/icons/png/512/644/644277.png" className="iconLogout" />&nbsp; Editar perfil &nbsp;</NavLink></button>
                    
                    <Button variant="contained" color="primary" className="button" onClick={handleLogout}><img src="https://image.flaticon.com/icons/png/512/35/35145.png" className="iconLogout" />&nbsp; Cerrar sesión &nbsp;</Button>
                </div> : <div className="notFound">
                    {/* <button className="homeButton">Volver al inicio</button> */}
                {/* <img src="../../../images/error.jpg" /> */}
                </div>}
        </Fragment>
    )
}

const mapStateToProps =({user})=>({user:user.user});
export default connect(mapStateToProps)(Profile) ;  