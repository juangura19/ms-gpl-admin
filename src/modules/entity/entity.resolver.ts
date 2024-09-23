import { GraphQLScalarType, Kind } from "graphql";
import { AppGraphQLError, ErrorType } from "../../common/errors/errorTypes";
import { createEntity, deleteEntity, Entity, getEntity, getEntityById, updateEntity } from "./entity.model";

const resolvers = {
    Query: {
        entities: async () => await getEntity(),
        entity: async (parent: any, args: { id: number }, context: any) => {
            const res = await getEntityById(args.id)
            if (!res) throw new AppGraphQLError('Entidad no encontrada', ErrorType.VALIDATION_ERROR)
            return res
        },
    },
    Mutation: {
        addEntity: async (parent: any, args: { name: string, address: string, type: string, contact: any }, context: any) => {
            let req: Entity = {
                name: args.name,
                address: args.address,
                type: args.type,
                status: true,
                contact: args.contact,
                update_at: new Date().toISOString(),
                update_by: context.user.user
            }
            const res = await createEntity(req)
            return res
        },
        editEntity: async (parent: any, args: { id: number, name: string, address: string, type: string, contact: JSON, status: boolean }, context: any) => {
            let req: Entity = {
                id: args.id,
                name: args.name,
                address: args.address,
                type: args.type,
                status: args.status,
                contact: args.contact,
                update_at: new Date().toISOString(),
                update_by: context.user.user
            }
            const res = await updateEntity(req)
            return res
        },
        deleteEntity: async (parent: any, args: { id: number }, context: any) => {
            const res = await deleteEntity(args.id)
            return res
        },
    }
}


export const entityResolver = resolvers;