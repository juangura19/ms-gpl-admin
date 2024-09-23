import { gql } from 'apollo-server-express';

const entitySchema = gql`
  scalar JSON
  type Entity {
    id: Int!
    name: String!
    address: String!
    type: String!
    status: Boolean!
    contact: JSON
    update_at: String! 
    update_by: String!
  }

  type Query {
    entities: [Entity]
    entity(id: Int!): Entity
  }

  type Mutation {
    addEntity(name: String!, address: String!, type: String!, contact:JSON!): Entity
    editEntity(id: Int!, name: String!, address: String!, type: String!, contact:JSON!, status:Boolean!): Entity
    deleteEntity(id: Int!): Boolean
  }
`;

export default entitySchema;
