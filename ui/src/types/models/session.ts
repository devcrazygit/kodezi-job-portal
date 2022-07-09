import { ID } from '../common';

export enum Role {
    ADMIN = 1,
    USER = 2,
}

export type SessionData = {
    id: ID;
    name: string;
    email: string;
    role: Role;
};
