import { Card, Modal, Form, Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const { Meta } = Card;

const Producto = () => {

    const [producto, setProductos] = useState([]);

    useEffect(() => {
        axios.get('https://gd3388ff764672b-nosepo.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/productos/')
            .then(response => {
                setProductos(response.data.items);
            })
    }, []);


    const onFinish = (values) => {
        console.log(values);
        axios.put('https://gd3388ff764672b-nosepo.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/productos/' + values.id, values)
            .then(response => {
                console.log(response);
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    const info = (props) => {
        Modal.info({
            title: 'Editando Producto: ' + props.nombre,
            icon: <EditOutlined />,
            maskClosable: true,
            closable: true,
            okButtonProps: { style: { display: 'none' } },
            content: (
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                        'id': props.id,
                        'nombre': props.nombre,
                        'descripcion': props.descripcion,
                        'precio': props.precio,
                        'imagen': props.imagen,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Id" name="id" noStyle>
                        <Input type='hidden' />
                    </Form.Item>

                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Descripcion"
                        name="descripcion"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Precio"
                        name="precio"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Imagen" name="imagen" noStyle>
                        <Input type='hidden' />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={Modal.destroyAll}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )
        });
    };


    return (
        <div>
            <h1>Productos</h1>
            <div>
                {producto.map((producto) => (
                    <Card
                        style={{ width: '20%' }}
                        hoverable
                        cover={<img alt="example" src={producto.imagen} />}
                        actions={[
                            <EditOutlined key="edit" onClickCapture={() => info(producto)} />
                        ]}
                        key={producto.id}
                    >
                        <Meta title={producto.nombre} description={producto.descripcion + ' | Precio: $' + producto.precio} />
                    </Card>
                ))}
            </div>
        </div>
    )

}

export default Producto;