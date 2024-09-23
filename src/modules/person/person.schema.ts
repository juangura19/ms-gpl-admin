import { gql } from 'apollo-server-express';

const personSchema = gql`
  type Persona {
    id: Int!
    nombre: String!
    edad: Int!
  }

  type Query {
    personas: [Persona]
    persona(id: Int!): Persona
  }

  type Mutation {
    addPersona(nombre: String!, edad: Int!): Persona
    editPersona(id: Int!, nombre: String!, edad: Int): Persona
    deletePersona(id: Int!): Boolean  # Puedes devolver un valor si lo deseas
  }
`;

export default personSchema;
