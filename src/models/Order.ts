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
  idComanda: number;
  status: string;
  idMesa: number;
  idCliente: number;
  nomeCliente: string;
  data: Date;
}
export interface OrderModel extends Model<OrderAttributes>, OrderAttributes {}
export class Order extends Model<OrderModel, OrderAttributes> {}

export type OrderStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): OrderModel;
};

export function OrderFactory(sequelize: Sequelize): OrderStatic {
  return <OrderStatic>sequelize.define(
    "orders",
    {
      idComanda: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: ENUM("na fila", "na cozinha", "preparando", "na mesa"),
        allowNull: false,
        defaultValue: "na fila",
      },
      idMesa: INTEGER,
      idCliente: INTEGER,
      nomeCliente: STRING(50),
      data: {
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
