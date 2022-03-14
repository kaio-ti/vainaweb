import app from "./app";
import { connectDatabase } from "./database";

connectDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
