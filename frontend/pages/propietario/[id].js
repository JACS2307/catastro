import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LayoutGeneral from "../../src/components/LayoutGeneral";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Space, message, Divider } from "antd";
import { useMutation, useQuery } from "@apollo/client";

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

import PropietarioForm from "../../src/components/propietarioForm";

const PropietarioDetail = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { query } = useRouter();

  const [id, setId] = useState();
  const [showModalPropietario, setShowModalPropietario] = useState(false);
  const [propietarioModal, setPropietarioModal] = useState();
  console.log(id);

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

  console.log(data);

  const onSubmitPropietario = async (propietario) => {
    propietario.idPredio = id;
    console.log(propietario);

    if (propietario.id) {
      // Actualizar
      const { data } = await updatePropietarioById({
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
    console.log(propietario);
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
    refetch();
  };

  return (
    <LayoutGeneral>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>
          Home / Propietarios/
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
      <h2 style={{ width:"150px", marginLeft:"10px", paddingLeft:"15px",
      border:"3px solid black", borderRadius:"25px"}}
      >Predio: {data?.predioById?.nombrePredio}</h2>
      <Divider>Propietarios</Divider>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          
        }}
      >
        <Space wrap>
          {data?.predioById?.propietarios?.nodes?.map((propietario) => {
            return (
              <Card
                title={propietario.nombreCompleto}
                bordered={false}
                style={{ width: 300, height: 400, margin: "1em" , top:"-10px"}}
              >
                <p>Nombre Completo: {propietario.nombreCompleto}</p>
                <p>Tipo de Documento: {propietario.tipoDocumentoByTipoDocumento.nombre}</p>
                <p>Número de documento: {propietario.numeroDocumento}</p>
                <p>Telefono: {propietario.telefono}</p>
                <p>Direccion: {propietario.direccion}</p>
                <p>Correo: {propietario.correo}</p>
                
                <Button
                  type="primary"
                  onClick={() => {
                    setShowModalPropietario(true);
                    setPropietarioModal(propietario);
                  }}
                  icon={<EditOutlined />}
                  style={{width:"250px" }}
                >
                  Modificar propietario
                </Button>
                <Button
                  style={{ width:"250px", top:"20px"}}
                  icon={<DeleteOutlined />}
                  type="primary"
                  onClick={() => onDeletePropietario(propietario)}
                >
                  Eliminar propietario
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
          <PropietarioForm onSubmit={onSubmitPropietario}  initialValues={propietarioModal}/>
        </Modal>
      </div>
    </LayoutGeneral>
  );
};

export default PropietarioDetail;
