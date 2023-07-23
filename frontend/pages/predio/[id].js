import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  ALL_CONSTRUCCIONS,
  ALL_PREDIOS,
  ALL_TERRENOS,
  GET_PREDIO_DETAILS,
} from "../../src/graphql/querys/gql";
import PredioForm from "../../src/components/predioForm";
import {
  INSERT_CONSTRUCCION,
  INSERT_TERRENO,
  UPDATE_CONSTRUCCION,
  UPDATE_PREDIO,
  UPDATE_TERRENO,
  DELETE_CONSTRUCCION_BY_ID,
  DELETE_TERRENO_BY_ID,
} from "../../src/graphql/mutations/gql";
import {
  Button,
  Card,
  Modal,
  Space,
  message,
  Divider,
  Alert,
  Col,
  Row,
} from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import LayoutGeneral from "../../src/components/LayoutGeneral";
import TerrenoForm from "../../src/components/terrenoForm";
import ConstruccionForm from "../../src/components/ConstruccionForm";

const PredioDetail = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [id, setId] = useState();
  const [showModalTerreno, setShowModalTerreno] = useState(false);
  const [showModalConstruccion, setShowModalConstruccion] = useState(false);
  const [construccionModal, setConstruccionModal] = useState();
  const [terrenoModal, setTerrenoModal] = useState();

  console.log(id);

  useEffect(() => {
    if (query) {
      setId(parseInt(query.id));
    }
  }, [query]);
  const [updatePredio] = useMutation(UPDATE_PREDIO);
  const [InsertConstruccion] = useMutation(INSERT_CONSTRUCCION);
  const [updateConstruccion] = useMutation(UPDATE_CONSTRUCCION);
  const [InsertTerreno] = useMutation(INSERT_TERRENO);
  const [updateTerreno] = useMutation(UPDATE_TERRENO);
  const [deleteConstruccionById] = useMutation(DELETE_CONSTRUCCION_BY_ID);
  const [deleteTerrenoById] = useMutation(DELETE_TERRENO_BY_ID);
  const { data, loading, error, refetch } = useQuery(GET_PREDIO_DETAILS, {
    variables: { id },
    refetchQueries: [
      {
        query: ALL_PREDIOS,
        query: ALL_CONSTRUCCIONS,
        query: ALL_TERRENOS,
      },
    ],
  });

  const onDeleteConstruccion = async (construccion) => {
    const { data } = await deleteConstruccionById({
      variables: {
        input: {
          id: construccion.id,
        },
      },
      refetchQueries: [
        {
          query: ALL_CONSTRUCCIONS,
        },
      ],
    });
    if (data.deleteConstruccionById?.construccion?.id) {
      message.info("Se ha eliminado ¡exitosamente!");
    } else {
      message.error(
        "Ha ocurrido un error al intentar eliminar la construcción:("
      );
    }
    refetch();
  };

  const onDeleteTerreno = async (terreno) => {
    const { data } = await deleteTerrenoById({
      variables: {
        input: {
          id: terreno.id,
        },
      },
      refetchQueries: [
        {
          query: ALL_TERRENOS,
        },
      ],
    });
    if (data.deleteTerrenoById?.terreno?.id) {
      message.info("Se ha eliminado ¡exitosamente!");
    } else {
      message.error(
        "Ha ocurrido un error al intentar eliminar la construcción:("
      );
    }
    refetch();
  };

  const predioData = data?.predioById;

  const onSubmitPredio = async (predioTemp) => {
    const { data } = await updatePredio({
      variables: {
        id: predioTemp.id,
        input: predioTemp,
      },
    });
    message.success("Predio Actualizado");
    console.log("Predio actualizado:", data.updatePredio);
    refetch();
  };

  const onSubmitConstruccion = async (construccion) => {
    construccion.idPredio = id;
    if (construccion.id) {
      // Actualizar
      const { data } = await updateConstruccion({
        variables: {
          input: {
            construccionPatch: construccion,
            id: construccion.id,
          },
        },
      });
      if (data.updateConstruccionById?.construccion?.id) {
        // lo creo
        message.success("Construcción Actualizada");
        setShowModalConstruccion(false);
      } else {
        message.error("Hubo un error al intentar a actualizar la construcción");
      }
    } else {
      // Crear
      const { data } = await InsertConstruccion({
        variables: {
          input: {
            construccion,
          },
        },
      });
      if (data.createConstruccion?.construccion?.id) {
        // lo creo
        message.success("Construcción creada");
        setShowModalConstruccion(false);
      } else {
        message.error("Hubo un error al intentar crear la construcción");
      }
    }

    refetch();
  };

  const onSubmitTerreno = async (terreno) => {
    terreno.idPredio = id;
    if (terreno.id) {
      // Actualizar
      const { data } = await updateTerreno({
        variables: {
          input: {
            terrenoPatch: terreno,
            id: terreno.id,
          },
        },
      });
      if (data.updateTerrenoById?.terreno?.id) {
        // lo creo
        message.success("Terreno Actualizado");
        setShowModalTerreno(false);
      } else {
        message.error("Hubo un error al intentar a actualizar el terreno");
      }
    } else {
      // Crear
      const { data } = await InsertTerreno({
        variables: {
          input: {
            terreno,
          },
        },
      });
      console.log("Terreno subido:", data.createTerreno.terreno.id);
      refetch();
      if (data.createTerreno?.terreno?.id) {
        // lo creo
        message.success("Terreno creado");
        setShowModalTerreno(false);
      } else {
        message.error("Hubo un error al intentar crear el terreno");
      }
    }

    refetch();
  };

  const regresar = () => {
    router.push("/predio");
  };

  if (loading) {
    return <p>Cargando detalles del predio...</p>;
  }

  if (error) {
    console.error("Error al obtener los detalles del predio:", error);
    return <p>Error al obtener los detalles del predio</p>;
  }

  if (loading) {
    return <p>Cargando detalles del predio...</p>;
  }

  if (error) {
    console.error("Error al obtener los detalles del predio:", error);
    return <p>Error al obtener los detalles del predio</p>;
  }

  const modalTerreno = () => {
    const terrenos = data?.predioById?.terrenos?.nodes;

    if (terrenos && terrenos.length > 0) {
      message.info("Ya hay un terreno registrado");
    } else {
      setShowModalTerreno(true);
    }
  };

  const addPropietario = () => {
    router.push(`/propietario/${id}`);
  };

  console.log(predioData);

  return (
    <LayoutGeneral>
      <Row>
        <Col span={12}>
          {predioData ? (
            <Card
              type="primary"
              bordered={false}
              style={{
                display: "flex",
                position: "relative",
                top: "15px",
                left: "180px",
                // marginLeft: "300px",
                // width: 600,
                height: 550,
                margin: "1em",
                width: "80%",
              }}
            >
              <>
                <h1 style={{ textAlign: "center" }}>
                  Modificar Predio {<EditOutlined />}
                </h1>
                <PredioForm
                  onSubmit={onSubmitPredio}
                  initialValues={predioData}
                />
                <Button
                  type="primary"
                  onClick={modalTerreno}
                  icon={<PlusOutlined />}
                  style={{ marginLeft: "25px" }}
                >
                  Agregar terreno
                </Button>
                <Button
                  type="primary"
                  onClick={addPropietario}
                  icon={<PlusOutlined />}
                  style={{ marginLeft: "25px" }}
                >
                  Agregar Propietario
                </Button>
              </>
            </Card>
          ) : (
            <p>No se encontraron detalles del predio</p>
          )}
        </Col>
        <Space wrap>
          {predioData?.terrenos?.nodes?.map((terreno) => {
            return (
              <Card
                title={"Terreno".terrreno}
                bordered={false}
                style={{ width: 280, height: 400, margin: "1em"
              ,position:"relative", marginLeft:"100px" }}
              >
                <p>Area total: {terreno.areaTotal}</p>
                <p>Valor comercial: {terreno.valorComercial}</p>
                <p>Fuente de agua: {terreno.fuentesAgua ? "Sí" : "No"}</p>
                <p>Numero de construcciones: {terreno.numConstrucciones}</p>
                <p>Tipo de construcción: {terreno.tipoTerrenoByTipo.nombre}</p>

                <Button
                  type="primary"
                  onClick={() => {
                    setShowModalTerreno(true);
                    setTerrenoModal(terreno);
                  }}
                  icon={<EditOutlined />}
                  style={{ width: "200px" }}
                >
                  Modificar terreno
                </Button>
                <Button
                  style={{ width: "200px", top: "20px" }}
                  icon={<DeleteOutlined />}
                  type="primary"
                  onClick={() => onDeleteTerreno(terreno)}
                >
                  Eliminar terreno
                </Button>
              </Card>
            );
          })}
        </Space>
      </Row>

      <Modal
        title="Agregar terreno"
        open={showModalTerreno}
        onCancel={() => setShowModalTerreno(false)}
        footer={null}
      >
        <TerrenoForm onSubmit={onSubmitTerreno} initialValues={terrenoModal} />
      </Modal>
      <Modal
        title="Agregar construcción"
        open={showModalConstruccion}
        onCancel={() => setShowModalConstruccion(false)}
        footer={null}
      >
        <ConstruccionForm
          onSubmit={onSubmitConstruccion}
          initialValues={construccionModal}
        />
      </Modal>
      <Divider>Construcciones</Divider>
      <Button
        style={{ position: "relative", top: "-50px" }}
        type="primary"
        onClick={() => {
          setConstruccionModal(undefined);
          setShowModalConstruccion(true);
        }}
        icon={<PlusOutlined />}
        htmlType="submit"
      >
        Agregar Construcción
      </Button>
      <Space wrap style={{ position: "relative", top: "0px", height: "400px" }}>
        {predioData?.construcciones?.nodes?.map((construccion) => {
          return (
            <Card
              title={construccion.idPredio}
              bordered={false}
              style={{
                width: 300,
                height: 280,
                margin: "1em",
                alignItems: "center",
              }}
            >
              <p>Número de pisos: {construccion.numPisos}</p>
              <p>Área Total: {construccion.areaTotal}</p>
              <p>
                Tipo de construcción:{" "}
                {construccion.tipoConstruccionByTipoConstruccion.nombre}
              </p>

              <Button
                type="primary"
                style={{ position: "relative", left: "0px" }}
                onClick={() => {
                  setShowModalConstruccion(true);
                  setConstruccionModal(construccion);
                }}
                icon={<EditOutlined />}
              >
                Modificar construcción
              </Button>
              <Button
                style={{ width: "200px", top: "15px" }}
                icon={<DeleteOutlined />}
                type="primary"
                onClick={() => onDeleteConstruccion(construccion)}
              >
                Eliminar construccion
              </Button>
            </Card>
          );
        })}
      </Space>
      <Divider>Propietarios</Divider>
      <Space wrap>
          {data?.predioById?.propietarios?.nodes?.map((propietario) => {
            return (
              <Card
                title={propietario.nombreCompleto}
                bordered={false}
                style={{ width: 300, height: 350, margin: "1em" , top:"-10px"}}
              >
                <p>Nombre Completo: {propietario.nombreCompleto}</p>
                <p>Tipo de Documento: {propietario.tipoDocumentoByTipoDocumento.nombre}</p>
                <p>Número de documento: {propietario.numeroDocumento}</p>
                <p>Telefono: {propietario.telefono}</p>
                <p>Direccion: {propietario.direccion}</p>
                <p>Correo: {propietario.correo}</p>
              </Card>
            );
          })}
        </Space>
    </LayoutGeneral>
  );
};

export default PredioDetail;
