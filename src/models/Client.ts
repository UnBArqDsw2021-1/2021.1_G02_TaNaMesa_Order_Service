/* eslint-disable @typescript-eslint/ban-types */
import {
  BuildOptions,
  Model,
  Sequelize,
  DATE,
  INTEGER,
  ENUM,
  STRING,
} from "sequelize";

interface ClientAttributes {
  idClient: number;
  nome: string;
}
export interface ClientModel extends Model<ClientAttributes>, ClientAttributes { }
export class Client extends Model<ClientModel, ClientAttributes> { }

export type ClientStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): ClientModel;
};

export function ClientFactory(sequelize: Sequelize): ClientStatic {
  return <ClientStatic>sequelize.define(
    "clients",
    {
      idClient: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: STRING(50)
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    }
  );
}
