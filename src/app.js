import express from "express";
import cors from "cors";

import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/schools", schoolRoutes);

export { app };