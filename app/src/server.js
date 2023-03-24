const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
const db = require("./models/index");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
