const { exec } = require("node:child_process");
function checkPostgres(params) {
  exec("docker exec postgres-dev pg_isready --host localhost", hadleReturn);
  function hadleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\n\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
