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
      idOrder: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: ENUM(
          "na fila",
          "na cozinha",
          "preparando",
          "na mesa",
          "solicitacao pagamento",
          "pagamento realizado"
        ),
        allowNull: false,
        defaultValue: "na fila",
      },
      idTable: {
        type: INTEGER,
        references: { model: "tables", key: "id_table" },
      },
      idClient: {
        type: INTEGER,
        references: { model: "clients", key: "id_client" },
      },
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
