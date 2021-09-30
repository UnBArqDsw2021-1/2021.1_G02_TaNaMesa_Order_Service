import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";
import database from "../../db";

const employeesSeeds = [
  {
    cpf: 71249153174,
    name: "Igor Gomes",
    occupation: "garcom",
    password: "123456",
  },
  {
    cpf: 69772921138,
    name: "Carol Marques",
    occupation: "garcom",
    password: "123456",
  },
  {
    cpf: 22686007184,
    name: "Natália Schulz",
    occupation: "garcom",
    password: "123456",
  },
  {
    cpf: 7768835182,
    name: "Alexandre Moura",
    occupation: "cozinha",
    password: "123456",
  },
  {
    cpf: 46092740192,
    name: "Anny Campelo",
    occupation: "cozinha",
    password: "123456",
  },
  {
    cpf: 87065311139,
    name: "Bernardo Mota",
    occupation: "cozinha",
    password: "123456",
  },
  {
    cpf: 55834702163,
    name: "Lloyd David Sanders",
    occupation: "gerente",
    password: "250300",
  },
  // fields: ["cpf", "name", "occupation", "password", "created_at", "updated_at"],
];

const runEmployeesSeeds = async (): Promise<void> => {
  await database.connection.query("DELETE * FROM employees", {
    type: QueryTypes.DELETE,
  });

  employeesSeeds.forEach(async (employee) => {
    const password = await bcrypt.hash(employee.password, 10);

    await database.employee.create({ ...employee, password });
  });
};

export default runEmployeesSeeds;
