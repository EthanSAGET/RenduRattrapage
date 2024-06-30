import express from "express";

import { register, login } from "../controllers/AuthController.js";


const router = express.Router(); //Crée un router

router.post("/register", register); //Définit la route pour l'inscription
router.post("/login", login); //Définit la route pour la connexion

export default router;