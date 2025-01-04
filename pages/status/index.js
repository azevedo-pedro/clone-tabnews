import useSWR from "swr";
async function get(key) {
  const response = await fetch(key);
  const data = await response.json();
  return data;
}

export default function StatusPage() {
  const { data, isLoading } = useSWR("/api/v1/status", get, {
    refreshInterval: 2000,
  });
  const formattedDate = new Date(data.update_at).toLocaleString();

  return (
    <div>
      <h1>Status</h1>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <p>Última atualização: {formattedDate}</p>
          <p>Versão: {data.dependencies.database.version}</p>
          <p>
            Número máximo de conexões:
            {data.dependencies.database.max_connections}
          </p>
          <p>
            Número de conexões abertas:
            {data.dependencies.database.opened_connections}
          </p>
        </>
      )}
    </div>
  );
}
