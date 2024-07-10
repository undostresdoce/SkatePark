import "dotenv/config";
import express from "express";
import fileUploadConfig from "./utils/fileUploadConfig.js";

import skaterRouter from "./routes/skater.route.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(fileUploadConfig);

app.use("/api/v1/skaters", skaterRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Srv_Conectado exitosamente al puerto ${PORT}`);
});
