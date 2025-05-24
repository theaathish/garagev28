import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, contact, carName, photoUrl } = req.body;

  if (!name || !contact || !carName) {
    return res.status(400).json({ error: "Name, contact, and car name are required" });
  }

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("contact", contact);
  formData.append("carName", carName);
  formData.append("photoUrl", photoUrl || "");

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzC7qS8-H1xF9Z6XcKQ7VqTl3va43jH56Nax077el30bBtNEHk8zFsQ_askom8DyvkWKQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }
    );

    const text = await response.text();
    res.status(200).json({ result: "Car details submitted successfully!" });
  } catch (error) {
    console.error("Car submission error:", error);
    res.status(500).json({ error: "Failed to submit car details" });
  }
}
