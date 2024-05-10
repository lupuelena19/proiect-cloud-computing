import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Metoda nu este permisa!" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection("evenimente").deleteMany({});

    res.status(200).json({ message: "Biletele au fost sterse!" });
  } catch (error) {
    console.error("Eroare la stergerea biletelor:", error);
    res.status(500).json({ message: "Eroare la stergerea biletelor." });
  }
}

