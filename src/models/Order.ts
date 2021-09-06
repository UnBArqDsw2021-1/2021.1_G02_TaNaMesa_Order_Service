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

interface OrderAttributes {
  idOrder: number;
  status: string;
  idTable: number;
  idClient: number;
  nameClient: string;
  date: Date;
}
export interface OrderModel extends Model<OrderAttributes>, OrderAttributes {}
export class Order extends Model<OrderModel, OrderAttributes> {}

export type OrderStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): OrderModel;
};

export function OrderFactory(sequelize: Sequelize): OrderStatic {
  return <OrderStatic>sequelize.define(
    "order",
    {
      idOrder: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: ENUM("na fila", "na cozinha", "preparado", "na mesa"),
        allowNull: false,
        defaultValue: "na fila",
      },
      idTable: INTEGER,
      idClient: INTEGER,
      nameClient: STRING(50),
      date: {
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
