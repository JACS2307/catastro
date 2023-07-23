import { Button, Form, Input, InputNumber, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Item } = Form;
const { Option } = Select;

const ConstruccionForm = ({ onSubmit, initialValues = undefined }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <Form onFinish={onSubmit} form={form} initialValues={initialValues}>
      <Item name="id" hidden />
      <Item name="idPredio" hidden />
      <Item
        name="areaTotal"
        label="Área total"
        rules={[{ required: true, message: "El área total es obligatoria" }]}
      >
        <InputNumber style={{float:"right", width:"300px"}} />
      </Item>
      <Item
        name="numPisos"
        label="Número de pisos:"
        rules={[
          { required: true, message: "El número de pisos es obligatorio" },
        ]}
      >
        <InputNumber style={{float:"right", width:"300px"}}/>
      </Item>
      <Item
        name="tipoConstruccion"
        label="Tipo de construcción:"
        rules={[
          { required: true, message: "El tipo de construcción es obligatorio" },
        ]}
      >
        <Select>
          <Option value={1}>Industrial</Option>
          <Option value={2}>Comercial</Option>
          <Option value={3}>Residencial</Option>
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

export default ConstruccionForm;
