# SmartVote Frontend (Client)

This is the **frontend** of the SmartVote project, built with React and Tailwind CSS. It provides a user-friendly interface for voters and administrators to interact with the SmartVote system.

---

## 🖥️ Frontend Workflow

### 1. User Type Selection
- Users choose between **Admin** and **Voter** roles on the landing page.

### 2. Authentication
- **Voters** can register and log in using their Aadhaar number, date of birth, and password.
- **Admins** log in with their credentials.

### 3. Voter Registration Flow
- Voters fill out a registration form.
- After submitting, they are redirected to a face scan page for biometric registration.
- On successful face registration, voter data is sent to the backend for storage.

### 4. Voting Flow
- Authenticated voters can view ongoing elections and candidates.
- Before voting, voters must verify their identity via face recognition.
- After verification, voters can cast their vote.

### 5. Admin Dashboard
- Admins can create elections, add candidates, view lists, manage complaints, and declare results.

### 6. Results & Complaints
- Both voters and admins can view election results.
- Voters can submit complaints or feedback via the contact page.

---

## 📁 Project Structure

- `src/pages/OtherPages/` – General pages (About, Contact, Home, etc.)
- `src/pages/VoterPages/` – Voter-specific pages (Registration, Login, Dashboard, etc.)
- `src/pages/AdminPages/` – Admin-specific pages (Dashboard, Add Candidate, etc.)
- `src/components/` – Shared React components (Navbar, Footer, FaceScanner, etc.)
- `src/context/` – React Context for state management.

---

## 🔗 Backend Flow & Documentation

The backend handles authentication, data storage, face descriptor management, voting logic, and admin operations.

- **Backend Flow:**
  - Receives API requests from the frontend (registration, login, voting, etc.).
  - Validates and processes data.
  - Interacts with the database for CRUD operations.
  - Handles face descriptor storage and verification.
  - Manages election and candidate data.

For detailed backend workflow, API endpoints, and setup, **see the backend README**:

👉 [SmartVote Backend README](server/README.MD)

---

## 🔗 More

For detailed frontend setup and scripts, see [client/README.md](README.md).

---
