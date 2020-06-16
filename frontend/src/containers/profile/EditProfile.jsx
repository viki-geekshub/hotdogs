import React, { Fragment } from 'react';
import { Form, Input, Button, notification } from 'antd';
import './Profile.scss'
import { updateProfile } from '../../redux/actions/users';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
const EditProfile = (props) => {
    const history = useHistory();
    const onFinish = user => { //onFinish - es como el onSubmit (propiedad del antdesign)
        console.log(user);
        updateProfile(user)
        .then(() => {
            notification.success({ message: 'Registro', description: 'Usuario actualizado con éxito' })
            history.push('/profile')
        })
         .catch(error => {
                console.error(error)
                notification.error({ message: 'Registro', description: 'Error al tratar de actualizar al usuario' })
         })
    };
    return (
        <Fragment>
            <h1>Edita tu perfil:</h1>
            <div className="formContainer">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={console.error}
                >
                    <Form.Item
                        label="Nombre del usuario (perro)"
                        name="name"
                        initialValue={props.user?.name}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={props.user?.email}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Foto del perro"
                        name="dog_images"
                        initialValue={props.user?.dog_images}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Sobre el perro"
                        name="about_me"
                        initialValue={props.user?.about_me}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ciudad"
                        name="city"
                        initialValue={props.user?.city}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Edad del perro"
                        name="age"
                        initialValue={props.user?.age}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Raza del perro"
                        name="race"
                        initialValue={props.user?.race}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Color del perro"
                        name="color"
                        initialValue={props.user?.color}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nombre del usuario (humano)"
                        name="human_race"
                        initialValue={props.user?.human_name}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Foto del usuario humano"
                        name="human_images"
                        initialValue={props.user?.human_images}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Sobre el usuario humano"
                        name="about_my_human"
                        initialValue={props.user?.about_my_human}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Edad del usuario humano"
                        name="age_my_human"
                        initialValue={props.user?.age_my_human}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" className="editButton">
                            Actualizar Perfil
            </Button>
                    </Form.Item>
                </Form>
            </div>
        </Fragment>
    );
};

const mapStateToProps =({user})=>({user:user.user});
export default connect(mapStateToProps)(EditProfile) ;