import { Card, Modal, Form, Input, Button, Row, InputNumber, Col, Image, Typography, Result } from 'antd';
import { EditOutlined, PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss'

import {
    useGetProductosQuery, useAddProductoMutation,
    usePutProductoMutation, useDeleteProductoMutation
} from '../api/apiSlice'

const { Paragraph } = Typography;
const { Meta } = Card;

const ProductoCard = ({ content }) => {
    const [putProducto, putRes] = usePutProductoMutation()
    const [deleteProducto, delRes] = useDeleteProductoMutation()

    const info = (props) => {
        const onFinish = (values) => {
            putProducto(values)
                .unwrap()
                .then(() => { })
                .then((error) => {
                    console.log(error)
                })
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

    return (
        <Col className="gutter-box" key={uuidv4} >
            <Card
                style={{ width: 200, marginBottom: '5%' }}
                hoverable
                cover={
                    <Image
                        height={200}
                        width={200}
                        src={content.imagen}
                        preview={false}
                        style={{ objectFit: 'cover', padding: '10px' }}
                    />
                }
                actions={[
                    <EditOutlined key="edit" onClick={() => info(content)} />,
                    <DeleteOutlined key="delete" onClick={() => deleteProducto(content.id)} />
                ]}
                key={content.id}
            >
                <Meta
                    title={`${content.nombre}`}
                    description={
                        <>
                            <Paragraph>Código: #000AE{content.id}</Paragraph>
                            <Paragraph>Descripcion: {content.descripcion}</Paragraph>
                            <Paragraph>Precio (CLP): ${content.precio}</Paragraph>
                        </>
                    } />
            </Card>
        </Col>
    )
}

function ListadoProductos() {
    const {
        data: productos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductosQuery({ refetchOnMountOrArgChange: true })

    const [addProducto, response] = useAddProductoMutation()
    const onSubmit = (values) => {
        addProducto(values)
            .unwrap()
            .then(() => { })
            .then((error) => {
                console.log(error)
            })
    }

    const success = () => {
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
                        'id': productos.length + 1,
                        'imagen': 'https://www.svgrepo.com/show/189987/package-box.svg',
                    }}
                    onFinish={onSubmit}
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

    let productosContent
    if (isLoading) {
        productosContent = (
            <div className="loading"></div>
        )
    } else if (isSuccess) {
        productosContent = productos.map((item) => {
            return <ProductoCard content={item} key={item.id} />
        })
    } else if (isError) {
        productosContent = (
            <Result
                status="error"
                title="Error al cargar los productos"
                subTitle="Porfavor, intente nuevamente."
                extra={[
                    <Button type="primary" key="console" onClick={() => window.location.reload()}>
                        Recargar pagina
                    </Button>
                ]}
                style={{ paddingLeft: '38%', paddingTop: '6%' }}
            >
            </Result>
        )
    }
    return (
        <>
            <Row gutter={[16, 16]} className="crudPanel">
                <Button type="primary" icon={<PlusSquareOutlined />}
                size={'large'} onClick={success} >Agregar Producto </Button>
            </Row>
            <Row gutter={16}>{productosContent}</Row>
        </>
    )
}

export default ListadoProductos;
