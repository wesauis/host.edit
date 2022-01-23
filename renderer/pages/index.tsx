import { useEffect } from "react";
import Await from "../components/Await";
import Layout from "../components/Layout";
import * as ipc from "../utils/ipc";

const Home = () => {
  useEffect(() => {
    return ipc.on("message", (_event, args) => {
      alert(args);
    });
  }, []);

  const onSayHiClick = () => {
    ipc.emit("message", "hi from next");
  };

  const promisse = new Promise((r) => setTimeout(r, 2000))
    .then(() => fetch("https://api.github.com/users/wesauis"))
    .then((res) => res.json());

  return (
    <Layout>
      <h1>Hello Next.js + Electron with unregister!! 👋</h1>
      <button onClick={onSayHiClick}>Say hi to electron</button>

      <Await
        promise={promisse}
        pending={<>loading...</>}
        error={(error) => <>error: {error?.message}</>}
        success={(data) => (
          <>
            <img src={data?.avatar_url} />
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </>
        )}
      />
    </Layout>
  );
};

export default Home;
