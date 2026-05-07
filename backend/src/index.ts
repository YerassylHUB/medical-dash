import "dotenv/config";
import express from "express";
import cors from "cors";
import { leadershipSummary } from "./data/summary.js";
import { registerUploadRoutes } from "./routes/upload.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin: [CORS_ORIGIN, "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],
    credentials: true,
  })
);

app.get("/v1/health", (_req, res) => {
  res.json({ ok: true, service: "dash-medical-api", time: new Date().toISOString() });
});

app.get("/v1/leadership/summary", (_req, res) => {
  res.json(leadershipSummary);
});

registerUploadRoutes(app);

app.use((_req, res) => {
  res.status(404).json({ error: "not_found" });
});

app.listen(PORT, () => {
  console.log(`API http://127.0.0.1:${PORT}  (CORS: ${CORS_ORIGIN})`);
});
