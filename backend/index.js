import express from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();

//app.use(express.json());

app.get('/', (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to the backend!");
});

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