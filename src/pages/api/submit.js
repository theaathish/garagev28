export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end(); // Method not allowed

  const { name, email, message } = req.body;

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyG0J2gXxB1df2AAo2t5Wu61AriJdTfcuocKH6aZcp9SJ-g5uq79APc2IwohuySxleQzw/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      },
    );

    const text = await response.text();
    res.status(200).json({ result: text });
  } catch {
    res.status(500).json({ error: "Failed to submit form" });
  }
}
