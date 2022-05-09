import { RoleEnum } from "../../enums/user";
export namespace UserModel {
  export type T = {
    id: number;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    role: RoleEnum;
    nationalId: string;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}
