import migrationRunner from "node-pg-migrate";
import database from "infra/database";
import { join } from "node:path";
export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient,
    dryRun: false,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner(defaultMigrationsOptions);
    await dbClient.end();
    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }
  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: true,
    });
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  return response.status(405).end();
}
