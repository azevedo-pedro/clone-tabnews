import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await database.query("drop schema public cascade; create schema public;");
  await orchestrator.waitForAllServices();
});

test("POST to /api/v1/migrations should return 200", async () => {
  const responseOne = await fetch(
    `http://localhost:3000/api/v1/migrations`,
    {
      method: "POST",
    },
  );
  expect(responseOne.status).toBe(201);
  const responseOneBody = await responseOne.json();
  expect(Array.isArray(responseOneBody)).toBe(true);
  expect(responseOneBody.length).toBeGreaterThan(0);

  const responseTwo = await fetch(
    `http://localhost:3000/api/v1/migrations`,
    {
      method: "POST",
    },
  );
  expect(responseTwo.status).toBe(200);
  const responseTwoBody = await responseTwo.json();
  expect(Array.isArray(responseTwoBody)).toBe(true);
  expect(responseTwoBody.length).toBe(0);
});
