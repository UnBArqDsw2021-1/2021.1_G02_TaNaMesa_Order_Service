import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import { OrderFactory, OrderStatic } from "../models/Order";
import { ItemFactory, ItemStatic } from "../models/Item";
import { ClientFactory, ClientStatic } from "../models/Client";

console.log(databaseConfig[process.env.NODE_ENV]);

class Database {
  public connection: Sequelize;

  public order: OrderStatic;
  public item: ItemStatic;
  public client: ClientStatic;

  constructor(test: boolean) {
    this.init(test);
  }

  init(test: boolean): void {
    try {
      this.connection = new Sequelize(
        databaseConfig[test ? "test" : process.env.NODE_ENV]
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      this.testConnection();
    }
  }

  testConnection(): void {
    this.connection
      .authenticate()
      .then(() => {
        console.log("🗃️ Banco de Dados conectado!\n");

        this.order = OrderFactory(this.connection);
        this.order.sync();

        this.item = ItemFactory(this.connection);
        this.item.sync();

        this.client = ClientFactory(this.connection);
        this.client.sync();
      })
      .catch(() => {
        console.log("😵‍💫❌ Erro ao conectar no Banco\n");
      });
  }
}

const database: Database = new Database(false);

export default database;
