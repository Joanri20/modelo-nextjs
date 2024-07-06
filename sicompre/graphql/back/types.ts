import { gql } from "apollo-server-micro";

const globalTypes = gql`
  type Query {
    obtenerRubros: String
  }
`;

const GlobalTypes = [globalTypes];

export { GlobalTypes };
