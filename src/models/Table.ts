/* eslint-disable @typescript-eslint/ban-types */
import {
  BuildOptions,
  Model,
  Sequelize,
  INTEGER,
  STRING,
  BOOLEAN,
} from "sequelize";

interface TableAttributes {
  idTable: number;
  cpfWaiter: string;
  needHelp: boolean;
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
      needHelp: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    }
  );
}
