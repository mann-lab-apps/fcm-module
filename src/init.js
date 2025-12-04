import { app } from "./server";

const onRunning = () => {
  console.log("onRunning");
};

app.listen(8000, onRunning);
