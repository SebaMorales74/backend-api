import { Card, Modal, Form, Input, Button, Spin, Row, InputNumber, Col } from 'antd';
import { EditOutlined, PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './style.css'
const { Meta } = Card;

const Producto = () => {

    const [producto, setProductos] = useState([]);
    const [cambio, setCambio] = useState(false);

    useEffect(() => {
        axios.get('https://gd3388ff764672b-nosepo.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/productos/')
            .then(response => {
                setProductos(response.data.items);
                setCambio(false);
            })
    }, [cambio]);

    const eliminar = (props) => {
        axios.delete('https://gd3388ff764672b-nosepo.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/productos/' + props.id)
            .then(response => {
                console.log(response);
                setCambio(true);
            })
    }

    const editar = (props) => {
        const onFinish = (values) => {
            console.log(values);
            axios.put('https://gd3388ff764672b-nosepo.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/productos/' + values.id, values)
                .then(response => {
                    console.log(response);
                    setCambio(true);
                })
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
                <Spin spinning={cambio}>
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
                                    message: 'Por favor ingrese el nombre del producto!',
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
                                    message: 'Porfavor, ingrese una descripcion',
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
                                    message: 'Porfavor, ingrese un precio',
                                    type: 'number',
                                },
                            ]}
                        >
                            <InputNumber type='number' />
                        </Form.Item>

                        <Form.Item
                            label="Imagen"
                            name="imagen"
                            rules={[
                                {
                                    required: true,
                                    message: 'Porfavor, ingrese una imagen',
                                    type: 'url',
                                },
                            ]}
                        >
                            <Input placeholder='Ej: https://imgur.io/' />
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
                </Spin >
            )
        });
    };

    const agregar = () => {
        const onFinish = (values) => {
            console.log(values);
            axios.post('https://gd3388ff764672b-nosepo.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/productos/', values)
                .then(response => {
                    console.log(response);
                    setCambio(true)
                })
        }

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        }
        Modal.info({
            title: 'Agregar Producto:',
            icon: <PlusSquareOutlined />,
            maskClosable: true,
            closable: true,
            okButtonProps: { style: { display: 'none' } },
            content: (
                <Spin spinning={cambio}>
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
                            'imagen': 'https://www.svgrepo.com/show/339970/checkbox-undeterminate.svg',
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
                                    message: 'Porfavor, ingrese un nombre',
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
                                    message: 'Porfavor, ingrese una descripcion.',
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
                                    message: 'Porfavor, ingrese un precio',
                                    type: 'number',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Imagen"
                            name="imagen"
                            rules={[
                                {
                                    required: true,
                                    message: 'Porfavor, ingrese una imagen',
                                    type: 'url',
                                },
                            ]}
                        >
                            <Input placeholder='Ej: https://imgur.io/' />
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
                </Spin >
            )
        });
    };

    return (
        <>
            <Row>
                <h1 style={{ marginRight: '5%' }}>Productos</h1>
                <Button type="primary" onClickCapture={agregar}>Agregar producto</Button>
                <Button type="primary" onClickCapture={() => setCambio(true)} style={{ visibility: 'hidden' }}>Actualizar</Button>
            </Row>
            <Row gutter={16} style={{ paddingTop: '5%' }}>
                {producto.map((producto) => (
                    <Col className="gutter-box" key={uuidv4} >
                        <Card
                            style={{ width: '100%', marginBottom: '5%' }}
                            hoverable
                            cover={<img alt="example" src={producto.imagen} style={{ height: '10vh' }} />}
                            actions={[
                                <EditOutlined key="edit" onClickCapture={() => editar(producto)} />,
                                <DeleteOutlined key="erase" onClickCapture={() => eliminar(producto)} />
                            ]}
                            key={producto.id}
                        >
                            <Meta title={producto.nombre} description={producto.descripcion + ' | Precio: $' + producto.precio} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )

}

export default Producto;