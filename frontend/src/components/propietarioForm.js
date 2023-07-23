import { Button, Form, Input, InputNumber, Select } from "antd";
import { SaveOutlined } from '@ant-design/icons'
import { useEffect } from "react";

const { Item } = Form;

const PropietarioForm = ({
    onSubmit,
    initialValues = undefined,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <Form
        onFinish={onSubmit}
        form={form}
        initialValues={initialValues}
    >
      <Item name="id" hidden/>
      <Item  name="telefono" label="Telefono" rules={[{required: true, message: 'El número de telefono es obligatorio'}]}>
        <InputNumber style={{float:"right", width:"300px"}} />            
      </Item>
      <Item name="correo" label="Correo" rules={[{required: true, message: 'El correo es obligatorio'}]}>
        <Input style={{float:"right", width:"300px"}} />            
      </Item>
      <Item  name="direccion" label="Dirección" rules={[{required: true, message: 'La dirección es obligatoria'}]}>
        <Input style={{float:"right",width:"300px"}} />
      </Item>
      <Item  name="numeroDocumento"  label="Número de documento"rules={[{required: true, message: 'El número de documento es obligatorio'}]}>
        <InputNumber style={{float:"right", width:"300px"}}/>
      </Item>
      <Item name="nombreCompleto" label="Nombre Completo" rules={[{required: true, message: 'El nombre completo es obligatorio'}]}>
        <Input style={{float:"right", width:"300px"}} />
      </Item>
      <Item  name="tipoDocumento"  label="Tipo de documento"rules={[{required: true, message: 'El tipo de documento es obligatorio'}]}>
      <Select style={{float:"right", width:"300px"}}>
          <Option value={1}>CC</Option>
          <Option value={2}>NIT</Option>
        </Select>
      </Item>
      <Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
        Guardar
      </Button>
    </Item>
    </Form>
  );
};

export default PropietarioForm;
