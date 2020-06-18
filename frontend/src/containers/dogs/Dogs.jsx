import React, { Fragment, useEffect, useState } from 'react';
import { getAllUsers, follow, unfollow, cleanUp } from '../../redux/actions/users';
import { connect } from 'react-redux';
import './Dogs.scss';
import {  notification } from 'antd';
import { Spin } from 'antd';

const Dogs =(props)=> {
    const indexRandom = Math.floor((Math.random() * (props.users?.length))); 
    const currentUser = indexRandom >= 0 ? props.users[indexRandom] : []; 
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        getAllUsers()
        .then(res=>
            setLoading(false)) 
        .catch(console.error)
        return () => {
            cleanUp() 
        }
    }, [])
    const handleNope = () => { 
        unfollow(currentUser.id)
        .then(res => {
            notification.success({message:'No te gusta'}) 
            setTimeout(() => {
                props.history.push('/dogs') 
            }, 100);
        })
        .catch(()=>{
            notification.error({description:'Se ha producido un problema al tratar de indicar que no te gusta'})
        })
    }
    const handleLike = () => {
        follow(currentUser.id)
        .then(res => {
            notification.success({message: res.data.message}) 
            setTimeout(() => {
                props.history.push('/dogs') 
            }, 100);
        })
        .catch(()=>{
            notification.error({description:'Se ha producido un problema al tratar de indicar que te gusta'})
        })
    }
    
    return( 
        <Fragment> 
            { 
                loading && !currentUser && <div className="spinner"><Spin size="large" /></div> 
            }
             { 
                !loading && currentUser && <div className="dogs">  
                <div className="cardDog">
                    <div className="upDog">
                        <img src={currentUser.dog_images} className="photos" />
                        <div className="data">
                            <p className="pDog"><strong>{currentUser.name}</strong></p>
                            <p className="pDog"><strong>{currentUser.age} años</strong></p>
                            <p className="pDog"><strong>Raza: </strong>{currentUser.race}</p>
                            <p className="pDog"><strong>Color: </strong>{currentUser.color}</p>
                        </div>
                    </div>
                    <p className="description">{currentUser.about_me}</p>
                </div>
                
                <div className="cardHuman">
                    <div className="upHuman">
                        <div className="data">
                            <p><strong>{currentUser.human_name}</strong></p>
                            <p><strong>{currentUser.age_my_human} años</strong></p>
                            <p><strong>{currentUser.city}</strong></p>
                        </div>
                        <img src={currentUser.human_images} className="photos"/>
                    </div>
                    <p className="description">{currentUser.about_my_human}</p>
                </div>
                <div className="likeYnope">
                    <img src="../../../images/nope.jpg" className="nopeButton" onClick={handleNope}/>
                    <img src="../../../images/like.jpg" className="likeButton" onClick={handleLike}/>
                </div>
            </div>
            }
            { 
                !loading && !currentUser && <img src="../../../images/dogholmesedit.jpg" className="noDogs" alt="No hay más usuarios que mostrar" />
            }
        </Fragment>
    )
}

const mapStateToProps =({user})=>({users:user.users});
export default connect(mapStateToProps)(Dogs) ; 