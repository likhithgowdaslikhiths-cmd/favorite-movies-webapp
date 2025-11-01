"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSchema = void 0;
const zod_1 = require("zod");
exports.movieSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    type: zod_1.z.enum(["Movie", "TV Show"]),
    director: zod_1.z.string().min(1, "Director is required"),
    budget: zod_1.z.string().min(1, "Budget is required"),
    location: zod_1.z.string().min(1, "Location is required"),
    duration: zod_1.z.string().min(1, "Duration is required"),
    yearTime: zod_1.z.string().min(1, "Year/Time is required"),
});
