import { Button, Form, Input, InputNumber } from "antd";
import { SaveOutlined } from '@ant-design/icons'
import { useEffect } from "react";

const { Item } = Form;

const PredioForm = ({
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
      <Item  name="numeroPredial" label="Número predial" rules={[{required: true, message: 'El número predial es obligatorio'}]}>
        <InputNumber style={{float:"right"}} />            
      </Item>
      <Item name="avaluo" label="Avaluo">
        <InputNumber style={{float:"right"}} />            
      </Item>
      <Item  name="nombrePredio" label="Nombre del predio">
        <Input  />
      </Item>
      <Item  name="departamento"  label="Nombre del departamento">
        <Input />
      </Item>
      <Item name="municipio" label="Nombre del municipio">
        <Input  />
      </Item>
      <Item  name="direccion"  label="Dirección"rules={[{required: true, message: 'La dirección es obligatoria'}]}>
        <Input />
      </Item>
      <Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
        Guardar
      </Button>
    </Item>
    </Form>
  );
};

export default PredioForm;
