import Email from "./EMAIL";
import SMS from "./SMS";
import URL from "./URL";

const QrCodes = () => {
  const qrType = window.location.pathname.split("/")[2];
  return (
    <div>
      {qrType === "url" ? <URL /> : qrType === "sms" ? <SMS /> : <Email />}
    </div>
  );
};

export default QrCodes;
