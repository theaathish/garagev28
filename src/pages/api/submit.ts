import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzC7qS8-H1xF9Z6XcKQ7VqTl3va43jH56Nax077el30bBtNEHk8zFsQ_askom8DyvkWKQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }
    );

    await response.text(); // Read response but don't store unused variable
    res.status(200).json({ result: "Message sent successfully!" });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
}
