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
        <InputNumber style={{float:"right"}} />            
      </Item>
      <Item name="correo" label="Correo">
        <Input style={{float:"right"}} />            
      </Item>
      <Item  name="direccion" label="Dirección">
        <Input  />
      </Item>
      <Item  name="numeroDocumento"  label="Número de documento">
        <InputNumber />
      </Item>
      <Item name="nombreCompleto" label="Nombre Completo">
        <Input  />
      </Item>
      <Item  name="tipoDocumento"  label="Tipo de documento"rules={[{required: true, message: 'La dirección es obligatoria'}]}>
      <Select>
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
