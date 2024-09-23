import { mergeResolvers } from '@graphql-tools/merge';
import { entityResolver } from "../modules/entity/entity.resolver";
import { personResolver } from "../modules/person/person.resolver";

const resolver = [personResolver, entityResolver];
export const resolvers = mergeResolvers(resolver);