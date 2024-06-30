import express from "express";
import Auth from "./routes/AuthRoutes.js"
import User from "./routes/UserRoutes.js"
import Film from "./routes/FilmRoutes.js"

const router = express.Router();

router.use("/auth", Auth); //Définit les routes pour l'authentification
router.use ('/user', User) //Définit les routes pour les utilisateurs
router.use('/films', Film) //Définit les routes pour les films

export default router;