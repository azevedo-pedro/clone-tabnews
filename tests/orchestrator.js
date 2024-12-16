import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
    });

    async function fetchStatusPage() {
      const response = await fetch(
        `${process.env.DEVELOPMENT_URL}/api/v1/status`,
      );
      const responseBodey = await response.json();
    }
  }
}

export default {
  waitForAllServices,
};
