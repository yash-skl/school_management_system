import { ApiError } from "../utils/ApiError.js";

function validateSchool(data) {

    const { name, address, latitude, longitude } = data;

    if (!name || !address) {
        throw new ApiError(
            400,
            "Name and address are required"
        );
    }

    if (
        latitude === undefined ||
        longitude === undefined
    ) {
        throw new ApiError(
            400,
            "Latitude and longitude are required"
        );
    }

    if (
        isNaN(latitude) ||
        isNaN(longitude)
    ) {
        throw new ApiError(
            400,
            "Latitude and longitude must be valid numbers"
        );
    }
}

export default validateSchool;