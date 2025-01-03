import useSWR from "swr";
async function get(key) {
  const response = await fetch(key);
  const data = await response.json();
  return data;
}

export default function StatusPage() {
  const { data, error } = useSWR("/api/v1/status", get, {
    refreshInterval: 2000,
  });
  return (
    <div>
      <h1>Status</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
