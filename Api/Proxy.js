export default async function handler(req, res) {
  const { model, inputs } = req.query;
  const token = "hf_your_actual_token_here"; // apna token daal yahan

  if (!model) {
    return res.status(400).json({ error: "Missing model name" });
  }

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
