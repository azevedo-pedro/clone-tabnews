import database from "infra/database.js";

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const updateAt = new Date().toISOString();
  const databaseVersionValue = await database.query("SHOW server_version;");
  const databaseMaxConnectionCountValue = await database.query(
    "SHOW max_connections;",
  );
  const databaseActivityCountValue = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue.rows[0].server_version,
        max_connections: parseInt(
          databaseMaxConnectionCountValue.rows[0].max_connections,
        ),
        opened_connections: databaseActivityCountValue.rows[0].count,
      },
    },
  });
}

export default status;
