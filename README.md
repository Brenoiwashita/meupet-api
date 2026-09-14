# MeuPet API (Node + Express + MongoDB)

## Features
- Google ID token exchange -> app JWT
- Multi-pet CRUD
- Generic medical timeline records: consultations, exams, vaccines, medication, weight, preventive care, procedures, docs
- Image/PDF attachments stored in MongoDB for MVP (4 MB per file)
- Tenant isolation by authenticated user

## Local
1. Copy `.env.example` to `.env` and fill secrets.
2. `npm install`
3. `npm run dev`

The supplied MongoDB credential is intentionally **not committed or packaged**. Put the full URI in `MONGODB_URI` locally and in Vercel Environment Variables.

## Vercel
Import this folder as a separate Vercel project. Add all variables from `.env.example` in Project Settings > Environment Variables. Set `PUBLIC_API_URL` to the production API domain and `CORS_ORIGINS` to the Angular production domain.

### Upload note
This MVP stores attachments in MongoDB and limits each upload to 4 MB, suitable for prescriptions and exam images. For production scale, migrate attachments to object storage (Vercel Blob/S3/Cloudinary) while keeping metadata in MongoDB.
