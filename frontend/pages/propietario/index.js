import React, { useEffect, useState } from "react";
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
import {
  ALL_PREDIOS,
  ALL_PROPIETARIOS,
  GET_PREDIO_DETAILS,
} from "../../src/graphql/querys/gql";
import {
  DELETE_PROPIETARIO_BY_ID,
  INSERT_PROPIETARIO,
  UPDATE_PROPIETARIO,
} from "../../src/graphql/mutations/gql";
import LayoutGeneral from "../../src/components/LayoutGeneral";
import PropietarioForm from "../../src/components/propietarioForm";

const PropietarioIndex = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [id, setId] = useState();
  const [showModalPropietario, setShowModalPropietario] = useState(false);
  const [propietarioModal, setpropietarioModal] = useState();

  useEffect(() => {
    if (query) {
      setId(parseInt(query.id));
    }
  }, [query]);

  const [InsertPropietario] = useMutation(INSERT_PROPIETARIO);
  const [deletePropietarioById] = useMutation(DELETE_PROPIETARIO_BY_ID);
  const [updatePropietarioById] = useMutation(UPDATE_PROPIETARIO);
  const { data, loading, error, refetch } = useQuery(GET_PREDIO_DETAILS, {
    variables: { id },
    refetchQueries: [
      {
        query: ALL_PREDIOS,
        query: ALL_PROPIETARIOS,
      },
    ],
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSubmitPropietario = async (propietario) => {
    propietario.idPredio = id;
    if (propietario.id) {
      // Actualizar
      const { data } = await updatePropietario({
        variables: {
          input: {
            propietarioPatch: propietario,
            id: propietario.id,
          },
        },
      });
      if (data.updatePropietarioById?.propietario?.id) {
        // lo creo
        message.success("Propietario Actualizado");
        setShowModalPropietario(false);
      } else {
        message.error("Hubo un error al intentar a actualizar el terreno");
      }
    } else {
      // Crear
      const { data } = await InsertPropietario({
        variables: {
          input: {
            propietario,
          },
        },
      });
      console.log("Propietario subido:", data.createPropietario.propietario.id);
      refetch();
      if (data.createPropietario?.propietario?.id) {
        // lo creo
        message.success("Propietario creado");
        setShowModalPropietario(false);
      } else {
        message.error("Hubo un error al intentar crear el propietario");
      }
    }

    refetch();
  };

  const onDeletePropietario = async (propietario) => {
    const { data } = await deletePropietarioById({
      variables: {
        input: {
          id: propietario.id,
        },
      },
      refetchQueries: [
        {
          query: ALL_PROPIETARIOS,
        },
      ],
    });
    if (data.deletePropietarioById?.propietario?.id) {
      message.info("Se ha eliminado ¡exitosamente!");
    } else {
      message.error(
        "Ha ocurrido un error al intentar eliminar el propietario:("
      );
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
          Home / Propietarios
          <Button
            type="primary"
            onClick={() => setShowModalPropietario(true)}
            icon={<PlusOutlined />}
            style={{ marginLeft: "25px" }}
          >
            Crear propietario
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
          {data?.allPropietarios?.nodes?.map((propietario) => {
            return (
              <Card
                extra={<a href={`/propietario/${propietario.id}`}>Ver mas</a>}
                title={propietario.nombreCompletoPropietario}
                bordered={false}
                style={{ width: 250, height: 250, margin: "1em" }}
              >
                <p>Telefono: {propietario.telefono}</p>
                <p>Direccion: {propietario.direccion}</p>
                <p>Correo: {propietario.correo}</p>
                <p>Nombre Completo: {propietario.nombreCompleto}</p>
                <Button
                  style={{ marginLeft: "55px" }}
                  icon={<DeleteOutlined />}
                  type="primary"
                  onClick={() => onDeletePropietario(propietario)}
                >
                  Eliminar
                </Button>
              </Card>
            );
          })}
        </Space>
        <Modal
          title="Crear propietario"
          open={showModalPropietario}
          onCancel={() => setShowModalPropietario(false)}
          footer={null}
        >
          <PropietarioForm onSubmit={onSubmitPropietario} />
        </Modal>
      </div>
    </LayoutGeneral>
  );
};

export default PropietarioIndex;
