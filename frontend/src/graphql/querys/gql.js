import { gql } from '@apollo/client'

export const ALL_PREDIOS = gql`
query AllPredios {
  allPredios {
    nodes {
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

export const ALL_PROPIETARIOS = gql`
query allPropietarios {
  allPropietarios{
    nodes{
      id
      telefono
      correo
      direccion
      numeroDocumento
      nombreCompleto
      tipoDocumento
      idPredio
    }
  }
}
`;

export const ALL_CONSTRUCCIONS = gql`
query allConstruccions {
  allPropietarios{
    nodes{
      id
      numPisos
      areaTotal
      direccion
      tipoConstruccion
      idPredio
    }
  }
}
`;

export const ALL_TERRENOS= gql`
query allTerrenos {
  allTerrenos{
    nodes{
      id
      valorComercial
      areaTotal
      fuentesAgua
      numConstrucciones
      tipo
      idPredio
    }
  }
}
`;

export const GET_PREDIO_DETAILS = gql`
  query GetPredioDetails($id: Int!) {
    predioById(id: $id) {
        id
        numeroPredial
        avaluo
        nombrePredio
        departamento
        municipio
        direccion
      	terrenos: terrenosByIdPredio {
          nodes {
            id
            idPredio
            areaTotal
            valorComercial
            fuentesAgua
            numConstrucciones
            tipo
            tipoTerrenoByTipo{
              nombre
            }
          }
        }
    		construcciones: construccionsByIdPredio {
          nodes {
            id
            numPisos
            areaTotal
            direccion
            tipoConstruccion
            tipoConstruccionByTipoConstruccion {
              nombre
            }
          }
        }
    	 propietarios: propietariosByIdPredio {
        nodes {
          id
          telefono
          direccion
          correo
          numeroDocumento
          nombreCompleto
          tipoDocumento
        }
      }
    }
  }
`;

