import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function serveData(req: Request, res: Response) {
    try {
        const data = await prisma.topCrypto.findMany();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving data from the database' });
      }
}
