import { ID } from "types/common"
import { Role } from "types/models/session"

export type UserDataType = {
    id: ID,
    role: Role,
    name: string,
    email: string,
    createDate: string,
    updateDate: string
}
