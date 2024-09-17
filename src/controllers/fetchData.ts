import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export async function getData(req: Request, res: Response) {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const data = response.data;

    // Prepare top 10 entries
    const top10 = Object.values(data).slice(0, 10);

    // Begin transaction
    await prisma.$transaction(async (tx) => {
      // Clear previous data
      await tx.topCrypto.deleteMany();

      // Insert new data
      const insertPromises = top10.map((item: any) =>
        tx.topCrypto.create({
          data: {
            name: item.name,
            last: parseFloat(item.last),
            buy: parseFloat(item.buy),
            sell: parseFloat(item.sell),
            volume: parseFloat(item.volume),
            base_unit: item.base_unit,
          },
        })
      );

      // Await all insertions
      await Promise.all(insertPromises);
    });

    console.log("Data successfully fetched and stored in db!");
  } catch (error) {
    console.error("Error during data fetching or storing:", error);
  }
}
