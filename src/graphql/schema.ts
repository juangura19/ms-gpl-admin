import { mergeTypeDefs } from '@graphql-tools/merge';
import personSchema from '../modules/person/person.schema';
import entitySchema from '../modules/entity/entity.schema';

const schema = mergeTypeDefs([personSchema,entitySchema]);

export const typeDefs = mergeTypeDefs(schema);