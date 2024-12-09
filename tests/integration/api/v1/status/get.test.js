test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const data = await response.json();
  const parsedData = new Date(data.update_at).toISOString()
  expect(data.update_at).toBeDefined();
  expect(data.update_at).toEqual(parsedData)

  // expect(data.current_connections).toBeDefined()
  // expect(parseInt(data.current_connections)).toEqual(9)

  expect(data.dependenciees.database.max_connections).toBeDefined()

  expect(data.dependenciees.database.version).toBeDefined()
  expect(data.dependenciees.database.version).toEqual('16.0')
  expect(data.dependenciees.database.max_connections).toEqual(100)
  expect(data.dependenciees.database.opened_connections).toEqual(1)

});
