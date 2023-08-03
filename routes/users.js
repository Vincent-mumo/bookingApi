import express from "express";
const router = express.Router();

import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import {updateUser,deleteUser, getUser, getUsers, } from "../controlers/user.js";

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;