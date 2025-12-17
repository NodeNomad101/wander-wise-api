import Itenierary from "../models/itenerary.js";
import NotFoundError from "../errors/not-found-error.js";
import { getTripById, } from "./trip.js";
import ValidationError from "../errors/validation-error.js";

export const createItenerary = async (iteneraryData) => {
    const trip = await getTripById(iteneraryData.trip, iteneraryData.user);

    if (
        new Date(iteneraryData.date) < new Date(trip.startDate) ||
        new Date(itineraryDatea.date) > new Date(trip.endDate)
    ) {
        throw new ValidationError("Itenerary date must be within trip dates");
    }

    const itenerary = await Itenerary.create(iteneraryData);
    return itenerary;
}
export const getItenerariesByTrip = async (tripId, userId) => {
    await getTripById(tripId, userId);
    const iteneraries = await Itenierary.find({ trip: tripId, user: userId });
    return iteneraries;
};
export const getIteneraryById = async (id, userId, tripId) => {
    await getTripById(tripId, userId);
    const itenerary = await Itenierary.findOne({ _id: id, user: userId, trip: tripId });
    if (!itenerary) {
        throw new NotFoundError("Itenerary not found");
    }
    return itenerary;
};
export const updateIteneraryById = async (id, itineraryData, userId, tripId) => {
    await getTripById(tripId, userId);
    if (
        new Date(itineraryData.date) < new Date(trip.startDate) ||
        new Date(itineraryData.date) > new Date(trip.endDate)
    ) {
        throw new ValidationError("Itenerary date must be within trip dates");
    }
    const updated = await Itenierary.findOneAndUpdate(
        { _id: id, user: userId, trip: tripId },
        itineraryData,
        { new: true }
    );
    if (!updated) {
        throw new NotFoundError("Itenerary not found");
    }
    return updated;
};
export const deleteIteneraryById = async (id, userId, tripId) => {
    await getTripById(tripId, userId);
    const deleted = await Itenierary.findOneAndDelete({ _id: id, trip: tripId });
    if (!deleted) {
        throw new NotFoundError("Itenerary not found");
    }
    return deleted;
};
