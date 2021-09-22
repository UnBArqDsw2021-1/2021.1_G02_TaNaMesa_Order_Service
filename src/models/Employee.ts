/* eslint-disable @typescript-eslint/ban-types */
import { BuildOptions, Model, Sequelize, ENUM, STRING } from "sequelize";

interface EmployeeAttributes {
  cpf: number;
  name: string;
  occupation: string;
  password: string;
}
export interface EmployeeModel
  extends Model<EmployeeAttributes>,
    EmployeeAttributes {}
export class Employee extends Model<EmployeeModel, EmployeeAttributes> {}

export type EmployeeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EmployeeModel;
};

export function EmployeeFactory(sequelize: Sequelize): EmployeeStatic {
  return <EmployeeStatic>sequelize.define(
    "employees",
    {
      cpf: {
        type: STRING(11),
        primaryKey: true,
      },
      name: STRING(50),
      occupation: {
        type: ENUM("gerente", "cozinha", "garcom"),
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    }
  );
}
