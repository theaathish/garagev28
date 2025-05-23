import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../sanity/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const brands = await client.fetch(`array::unique(*[_type == "car"].brand)`);
  const styles = await client.fetch(`array::unique(*[_type == "car"].style)`);
  res
    .status(200)
    .json({ brands: brands.filter(Boolean), styles: styles.filter(Boolean) });
}
