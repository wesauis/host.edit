import { useEffect } from "react";
import Layout from "../components/Layout";
import * as ipc from "../utils/ipc";

const Home = () => {
  useEffect(() => {
    return ipc.on("pong", (_event, message) => {
      console.log(_event, message);
    });
  }, []);

  const onSayHiClick = () => {
    ipc.emit("ping", "hi from next through ipc");
  };
  useEffect(onSayHiClick, []);

  return <Layout> </Layout>;
};

export default Home;
