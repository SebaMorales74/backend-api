import { Card, Modal, Form, Input, Button, Row, InputNumber, Col, Image, Typography } from 'antd';
import { EditOutlined, PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

import './styles.scss'


const { Paragraph } = Typography
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


    const info = (props) => {
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
                        name="nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor, ingresa un nombre para el producto.',
                            },
                        ]}
                    >
                        <Input addonBefore="Nombre: " />
                    </Form.Item>

                    <Form.Item
                        name="descripcion"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor ingresa una descripción para el producto.',
                            },
                        ]}
                    >
                        <Input addonBefore="Descripcion: " />
                    </Form.Item>

                    <Form.Item
                        name="precio"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor ingresa un precio para el producto.',
                            },
                        ]}
                    >
                        <InputNumber addonBefore="Precio: " />
                    </Form.Item>

                    <Form.Item
                        name="imagen"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor, ingrese una imagen',
                                type: 'url',
                            },
                        ]}
                    >
                        <Input addonBefore="Imagen: " />
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

    const success = () => {
        const onFinish = (values) => {
            console.log(values);
            axios.post('http://localhost:3001/productos/', values)
                .then(response => {
                    console.log(response);
                    setCambio(true)
                })
        }

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        }
        Modal.success({
            title: 'Agregar Producto:',
            icon: <PlusSquareOutlined />,
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
                        'id': producto.length + 1,
                        'imagen': 'https://www.svgrepo.com/show/189987/package-box.svg',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Id" name="id" noStyle>
                        <Input type='hidden' />
                    </Form.Item>

                    <Form.Item
                        name="nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor, ingresa un nombre para el producto.',
                            },
                        ]}
                    >
                        <Input addonBefore="Nombre: " />
                    </Form.Item>

                    <Form.Item
                        name="descripcion"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor ingresa una descripción para el producto.',
                            },
                        ]}
                    >
                        <Input addonBefore="Descripcion: " />
                    </Form.Item>

                    <Form.Item
                        name="precio"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor ingresa un precio para el producto.',
                            },
                        ]}
                    >
                        <InputNumber addonBefore="Precio: " />
                    </Form.Item>

                    <Form.Item
                        name="imagen"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor, ingrese una imagen',
                                type: 'url',
                            },
                        ]}
                    >
                        <Input addonBefore="Imagen: " />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={() => { Modal.destroyAll() }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )
        });
    };

    const remove = (producto) => {
        axios.delete('http://localhost:3001/productos/' + producto.id)
            .then(response => {
                console.log(response);
                setCambio(true)
            })
    }


    return (
        <>
            {
                producto == [] ?
                    <div class="loading"></div>
                    :
                    <>
                        <Row gutter={[16, 16]} className="crudPanel">
                            <Button type="primary" icon={<PlusSquareOutlined />} size={'large'} onClick={success}> Agregar Producto </Button>
                        </Row>
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
                                            <EditOutlined key="edit" onClickCapture={() => info(producto)} />,
                                            <DeleteOutlined key="delete" onClickCapture={() => remove(producto)}/>
                                        ]}
                                        key={producto.id}
                                    >
                                        <Meta
                                            title={`${producto.nombre}`}
                                            description={
                                                <>
                                                    <Paragraph>Código: #000AE{producto.id}</Paragraph>
                                                    <Paragraph>Descripcion: {producto.descripcion}</Paragraph>
                                                    <Paragraph>Precio (CLP): ${producto.precio}</Paragraph>
                                                </>
                                            } />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
            }
        </>
    )
}
export default Productos;