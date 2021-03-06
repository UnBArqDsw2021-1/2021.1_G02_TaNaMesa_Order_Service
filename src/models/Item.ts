/* eslint-disable @typescript-eslint/ban-types */
import {
  BuildOptions,
  Model,
  Sequelize,
  INTEGER,
  ENUM,
  STRING,
} from "sequelize";

interface ItemAttributes {
  idItem: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  description: string;
  notes: string;
  category: string;
}
export interface ItemModel extends Model<ItemAttributes>, ItemAttributes {}
export class Item extends Model<ItemModel, ItemAttributes> {}

export type ItemStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ItemModel;
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
      image: STRING(300),
      price: INTEGER,
      discount: INTEGER,
      description: STRING(50),
      notes: STRING(50),
      category: {
        type: ENUM(
          "hamburgueres",
          "petiscos",
          "molhos adicionais",
          "saladas",
          "bebidas",
          "sobremesas"
        ),
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
