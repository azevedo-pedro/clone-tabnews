import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);
      const reeponseBody = await response.json();
      expect(reeponseBody).toEqual({
        message: "Metodo não permitido para este endpoint",
        name: "MethodNotAllowedError",
        action:
          "Verifique se o método HTTP utilizado é suportado por este endpoint",
        status_code: 405,
      });
    });
  });
});
