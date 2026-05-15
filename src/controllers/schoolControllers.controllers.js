import db from "../db/index.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import validateSchool from "../validations/schoolValidation.js";
import calculateDistance from "../utils/distanceCalculator.js";
import { v4 as uuidv4 } from "uuid";



const addSchool = asyncHandler(async (req, res) => {
    const error = validateSchool(req.body);

    if (error) {
        throw new ApiError(400, error);
    }

    const { name, address, latitude, longitude } = req.body;

    const schoolId = uuidv4();

    const query = `
        INSERT INTO schools
        (id, name, address, latitude, longitude)
        VALUES (?, ?, ?, ?, ?)
    `;

     await db.execute(query, [
        schoolId,
        name,
        address,
        latitude,
        longitude,
    ]);

    return res.status(201).json(
        new ApiResponse(
            201,
            "School added successfully"
        )
    );
});

const listSchools = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        throw new ApiError(
            400,
            "Latitude and longitude are required"
        );
    }

    const [schools] = await db.execute(
        "SELECT * FROM schools"
    );

    const sortedSchools = schools
        .map((school) => ({
            ...school,
            distance: calculateDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                school.latitude,
                school.longitude
            ),
        }))
        .sort((a, b) => a.distance - b.distance);

    return res.status(200).json(
        new ApiResponse(
            200,
            sortedSchools,
            "Schools fetched successfully"
        )
    );
});

export {
    addSchool,
    listSchools,
};