import jwt from 'jsonwebtoken';

export const findPayload = (token: string) => {
        const payload = jwt.decode(token);
        return payload ? payload : null;
}