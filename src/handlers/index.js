import { Router } from "express";
import USER_ROUTER from "./users.js";
import BAGGAGE_ROUTER from "./baggage.js";
import AUTH_ROUTER from "./auth.js";


const HANDLERS = Router();

HANDLERS.use("/users",USER_ROUTER);
HANDLERS.use("/baggage", BAGGAGE_ROUTER);
HANDLERS.use("/auth", AUTH_ROUTER);



export default HANDLERS;

