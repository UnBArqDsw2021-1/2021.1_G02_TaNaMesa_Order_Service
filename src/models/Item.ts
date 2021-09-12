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
export class Item extends Model<ItemModel, ItemAttributes> { }

export type ItemStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): ItemModel;
};

export function ItemFactory(sequelize: Sequelize): ItemStatic {
  return <ItemStatic>sequelize.define(
    "items",
    {
      idItem: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(50),
      price: INTEGER,
      discount: INTEGER,
      description: STRING(50),
      note: STRING(50),
      category: {
        type: ENUM("hamburgueres", "petiscos", "molhos adicionais", "saladas", "bebidas", "sobremesas"),
        allowNull: false
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    }
  );
}
