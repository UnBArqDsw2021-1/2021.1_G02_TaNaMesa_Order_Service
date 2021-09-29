import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import { OrderFactory, OrderStatic } from "../models/Order";
import { ItemFactory, ItemStatic } from "../models/Item";
import { ClientFactory, ClientStatic } from "../models/Client";
import { EmployeeFactory, EmployeeStatic } from "../models/Employee";
import { TableFactory, TableStatic } from "../models/Table";
import { ContainFactory, ContainStatic } from "../models/Contain";

console.log(`\n****** ${process.env.NODE_ENV.toUpperCase()} ******`);
console.log(databaseConfig[process.env.NODE_ENV]);

class Database {
  public connection: Sequelize;

  public order: OrderStatic;

  public item: ItemStatic;

  public client: ClientStatic;

  public employee: EmployeeStatic;

  public table: TableStatic;

  public contain: ContainStatic;

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
      .then(async () => {
        console.log("\n\n🗃️ Banco de Dados conectado!\n");

        this.item = ItemFactory(this.connection);
        await this.item.sync();

        this.client = ClientFactory(this.connection);
        await this.client.sync();

        this.employee = EmployeeFactory(this.connection);
        await this.employee.sync();

        this.table = TableFactory(this.connection);
        await this.table.sync();

        this.order = OrderFactory(this.connection);
        await this.order.sync();

        this.contain = ContainFactory(this.connection);
        await this.contain.sync();
      })
      .catch(() => {
        console.log(
          "\n\n😵‍💫❌ Erro ao conectar no Banco e rodar as migrations\n"
        );
      });
  }
}

const database: Database = new Database(false);

export default database;
