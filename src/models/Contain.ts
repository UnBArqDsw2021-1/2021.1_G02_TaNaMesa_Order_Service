/* eslint-disable @typescript-eslint/ban-types */
import {
  BuildOptions,
  Model,
  Sequelize,
  DATE,
  INTEGER,
  STRING,
} from "sequelize";

interface ContainAttributes {
  idOrder: number;
  idItem: number;
  quantity: string;
  observation: string;
}
export interface ContainModel
  extends Model<ContainAttributes>,
    ContainAttributes {}
export class Contain extends Model<ContainModel, ContainAttributes> {}

export type ContainStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContainModel;
};

export function ContainFactory(sequelize: Sequelize): ContainStatic {
  return <ContainStatic>sequelize.define(
    "contains",
    {
      idOrder: {
        type: INTEGER,
        references: { model: "orders", key: "id_order" },
      },
      idItem: {
        type: INTEGER,
        references: { model: "items", key: "id_item" },
      },
      quantity: INTEGER,
      observation: {
          type: STRING,
          allowNull: true,
      },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
}
