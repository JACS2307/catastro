import React, { Component, useState } from "react";
import {
  BankOutlined,
  EnvironmentOutlined,
  FormatPainterOutlined,
  HomeOutlined,
  UserOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Modal, Space, message } from "antd";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ALL_PREDIOS } from "../../src/graphql/querys/gql";
import PredioForm from "../../src/components/predioForm";
import {
  CREATE_PREDIO,
  DELETE_PREDIO_BY_ID,
} from "../../src/graphql/mutations/gql";
import LayoutGeneral from "../../src/components/LayoutGeneral";





const Home = () => {
  const { data } = useQuery(ALL_PREDIOS);
  const [showModal, setShowModal] = useState(false);
  
  const [createPredio] = useMutation(CREATE_PREDIO);
  const [deletePredio] = useMutation(DELETE_PREDIO_BY_ID);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSubmitPredio = async (predio) => {
    console.log(predio);
    const { data } = await createPredio({
      variables: {
        input: {
          predio,
        },
      },
    });
    console.log(data);

    if (data?.createPredio?.predio?.id) {
      message.info("Se ha creado el predio ¡exitosamente!");
      setShowModal(false);
    } else {
      message.error("Ha ocurrido un error al intentar crear el predio :(");
    }
  };

  const onDeletePredio = async (predio) => {
    const { data } = await deletePredio({
      variables: {
        input: {
          id: predio.id,
        },
      },
      refetchQueries: [
        {
          query: ALL_PREDIOS,
        },
      ],
    });
    if (data.deletePredioById?.predio?.id) {
      message.info("Se ha eliminado ¡exitosamente!");
    } else {
      message.error("Ha ocurrido un error al intentar eliminar el predio :(");
    }
  };

  

  return (
    <LayoutGeneral>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>
          Home / Predios
          <Button
            type="primary"
            onClick={() => setShowModal(true)}
            icon={<PlusOutlined />}
            style={{ marginLeft: "25px" }}
          >
            Crear predio
          </Button>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
        }}
      >
        <Space wrap>
          {data?.allPredios?.nodes?.map((predio) => {
            return (
              <Card
                extra={<a href={`/predio/${predio.id}`}>Ver mas</a>}
                title={predio.nombrePredio}
                bordered={false}
                style={{ width: 250, height: 250, margin: "1em" }}
              >
                <p>Número predial: {predio.numeroPredial}</p>
                <p>Departamento: {predio.departamento}</p>
                <p>Municipio: {predio.municipio}</p>
                <Button
                  style={{ marginLeft: "55px" }}
                  icon={<DeleteOutlined />}
                  type="primary"
                  onClick={() => onDeletePredio(predio)}
                >
                  Eliminar
                </Button>
              </Card>
            );
          })}
        </Space>
        <Modal
          title="Crear predio"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <PredioForm onSubmit={onSubmitPredio} />
        </Modal>
      </div>
    </LayoutGeneral>
  );
};

export default Home;
