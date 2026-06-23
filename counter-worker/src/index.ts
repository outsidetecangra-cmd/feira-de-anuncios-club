export interface Env {
  VISITS_DB: D1Database;
}

const COUNTER_ID = "site_visits";
const COUNTERS_TABLE = "CREATE TABLE IF NOT EXISTS counters (id TEXT PRIMARY KEY, value INTEGER NOT NULL)";

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
    },
  });
}

async function ensureSchema(db: D1Database) {
  await db.prepare(COUNTERS_TABLE).run();
}

async function readCount(db: D1Database) {
  const row = await db
    .prepare("SELECT value FROM counters WHERE id = ?")
    .bind(COUNTER_ID)
    .first<{ value: number }>();

  return row?.value ?? 0;
}

async function incrementCount(db: D1Database) {
  await db
    .prepare(
      "INSERT INTO counters (id, value) VALUES (?, 1) ON CONFLICT(id) DO UPDATE SET value = value + 1"
    )
    .bind(COUNTER_ID)
    .run();

  return readCount(db);
}

export default {
  async fetch(request: Request, env: Env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Cache-Control": "no-store",
        },
      });
    }

    const url = new URL(request.url);

    if (url.pathname !== "/api/visits") {
      return json({ error: "Not found" }, 404);
    }

    await ensureSchema(env.VISITS_DB);

    if (request.method === "GET") {
      return json({ visits: await readCount(env.VISITS_DB) });
    }

    if (request.method === "POST") {
      return json({ visits: await incrementCount(env.VISITS_DB) });
    }

    return json({ error: "Method not allowed" }, 405);
  },
};
