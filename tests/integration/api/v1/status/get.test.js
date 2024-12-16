import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(`${process.env.DEVELOPMENT_URL}/api/v1/status`);
  expect(response.status).toBe(200);

  const data = await response.json();
  const parsedData = new Date(data.update_at).toISOString();
  expect(data.update_at).toBeDefined();
  expect(data.update_at).toEqual(parsedData);

  expect(data.dependenciees.database.max_connections).toBeDefined();

  expect(data.dependenciees.database.version).toBeDefined();
  expect(data.dependenciees.database.version).toEqual("16.0");
  expect(data.dependenciees.database.max_connections).toEqual(100);
  expect(data.dependenciees.database.opened_connections).toEqual(1);
});
