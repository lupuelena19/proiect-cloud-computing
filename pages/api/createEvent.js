import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nume_ev, data_ev, locatie, durata, descriere } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db();
    const projectsCollection = db.collection("evenimente");

    await projectsCollection.insertOne({ nume_ev, data_ev, locatie, durata, descriere });

    return res.status(200).json({ message: "Biletul a fost introdus cu succes!" });
  } catch (error) {
    console.error("Eroare la adaugare:", error);
    return res.status(500).json({ message: "Eroare la adaugarea biletului." });
  }
}

return res.status(405).json({ message: "Metoda nu este permisa!" });
}
