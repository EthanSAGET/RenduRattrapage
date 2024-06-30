import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();



export const likeFilm = async (req, res) => { //Définit la fonction pour liker un film

    const token = req.headers['x-access-token']; //Récupère le token

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    const { id } = req.params; //Récupère l'id du film

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { //Vérifie le token
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        const user = await prisma.user.findUnique({ //Récupère l'utilisateur
            where: {
                id: decoded.id,
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const checkLikeUser = await prisma.likeUser.findFirst({ //Vérifie si l'utilisateur a déjà liké le film
            where: {
                userId: user.id,
                likedUserId: Number(id),
            },
        });

        let film;
        let likeStatus;

        if (checkLikeUser) { //Met à jour le like
            film = await prisma.likeUser.update({
                where: {
                    id: checkLikeUser.id,
                },
                data: {
                    likeStatus: !checkLikeUser.likeStatus,
                    updatedAt: new Date(),
                },
            });

            likeStatus = film.likeStatus;
        } else { //Crée le like
            film = await prisma.likeUser.create({
                data: {
                    likeStatus: true,
                    userId: user.id,
                    likedUserId: Number(id),
                },
            });

            likeStatus = true;
        }

        return res.status(200).json({ film, likeStatus });
    });
};
