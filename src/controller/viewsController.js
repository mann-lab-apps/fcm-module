import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDashboardPage = (request, response) => {
  return response.sendFile(
    path.join(__dirname, "../views/dashboard/index.html")
  );
};
