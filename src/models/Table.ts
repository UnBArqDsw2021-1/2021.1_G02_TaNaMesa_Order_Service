/* eslint-disable @typescript-eslint/ban-types */
import { BuildOptions, Model, Sequelize, INTEGER, STRING } from "sequelize";

interface TableAttributes {
  idMesa: number;
  cpfWaiter: string;
}
export interface TableModel extends Model<TableAttributes>, TableAttributes {}
export class Table extends Model<TableModel, TableAttributes> {}

export type TableStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TableModel;
};

export function TableFactory(sequelize: Sequelize): TableStatic {
  return <TableStatic>sequelize.define(
    "tables",
    {
      idTable: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cpfWaiter: {
        type: STRING(11),
        references: { model: "employees", key: "cpf" },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    }
  );
}
