import { gql } from "@apollo/client";

export const CREATE_PREDIO = gql`
  mutation insertPredio($input: CreatePredioInput!) {
    createPredio(input: $input) {
      predio {
        id
        numeroPredial
        avaluo
        nombrePredio
        departamento
        municipio
        direccion
      }
    }
  }
`;

export const DELETE_PREDIO_BY_ID = gql`
  mutation deletePredioById($input: DeletePredioByIdInput!) {
    deletePredioById(input: $input) {
      predio {
        id
      }
    }
  }
`;

export const DELETE_CONSTRUCCION_BY_ID = gql`
  mutation deleteConstruccionById($input: DeleteConstruccionByIdInput!) {
    deleteConstruccionById(input: $input) {
      construccion {
        id
      }
    }
  }
`;

export const DELETE_TERRENO_BY_ID = gql`
  mutation deleteTerrenoById($input: DeleteTerrenoByIdInput!) {
    deleteTerrenoById(input: $input) {
      terreno {
        id
      }
    }
  }
`;



export const UPDATE_PREDIO = gql`
  mutation UpdatePredio($id: Int!, $input: PredioPatch!) {
    updatePredioById(input: { id: $id, predioPatch: $input }) {
      predio {
        id
      }
    }
  }
`;

export const INSERT_CONSTRUCCION= gql`
mutation InsertConstruccion($input: CreateConstruccionInput!) {
  createConstruccion(input: $input) {
    construccion {
      id
    }
  }
}
`;

export const INSERT_TERRENO= gql`
mutation InsertTerreno($input: CreateTerrenoInput!) {
  createTerreno(input: $input) {
    terreno{
      id
    }
  }
}
`;

export const UPDATE_CONSTRUCCION = gql`
  mutation updateConstruccion($input: UpdateConstruccionByIdInput!) {
    updateConstruccionById(input: $input) {
      construccion {
        id
      }
    }
  }
`;

export const UPDATE_TERRENO = gql`
  mutation updateTerreno($input: UpdateTerrenoByIdInput!) {
    updateTerrenoById(input: $input) {
      terreno {
        id
      }
    }
  }
`;

