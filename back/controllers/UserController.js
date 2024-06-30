import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (req, res) => { //Définit la fonction pour récupérer les informations de l'utilisateur

    const token = req.headers['x-access-token']; //Récupère le token

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }


    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { //Vérifie le token  
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        const user = await prisma.user.findUnique({ //Récupère l'utilisateur
            where: {
                id: decoded.id,
            },
            select: {
                email: true,
                name: true,
            },
        });

        return res.status(200).json(user);
    });

}
