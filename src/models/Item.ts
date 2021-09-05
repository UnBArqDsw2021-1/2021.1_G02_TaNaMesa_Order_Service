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

interface ItemAttributes {
  idItem: number;
  nome: string;
  preco: number;
  desconto: number;
  descricao: string;
  observacao: string;
  categoria: string;
}
export interface ItemModel extends Model<ItemAttributes>, ItemAttributes { }
export class Order extends Model<ItemModel, ItemAttributes> { }

export type ItemStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): ItemModel;
};

export function OrderFactory(sequelize: Sequelize): ItemStatic {
  return <ItemStatic>sequelize.define(
    "orders",
    {
      idItem: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: STRING(50),
      preco: INTEGER,
      desconto: INTEGER,
      descricao: STRING(50),
      observacao: STRING(50),
      categoria: {
        type: ENUM("hamburgueres", "petiscos", "molhos adicionais", "saladas", "bebidas", "sobremesas"),
        allowNull: false
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
}
