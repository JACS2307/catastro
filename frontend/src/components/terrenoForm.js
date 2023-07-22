import { Button, Form, Input, InputNumber,Select, Checkbox} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Item } = Form;
const { Option } = Select;

const TerrenoForm = ({ onSubmit, initialValues = undefined }) => {
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
        label="Área total:"
        rules={[{ required: true, message: "El área total es obligatoria" }]}
      >
        <InputNumber style={{ float: "right" }} />
      </Item>
      <Item
        name="valorComercial"
        label="Valor comercial:"
        rules={[
          { required: true, message: "El valor comercial es obligatorio" },
        ]}
      >
        <InputNumber style={{ float: "right" }} />
      </Item>
      <Item name="fuentesAgua" label="Tiene fuentes de agua:" required>
      <Select>
          <Option value={true}>Sí</Option>
          <Option value={false}>No</Option>
        </Select>
      </Item>
      <Item
        name="numConstrucciones"
        label="Numero de construcciones:"
        rules={[
          {
            required: true,
            message: "El número de construcciones es obligatorio",
          },
        ]}
      >
        <InputNumber />
      </Item>
      <Item name="tipo" label="Tipo de terreno:">
        <Select>
          <Option value={1}>Rural</Option>
          <Option value={2}>Urbano</Option>
        </Select>
      </Item>
      <Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
          Crear Terreno
        </Button>
      </Item>
    </Form>
  );
};

export default TerrenoForm;
