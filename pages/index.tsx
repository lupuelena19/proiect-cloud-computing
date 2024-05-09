import { useState, FormEvent, useEffect } from "react";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";


type Eveniment = {
  _id: string;
  nume_ev: string;
  data_ev: Date;
  locatie: string;
  durata: number;
  descriere: string;
};

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [error, setError] = useState("");
  const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
  const [_numeEv, setNumeEv] = useState("");
  const [_dataEv, setDataEv] = useState("");
  const [_locatie, setLocatie] = useState("");
  const [_durata, setDurata] = useState("");
  const [_descriere, setDescriere] = useState("");
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  useEffect(() => {
    async function fetchEvenimente() {
      try {
        const response = await fetch("/api/getEvent");
        if (response.ok) {
          const data = await response.json();
          setEvenimente(data);
        } else {
          setError("Evenimentele nu au fost obtinute!.");
        }
      } catch (error) {
        console.error("Evenimentele nu au fost obtinute:", error);
        setError("Evenimentele nu au fost obtinute!");
      }
    }

    fetchEvenimente();
  }, []);

  const handleAddEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (!_numeEv || !_dataEv || !_locatie || !_durata || !_descriere) {
      
      setError("Va rugam sa completati toate campurile!");
      return;
    }

    try {
      const response = await fetch("/api/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nume_ev: _numeEv,
          data_ev: new Date(_dataEv).toLocaleDateString(),
          locatie: _locatie,
          durata: _durata,
          descriere: _descriere
        }),
      });

      if (response.ok) {
        setError("");
        setNumeEv("");
        setDataEv("");
        setLocatie("");
        setDurata("");
        setDescriere("");
        alert("Biletul evenimentului a fost introdus cu succes!");
        window.location.reload();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Eroare la adaugare:", error);
      setError("Exista o eroare la adaugarea biletului.");
    }
  };


  const handleDeleteAllEvents = async () => {
    try {
      const response = await fetch("/api/deleteEvents", {
        method: "DELETE",
      });

      if (response.ok) {
        setError("");
        setEvenimente([]); // Șterge toate proiectele din starea locală
        alert("Toate proiectele au fost șterse cu succes!");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Eroare la ștergerea proiectelor:", error);
      setError("A apărut o eroare la ștergerea proiectelor.");
    }
  };
  return (
    <div className="page">
      <div className="titlu">
        <h1>Bilete evenimente</h1>
      </div>
      <div className="butoane">
        <button onClick={handleDeleteAllEvents}>Delete</button>
        <button onClick={() => setShowAddEventModal(true)}>Add Event</button>
      </div>
      <div className="container-adaugare">
      {showAddEventModal && (
        <div>
          <form onSubmit={handleAddEvent} >
               {error && <p >{error}</p>}
               <div>
                 <label htmlFor="numeEv">Nume Eveniment:</label>
                 <input
                  type="text"
                  id="numeEv"
                  value={_numeEv}
                  onChange={(e) => setNumeEv(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dataEv">Data Eveniment:</label>
                <input
                  type="date"
                  id="dataEv"
                  value={_dataEv}
                  onChange={(e) => setDataEv(e.target.value)}
                  />
              </div>
              <div>
                <label htmlFor="locatie">Locație:</label>
                <input
                  type="text"
                  id="locatie"
                  value={_locatie}
                  onChange={(e) => setLocatie(e.target.value)}
                  
                />
              </div>
              <div >
                <label htmlFor="durata">Durata:</label>
                <input
                  type="number"
                  id="durata"
                  value={_durata}
                  onChange={(e) => setDurata(e.target.value)}
                  
                />
              </div>
              <div>
                <label htmlFor="descriere">Descriere:</label>
                <input
                  type="text"
                  id="descriere"
                  value={_descriere}
                  onChange={(e) => setDescriere(e.target.value)}

                />
              </div>
              <button 
                type="submit" 
              >
                Adaugare
              </button>
            </form>
        </div>
      )}


      </div>
      <div className="lista-evenimente">
      <ul>
        {evenimente.map(event => (
          <li key={event._id}>
            <div>
              <h2>{event.nume_ev}</h2>
              <p>Date: {event.data_ev}</p>
              <p>Location: {event.locatie}</p>
              <p>Duration: {event.durata}</p>
              <p>Description: {event.descriere}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
      
    </div>
  );

}
