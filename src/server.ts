import app from "./app";
import Database from "./db";

const port = process.env.PORT || 3333;

(async () => {
  try {
    await Database.connection.sync();

    app.listen(port, () => {
      console.log("\nš Bem-vindo!");
      console.log(`š Order service started on port ${port}\n\n`);
    });

  } catch (error) {
    console.log(error);
  }
})();
