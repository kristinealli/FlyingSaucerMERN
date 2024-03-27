import express from "express";
import { Tea } from "../models/teaModel.js";

const router = express.Router();

// Add a new tea to the database
router.post("/", async (request, response) => {
	try {
		if (
			!request.body.teaName ||
			!request.body.sourceName ||
			!request.body.typeOfTea ||
			!request.body.inCollection
		) {
			return response.status(400).send({
				message:
					"Send all required fields: teaName, sourceName, typeOfTea, and inCollection",
			});
		}
		const newTea = {
			teaName: request.body.teaName,
			sourceName: request.body.sourceName,
			typeOfTea: request.body.typeOfTea,
			inCollection: request.body.inCollection
		};

		const tea = await Tea.create(newTea);

		return response.status(201).send(tea);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: "Error in adding tea" });
	}
});

// Get all teas from Database
router.get("/", async (request, response) => {
	try {
		const teas = await Tea.find({});
		return response.status(200).json({
			count: teas.length,
			data: teas,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Get a specific tea from Database
router.get("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const tea = await Tea.findById(id);

		return response.status(200).json(tea);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

// Update a tea's favorite status
router.put("/:id/favorite", async (request, response) => {
    try {
        const { id } = request.params;
        const { favorite } = request.body; // Expecting favorite to be a boolean

        if (typeof favorite === "undefined") {
            return response.status(400).send({
                message: "Please provide favorite status.",
            });
        }

        const result = await Tea.findByIdAndUpdate(id, { favorite: favorite }, { new: true });

        if (!result) {
            return response.status(404).json({ message: "Tea not found" });
        }

        return response.status(200).send({ message: "Favorite status updated successfully", tea: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a Tea
router.put("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		
		if (Object.keys(request.body).length === 0) {
			return response.status(400).send({
				message: "Please provide at least one field to update. Example: teaName, sourceName, typeOfTea, inCollection, sourceLink, brewingInfo, etc.",
			});
		}

		const result = await Tea.findByIdAndUpdate(id, request.body, { new: true });

		if (!result) {
			return response.status(404).json({ message: "Tea not found" });
		}

		return response
			.status(200)
			.send({ message: "Tea updated successfully", tea: result });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});
	
// Delete a Tea
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Tea.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Tea not found" });
        }

        return response
            .status(200)
            .send({ message: "Tea deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;