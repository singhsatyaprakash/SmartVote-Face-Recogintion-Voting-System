# SmartVote Backend API

This backend provides RESTful APIs for the SmartVote platform, using MongoDB with Mongoose schemas.

---

## 📦 Data Models

### Admin

| Field    | Type   | Description                |
|----------|--------|----------------------------|
| userID   | Number | Unique admin ID            |
| username | String | Unique admin username      |
| password | String | Hashed password            |
| email    | String | Unique email address       |

### Voter

| Field         | Type   | Description                          |
|---------------|--------|--------------------------------------|
| username      | String | Voter's name                         |
| aadhaarNumber | String | 12-digit Aadhaar number (unique)     |
| dob           | String | Date of birth (YYYY-MM-DD)           |
| age           | Number | Age (>= 18)                          |
| password      | String | Hashed password                      |
| descriptor    | Map    | Face descriptor for recognition      |
| hasVoted      | Bool   | Whether the voter has voted          |
| votedCandidate| String | Candidate ID voted for (nullable)    |

### Candidate

| Field         | Type   | Description                          |
|---------------|--------|--------------------------------------|
| name          | String | Candidate name                       |
| aadhaarNumber | String | Aadhaar number (unique)              |
| party         | String | Party name                           |
| symbolUrl     | String | URL to party symbol image            |
| votes         | Number | Vote count                           |
| electionId    | ObjectId| Reference to Election               |

### Election

| Field        | Type   | Description                           |
|--------------|--------|---------------------------------------|
| electionName | String | Name of the election                  |
| electionId   | String | Unique election ID                    |
| startDate    | Date   | Start date/time                       |
| endDate      | Date   | End date/time                         |
| status       | String | 'upcoming', 'ongoing', or 'completed' |

---

## 🛣️ API Endpoints

### Admin Routes (`/admin`)

#### POST `/admin/login`
Authenticate admin.

**Request:**
```json
{
  "userID": 1,
  "email": "admin@example.com",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "admin": { "userID": 1, "username": "admin", "email": "admin@example.com" }
}
```

---

#### GET `/admin/profile/:id`
Get admin profile by MongoDB `_id`.

**Response:**
```json
{
  "message": "Conformation of admin",
  "admin": { "userID": 1, "username": "admin", "email": "admin@example.com" }
}
```

---

#### GET `/admin/voterlist`
Get all voters.

**Response:**
```json
[
  {
    "username": "John",
    "aadhaarNumber": "123456789012",
    "dob": "2000-01-01",
    "age": 22,
    "hasVoted": false,
    "votedCandidate": null
  }
]
```

---

#### POST `/admin/create-election`
Create a new election.

**Request:**
```json
{
  "electionName": "General Election 2024",
  "electionId": "GE2024"
}
```
**Response:**
```json
{
  "message": "Election created successfully",
  "election": {
    "electionName": "General Election 2024",
    "electionId": "GE2024",
    "status": "upcoming"
  }
}
```

---

#### GET `/admin/electionlist`
Get all elections.

**Response:**
```json
[
  {
    "electionName": "General Election 2024",
    "electionId": "GE2024",
    "status": "upcoming"
  }
]
```

---

#### POST `/admin/addCandidate/:electionId`
Add a candidate to an election.

**Request:**
```json
{
  "name": "Alice",
  "party": "PartyX",
  "symbolUrl": "https://example.com/symbol.png",
  "aadhaarNumber": "123456789012"
}
```
**Response:**
```json
{
  "message": "Candidate added successfully",
  "candidate": {
    "name": "Alice",
    "party": "PartyX",
    "symbolUrl": "https://example.com/symbol.png",
    "aadhaarNumber": "123456789012",
    "electionId": "GE2024"
  }
}
```

---

#### GET `/admin/getCandidate/:electionId`
Get all candidates for an election.

**Response:**
```json
[
  {
    "name": "Alice",
    "party": "PartyX",
    "symbolUrl": "https://example.com/symbol.png",
    "aadhaarNumber": "123456789012",
    "votes": 0
  }
]
```

---

#### POST `/admin/reset-votes`
Reset all candidate votes to zero.

**Response:**
```json
{
  "message": "Votes reset successfully",
  "candidates": { "n": 3, "nModified": 3, "ok": 1 }
}
```

---

#### POST `/admin/start-election`
Start an election (sets status to "ongoing" and sets start/end time).

**Request:**
```json
{
  "electionId": "GE2024"
}
```
**Response:**
```json
{
  "message": "Election started successfully"
}
```

---

### Voter Routes (`/voter`)

#### POST `/voter/register-end`
Register a new voter.

**Request:**
```json
{
  "username": "John",
  "aadhaarNumber": "123456789012",
  "dob": "2000-01-01",
  "age": 22,
  "password": "yourpassword",
  "descriptor": { "0": 0.123, "1": 0.456, "...": "..." }
}
```
**Response:**
```json
{
  "message": "Voter registered successfully",
  "voter": {
    "username": "John",
    "aadhaarNumber": "123456789012",
    "dob": "2000-01-01",
    "age": 22
  }
}
```

---

#### POST `/voter/login`
Voter login.

**Request:**
```json
{
  "aadhaarNumber": "123456789012",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "voter": {
    "username": "John",
    "aadhaarNumber": "123456789012"
  }
}
```

---

#### GET `/voter/electionlist`
Get all elections.

**Response:**
```json
[
  {
    "electionName": "General Election 2024",
    "electionId": "GE2024",
    "status": "upcoming"
  }
]
```

---

#### GET `/voter/getcandidate/:id`
Get all candidates for an election.

**Response:**
```json
[
  {
    "name": "Alice",
    "party": "PartyX",
    "symbolUrl": "https://example.com/symbol.png",
    "aadhaarNumber": "123456789012",
    "votes": 0
  }
]
```

---

#### GET `/voter/ongoingElection`
Get ongoing elections.

**Response:**
```json
[
  {
    "electionName": "General Election 2024",
    "electionId": "GE2024",
    "status": "ongoing"
  }
]
```

---

#### GET `/voter/profile/:id`
Get voter profile by MongoDB `_id`.

**Response:**
```json
{
  "message": "Conformation of voter",
  "voter": {
    "username": "John",
    "aadhaarNumber": "123456789012",
    "dob": "2000-01-01",
    "age": 22
  }
}
```

---

#### GET `/voter/getdescriptor/:id`
Get face descriptor for a voter.

**Response:**
```json
{
  "message": "Descriptor found.",
  "descriptor": { "0": 0.123, "1": 0.456, "...": "..." }
}
```

---

## 📝 Notes

- All protected routes require JWT authentication in headers.
- All dates should be in `YYYY-MM-DD` format.
- Validation errors return status 400 with a message.
- For more details, see the code in the [`routes/`](routes/) and [`models/`](models/) folders.

---

For any questions, see the code or contact the maintainers.