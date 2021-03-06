import React, { Fragment, useEffect, useState} from 'react';
import { getOnlyMatchs, cleanUp } from '../../redux/actions/users';
import { connect } from 'react-redux';
import './Matchs.scss';
import { Button, Tooltip } from 'antd';
import { Spin } from 'antd';

const Matchs =({matchs})=> {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getOnlyMatchs()
        .then(res=>
            setLoading(false)) 
        .catch(console.error)
        return () => {
            cleanUp() 
        }
    }, [])
    return(
        <Fragment>
            <h1 className="titleMatchs">Mis Matchs</h1>
            { 
                loading && <div className="spinner"><Spin size="large" /></div>
            }
            { 
                !loading && matchs?.length>0 && <div className="matchsList">
                {
                    matchs.map(match=> {return (   
                        <div key={match.id} className="userMatch"> 
                            <Tooltip title="Su perfil">
                                <Button className="avatarButton" shape="circle" icon={<img src={match.dog_images} className="avatar" />} />
                            </Tooltip>
                            <p className="name"><strong>{match.name} y {match.human_name}</strong></p>
                        </div>
                        )})
                }
            </div>
            }
            { 
                !loading && !matchs?.length>0 && <img src="../../../images/dogholmeseditmatch.jpg" className="noDogs" alt="No hay matchs que mostrar" /> 
            }
        </Fragment>
    )
}

const mapStateToProps =({user})=>({matchs:user.matchs});
export default connect(mapStateToProps)(Matchs) ; 