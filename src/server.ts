import app from "./app";
import Database from "./db";
import runSeeds from "./seeds";

const port = process.env.PORT || 3333;

(async () => {
  try {
    await Database.connection.sync();

    app.listen(port, () => {
      console.log("\n😝 Bem-vindo!");
      console.log(`🚀 Order service started on port ${port}\n\n`);
    });

    await runSeeds();
  } catch (error) {
    console.log(error);
  }
})();
