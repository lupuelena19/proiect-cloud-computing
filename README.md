Titlu: Aplicatia pentru gestiunea de bilete de evenimente
Nume: Lupu
Prenume: Elena
Grupa: 1132
Link aplicatie:  proiect-cloud-computing-six.vercel.app
Link video: https://youtu.be/WeL4wHRxgdI

1. Introducere
Această aplicație cloud se concentrează pe implementarea unui sistem de gestionare a biletelor pentru mai multe evenimente și utilizează tehnologii precum Next.js și MongoDB Compass. 
Proiectul include o parte front-end și o parte back-end pentru a permite utilizatorilor să interacționeze eficient cu sistemul prin crearea, vizualizarea și ștergerea biletelor. 


2. Descriere problema
Principalul obiectiv al aplicației este de a oferi o modalitate organizată și eficientă de a gestiona informațiile despre biletele pentru evenimente. Detalii precum numele evenimentului, data desfășurării, locația, durata și descrierea sunt incluse în bilete. Problema abordată este nevoia de a gestiona aceste evenimente dinamice cu capacitatea de a adăuga, șterge și vizualiza rapid prin intermediul unei interfețe web accesibile. 


3. Descriere API
API-ul este construit folosind Next.js API Routes și comunică cu o bază de date MongoDB, care include următoarele rute:
POST /api/createEvent: Acceptă date de intrare pentru un eveniment nou și îl adaugă în baza de date.
GET /api/getEvent: Returnează o listă a tuturor evenimentelor stocate în baza de date.
DELETE /api/deleteEvents: Șterge toate evenimentele din baza de date.

4. Flux de date
a. Exemple de request/response:
POST /api/createEvent
Request: Trimiterea unui corp JSON cu informațiile evenimentului.
Response: Mesaj de succes sau eroare, în funcție de rezultatul operației.
Request: {
  "nume_ev": "Concert Anual",
  "data_ev": "2024-06-15",
  "locatie": "Sala Palatului",
  "durata": 2,
  "descriere": "Concert de muzică clasică"
}
Response: {
  "message": "Biletul a fost introdus cu succes!"
}

GET /api/getEvent
Response: Lista evenimentelor existente sau mesaj de eroare
Response: [
  {
    "_id": "624b123fa2f0b3b12345d678",
    "nume_ev": "Concert Anual",
    "data_ev": "2024-06-15",
    "locatie": "Sala Palatului",
    "durata": 2,
    "descriere": "Concert de muzică clasică"
  }
]
DELETE /api/deleteEvents
Response: Mesaj de succes sau eroare, după ștergerea evenimentelor
Response: {
  "message": "Biletele au fost sterse cu succes!"
}

b. Metodele HTTP utilizate sunt:
POST: Care creează bilete noi.
GET: Care extrage listei de bilete.
DELETE: Care șterge toate bilete.

5. Capturi ecran aplicație
![image](https://github.com/lupuelena19/proiect-cloud-computing/assets/75038480/204dee45-7802-4cba-9baf-8083534f6e91)
![image](https://github.com/lupuelena19/proiect-cloud-computing/assets/75038480/921bcba4-dd99-4a9b-aac8-26654386a7b4)
![image](https://github.com/lupuelena19/proiect-cloud-computing/assets/75038480/994890c3-a210-447a-8212-72fcb73a902b)
![image](https://github.com/lupuelena19/proiect-cloud-computing/assets/75038480/c3ace066-a32e-4e33-90b4-e10d051f5476)


6. Referințe
https://www.w3schools.com/mongodb/
https://www.mongodb.com/docs/atlas/getting-started/
https://vercel.com/docs/getting-started-with-vercel
https://vercel.com/docs
https://vercel.com/docs/deployments/overview
https://nextjs.org/learn-pages-router/basics/create-nextjs-app
https://nextjs.org/docs




