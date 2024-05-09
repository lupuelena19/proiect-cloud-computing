import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const projectsCollection = db.collection("evenimente");

      const projects = await projectsCollection.find({}).toArray();

      return res.status(200).json(projects);
    } catch (error) {
      console.error("Eroare la obtinerea biletelor:", error);
      return res.status(500).json({ message: "Biletele nu au ptut fi obtinute." });
    }
  }

  return res.status(405).json({ message: "Metoda nu este permisa!" });
}

