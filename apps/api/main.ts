import { Application, Router } from "oak";
import { oakCors } from "cors";

import { DeviceRepository } from "./deviceRepositorry.ts";
import { Device } from "shared/event.ts";

const dataPath = "../../data.json";
const deviceRepository = await DeviceRepository.Build(dataPath);

const PORT = Number(Deno.env.get("PORT")) || 8000;

const router = new Router();
router
  .get("/api/health", (ctx) => {
    ctx.response.type = "json";
    ctx.response.body = { ok: true, time: new Date().toISOString() };
  })
  .get("/api/hello", (ctx) => {
    ctx.response.type = "json";
    ctx.response.body = { message: "Hallo von Deno + Oak" };
  });

const app = new Application();
app.use(oakCors({ origin: /^http:\/\/localhost:5173$/ }));
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🟢 API listening on http://localhost:${PORT}`);
await app.listen({ port: PORT });
