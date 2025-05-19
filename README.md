# MetaTestTask

A fullstack application with server-side rendering, built using:
- **Backend:** NestJS + TypeORM + PostgreSQL
- **Database:** PostgreSQL

---

## How to Run the Project Locally

### Requirements

- Node.js ≥ 18.x
- PostgreSQL ≥ 13
- Yarn or npm

---

### Clone the Repository

```bash
git clone https://github.com/Volyarosh94/MetaTestTask.git

cd MetaTestTask

cd backend
```

### Configure Environment Variables
Create a .env file in the /backend directory.

Example .env:

PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=metatest

### Start the Backend

Run the seed script:

```agsl
npm run seed # or yarn run seed

```

Install dependencies and start the development server:

```agsl
npm install # or yarn install
npm run start:dev # or yarn start:dev
```

### Open the Frontend
Open the index.html file in your browser to test the API via the UI with 4 buttons.



