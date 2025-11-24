# 🦷 Dental Chart IDP - Backend API

AI-powered handwriting extraction for Philippine Dental Association (PDA) dental charts using Google Gemini.

---

## 📋 Overview

REST API that automates extraction of handwritten data from dental chart forms:

1. Upload scanned dental chart pages (JPEG/PNG/PDF)
2. AI extracts handwritten text
3. User verifies and corrects data
4. Data saved to PostgreSQL

**Accuracy:** 90-95% per page

---

## 🛠️ Tech Stack

- **Node.js** + **TypeScript** + **Express.js**
- **PostgreSQL** + **Prisma ORM**
- **Google Gemini 2.5 Flash** (AI extraction)
- **Multer** (file uploads)

---

## 📋 Prerequisites

- Node.js v18+
- PostgreSQL 14+
- Gemini API Key ([Get Free Key](https://aistudio.google.com/app/apikey))

---

## 🚀 Installation

```bash
# Clone repository
git clone <your-repo-url>
cd dental-chart-idp-backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your values
DATABASE_URL="postgresql://username:password@localhost:5432/dental_chart_idp_db"
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./uploads"

# Setup database
npx prisma generate
npx prisma migrate dev --name init

# Start server
npm run dev
```

**Server runs at:** http://localhost:3000

---

## 📚 API Endpoints

| Method | Endpoint                         | Description                   |
| ------ | -------------------------------- | ----------------------------- |
| GET    | `/api/health`                    | Health check                  |
| POST   | `/api/extract/page1`             | Extract Page 1 (Patient Info) |
| PUT    | `/api/extract/page1/:chartId`    | Update Page 1                 |
| POST   | `/api/extract/page2`             | Extract Page 2 (Dental Chart) |
| PUT    | `/api/extract/page2/:chartId`    | Update Page 2                 |
| POST   | `/api/extract/page3`             | Extract Page 3 (Consent)      |
| PUT    | `/api/extract/page3/:chartId`    | Update Page 3                 |
| POST   | `/api/extract/page4`             | Extract Page 4 (Treatment)    |
| PUT    | `/api/extract/page4/:chartId`    | Update Page 4                 |
| GET    | `/api/charts`                    | Get all charts                |
| GET    | `/api/charts/stats`              | Get statistics                |
| GET    | `/api/charts/:id`                | Get single chart              |
| GET    | `/api/charts/patient/:patientId` | Get patient charts            |
| DELETE | `/api/charts/:id`                | Delete chart                  |

---

## 📄 Page Order

**Updated page sequence for better workflow:**

- **Page 1:** Patient Information & Medical History
- **Page 2:** Dental Chart & Examination (formerly Page 3)
- **Page 3:** Informed Consent (formerly Page 2)
- **Page 4:** Treatment Record

---

## 📁 Project Structure

```
dental-chart-idp-backend/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── page1.controller.ts
│   │   ├── page2.controller.ts
│   │   ├── page3.controller.ts
│   │   ├── page4.controller.ts
│   │   └── dentalChart.controller.ts
│   ├── middleware/
│   │   ├── upload.middleware.ts
│   │   └── errorHandler.middleware.ts
│   ├── routes/
│   │   ├── page1.routes.ts
│   │   ├── page2.routes.ts
│   │   ├── page3.routes.ts
│   │   ├── page4.routes.ts
│   │   └── dentalChart.routes.ts
│   ├── services/
│   │   └── gemini.service.ts
│   ├── types/
│   │   ├── dentalChart.types.ts
│   │   └── express.types.ts
│   ├── app.ts
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── docs/prompts/
│   ├── page1-prompt.md
│   ├── page2-prompt.md
│   ├── page3-prompt.md
│   └── page4-prompt.md
├── uploads/
├── .env
├── package.json
└── README.md
```

---

## 🧪 Testing

**Health Check:**

```bash
curl http://localhost:3000/api/health
```

**Extract Page 1:**

```bash
curl -X POST http://localhost:3000/api/extract/page1 \
  -F "image=@/path/to/page1.jpg"
```

**Extract Page 2 (Dental Chart):**

```bash
curl -X POST http://localhost:3000/api/extract/page2 \
  -F "image=@/path/to/page2.jpg" \
  -F "chartId=uuid-from-page1"
```

**Response:**

```json
{
  "success": true,
  "chartId": "uuid-here",
  "patientId": "uuid-here",
  "data": { ... },
  "message": "Page 2 extracted successfully"
}
```

---

## 🐛 Troubleshooting

**Port already in use:**

```bash
npx kill-port 3000
```

**Database connection failed:**

- Check PostgreSQL is running
- Verify DATABASE_URL in .env

**Gemini API errors:**

- Verify GEMINI_API_KEY is correct
- Check rate limits (1,500 requests/day free tier)

**File upload errors:**

- Max file size: 10MB
- Allowed types: JPEG, PNG, PDF
- Form field name must be `image`

---

## 🚀 Deployment

**Railway:**

```bash
railway login
railway link
railway up
```

**Render:**

1. Connect GitHub repo
2. Build Command: `npm install && npm run build`
3. Start Command: `npm start`
4. Add environment variables

---

## 📄 Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dental_chart_idp_db"
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./uploads"
```

---

## 📊 Database Schema

**Patient**

- `id`, `firstName`, `lastName`, `birthDate`, `email`, `phone`
- `createdAt`, `updatedAt`
- _One patient → Many dental charts_

**DentalChart**

- `id`, `patientId`, `visitDate`, `visitType`
- `isCompleted`, `createdAt`, `updatedAt`
- **Page 1-4 Fields:**
  - `page[x]Data` (JSONB), `page[x]ImageUrl` (Text)
  - `page[x]Completed` (Boolean), `page[x]Verified` (Boolean)

---

## 🎯 Workflow

1. POST /api/extract/page1 → Get `chartId` (Patient Info & Medical History)
2. POST /api/extract/page2 → Use `chartId` (Dental Chart & Examination)
3. POST /api/extract/page3 → Use `chartId` (Informed Consent)
4. POST /api/extract/page4 → Use `chartId` (Treatment Record - sets `isComplete=true`)
5. PUT endpoints to verify/correct data
6. GET /api/charts to view all

---

**Built for dental professionals 🦷**

---
