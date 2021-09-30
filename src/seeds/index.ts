import runEmployeesSeeds from "./employee";

const runSeeds = async (): Promise<void> => {
  await runEmployeesSeeds();
};

export default runSeeds;
