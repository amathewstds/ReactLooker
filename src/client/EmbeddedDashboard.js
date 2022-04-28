import React, { useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const BasicDashboard = () => {
  const [dashboard, setDashboard] = React.useState();

  const setupDashboard = (dashboard) => {
    setDashboard(dashboard);
  };

  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com"; //process.env.LOOKER_EMBED_HOST;
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      LookerEmbedSDK.createDashboardWithId(1)
        .withNext()
        .appendTo(el)
        .build()
        .connect()
        .then(setupDashboard)
        .catch((error) => {
          console.error("Connection error", error);
        });
    }
  }, []);

  return (
    <>
      <EmbedContainer ref={embedCtrRef} />
    </>
  );
};

export default BasicDashboard;
