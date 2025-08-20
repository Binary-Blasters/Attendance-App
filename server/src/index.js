import dotenv from "dotenv"
dotenv.config()

import {app} from './app.js'
import connectDB from "./db/index.js"

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`⚙️ Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
});