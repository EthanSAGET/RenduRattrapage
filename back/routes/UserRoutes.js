import express from "express";

import { getUser } from "../controllers/UserController.js";


const router = express.Router();

router.get("/getuser", getUser); //Définit la route pour récupérer les informations de l'utilisateur


export default router;