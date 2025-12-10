import Trip from "../models/Trip.js";

export const createTrip = async (tripData) => {
  const trip = await  Trip.create(tripData); // Create a new trip document
  return trip;
};