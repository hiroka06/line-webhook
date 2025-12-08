export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("LINE webhook is running.");
  }

  console.log("LINE event:", req.body);

  res.status(200).send("OK");
}
