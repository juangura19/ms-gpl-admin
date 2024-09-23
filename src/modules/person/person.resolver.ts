
import { ErrorType, AppGraphQLError } from "../../common/errors/errorTypes";
import { createPersona, deletePersona, getPersonaById, getPersonas, updatePersona } from "./person.model";
import { error } from "console";
import { logError, logInfo } from "../../common/utils/logger";

const resolvers = {
  Query: {
    personas: async () => await getPersonas(),
    persona: async (parent:any, args: { id: number }, context:any) => {
      logInfo('Inizialization search persona for ID', context.headers)
      const res = await getPersonaById(args.id)
      if (!res) throw new AppGraphQLError('Persona no encontrada', ErrorType.VALIDATION_ERROR)
      return res
    },
  },
  Mutation: {
    addPersona: async (parent: any, args: { nombre: string, edad: number }, payload: any) => {
      const res = await createPersona(args.nombre, args.edad)
      return res
    },
    editPersona: async (parent: any, args: { id: number, nombre: string, edad: number }) => {
      const obj = await getPersonaById(args.id)
      if (!obj) throw new AppGraphQLError('Persona no encontrada', ErrorType.VALIDATION_ERROR)

      const res = await updatePersona(args.id, args.nombre, args.edad ?? 0)
      return res
    },

    deletePersona: async (parent: any, args: { id: number }) => {
      const obj = await getPersonaById(args.id)
      if (!obj) throw new AppGraphQLError('Persona no encontrada', ErrorType.VALIDATION_ERROR)

      const res = await deletePersona(args.id)
      return res
    },
  },
};

export const personResolver =  resolvers;
