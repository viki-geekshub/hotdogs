import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss';

const Header = (props) => {   
    const history = useHistory();
    return <header className="header">
        {!props.user ?
            <div className="welcomeZone">
                <NavLink to='/' exact><img src="https://image.flaticon.com/icons/png/512/35/35145.png" title="Inicio" /></NavLink>
            </div> : <div className="userZone">
                <NavLink to='/profile' exact><img src="https://static.vecteezy.com/system/resources/previews/000/372/413/non_2x/dog-silhouette-vector-illustration.jpg" title="Mi perfil"/></NavLink>
                {   
                    history.location.pathname === '/dogs' ?
                    <img src="https://i.pinimg.com/236x/38/92/3f/38923fd93b535aa458081589a397895a.jpg" title="Búsqueda de contactos"/>
                    :<NavLink to='/dogs' exact><img src="https://i.pinimg.com/236x/38/92/3f/38923fd93b535aa458081589a397895a.jpg" title="Búsqueda de contactos"/></NavLink>
                }
                <NavLink to='/matchs' exact><img src="https://images.clipartlogo.com/files/istock/previews/8384/83845957-vector-dogs-silhouette.jpg" title="Mis matchs" /></NavLink>
        </div>}
    </header>
}

const mapStateToProps = (state) => ({ user: state.user.user });
export default connect(mapStateToProps)(Header);