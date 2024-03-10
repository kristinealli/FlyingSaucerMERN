import express from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Tea } from "./models/teaModel.js";;
import teasRoute from "./routes/teasRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

//Middleware for handling CORS policy
app.use(cors());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.get('/', (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to the backend!");
});

app.use("/teas", teasRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });