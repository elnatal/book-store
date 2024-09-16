import { PORT } from "./secrets";
import createServer from "./server";

const app = createServer();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});