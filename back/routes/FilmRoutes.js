import express from "express";

import { likeFilm } from "../controllers/FilmController.js";


const router = express.Router();



router.post("/like/:id", likeFilm); //Définit la route pour liker un film


export default router;