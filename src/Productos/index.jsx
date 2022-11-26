import { Card, Modal, Form, Input, Button, Spin, Row, InputNumber, Col, Image } from 'antd';
import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

import './styles.scss'

const { Meta } = Card;

const Productos = () => {
    const [producto, setProductos] = useState([]);
    const [cambio, setCambio] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/productos')
            .then(response => {
                setProductos(response.data);
                setCambio(false);
            })
    }, [cambio]);

    const onFinish = (values) => {
        console.log(values);
        axios.put('http://localhost:3001/productos/' + values.id, values)
            .then(response => {
                console.log(response);
            })
        setCambio(true);
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
                        'imagen': props.imagen,
                        'precio': props.precio,
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
        <>
            {
                producto == [] ?
                    <div class="loading"></div>
                    :
                    <Row gutter={16}>
                        {producto.map((producto) => (
                            <Col className="gutter-box" key={uuidv4} >
                                <Card
                                    style={{ width: 200, marginBottom: '5%' }}
                                    hoverable
                                    cover={
                                        <Image
                                            height={200}
                                            width={200}
                                            src={producto.imagen}
                                            preview={false}
                                            style={{ objectFit: 'cover', padding: '10px' }}
                                        />
                                    }
                                    actions={[
                                        <EditOutlined key="edit" onClickCapture={() => info(producto)} />
                                    ]}
                                    key={producto.id}
                                >
                                    <Meta title={producto.nombre} description={<><>A</><>A</></>} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
            }
        </>
    )
}
export default Productos;