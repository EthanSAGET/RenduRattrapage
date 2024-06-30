import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => { //Définit la fonction pour l'inscription

    try {
        const { email, password, name } = req.body; //Récupère les données de la requête

        const checkUser = await prisma.user.findFirst({ //Vérifie si l'utilisateur existe déjà
            where: {
                email, 
            }

        });

        if (checkUser) {
            return res.status(400).json({ message:`L'adresse mail existe déjà` });
        }

        const cryp_password = await bcrypt.hash(password, 10); //Crypte le mot de passe

        const user = await prisma.user.create({ //Crée l'utilisateur
            data: {
                email : email,
                password : cryp_password,
                name : name,
            },
        });

        return res.status(201).json('Utilisateur créé');

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const login = async (req, res) => { //Définit la fonction pour la connexion

    try {
        const {email, password} = req.body; //Récupère les données de la requête

        const checkUser = await prisma.user.findFirst({ //Vérifie si l'utilisateur existe
            where: {
                email,
            },
        });

        if (!checkUser) {
            return res.status(400).json({ message: `L'utilisateur n'existe pas` });
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password); //Vérifie le mot de passe

        if (!checkPassword) {
            return res.status(400).json({ message: `Mot de passe incorrect` });
        }

        const token = jwt.sign({ id : checkUser.id, email : checkUser.email
         }, process.env.JWT_SECRET, { expiresIn: '1h' }); //Crée un token

        return res.status(200).json({ token });


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}
