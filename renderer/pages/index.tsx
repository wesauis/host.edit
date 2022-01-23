import { useState } from "react";
import Await from "../components/Await";
import Layout from "../components/Layout";
import * as ipc from "../utils/ipc";

const Home = () => {
  const [hostsPromise, setHostsPromise] = useState(null);

  async function loadHostsFile() {
    setHostsPromise(ipc.exchange("hosts-load"));
  }

  return (
    <Layout>
      <button onClick={loadHostsFile}>Load</button>
      {hostsPromise && (
        <Await
          promise={hostsPromise}
          pending={
            <div>
              <h2>Loading Hosts File...</h2>
            </div>
          }
          error={(err) => (
            <div>
              <h2 color="red">
                Unable to load file:
                {err?.message}
              </h2>
            </div>
          )}
          success={([_event, data]) => (
            <pre>
              <code>{data}</code>
            </pre>
          )}
        />
      )}
    </Layout>
  );
};

export default Home;
