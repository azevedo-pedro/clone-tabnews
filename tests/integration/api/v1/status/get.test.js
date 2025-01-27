import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});
describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "GET",
      });
      expect(response.status).toBe(200);

      const data = await response.json();
      const parsedData = new Date(data.update_at).toISOString();
      expect(data.update_at).toBeDefined();
      expect(data.update_at).toEqual(parsedData);

      expect(data.dependencies.database.max_connections).toBeDefined();

      expect(data.dependencies.database.version).toBeDefined();
      expect(data.dependencies.database.version).toEqual("16.0");
      expect(data.dependencies.database.max_connections).toEqual(100);
      expect(data.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
