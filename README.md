# TruthLens AI - Fake News Detection Website

A full-stack student project for **Design and Implementation of a Fake News Detection Website**.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Recharts, Lucide Icons
- Backend: Python Flask
- Detection: Rule-based demo predictor now, ML-ready backend structure
- Auth: Demo/localStorage authentication

## Folder Structure

```text
truthlens-ai-full/
├── frontend/
├── backend/
└── docs/
```

## How to Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## How to Run Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Pages Included

- Loading Page
- Intro Page
- Landing Page
- Login Page
- Register Page
- User Dashboard
- Detect News Page
- Result Page
- History Page with pagination
- Admin Dashboard

## Notes

The backend currently uses a demo scoring method so the project works immediately. You can later replace it with a trained ML model using TF-IDF and Logistic Regression.
