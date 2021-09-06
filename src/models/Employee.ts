/* eslint-disable @typescript-eslint/ban-types */
import {
  BuildOptions,
  Model,
  Sequelize,
  DATE,
  INTEGER,
  BIGINT,
  ENUM,
  STRING,
} from "sequelize";

interface EmployeeAttributes {
  idEmployee: number;
  nome: string;
}
export interface EmployeeModel extends Model<EmployeeAttributes>, EmployeeAttributes { }
export class Employee extends Model<EmployeeModel, EmployeeAttributes> { }

export type EmployeeStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): EmployeeModel;
};

export function EmployeeFactory(sequelize: Sequelize): EmployeeStatic {
  return <EmployeeStatic>sequelize.define(
    "employees",
    {
      cpf: {
        type: BIGINT(11),
        primaryKey: true,
      },
      nome: STRING(50),
      ocupacao: {
        type: ENUM("gerente", "cozinha", "garcom"),
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    }
  );
}
