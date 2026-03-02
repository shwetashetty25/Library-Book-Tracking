# 📚 Librarian Book Tracking System (GraphQL API)

A GraphQL-based backend system designed for librarians to manage books, patrons, borrowing records, overdue tracking, and fines. This project demonstrates database relationships, business logic, and GraphQL queries/mutations using Node.js, Express, Apollo Server, and MongoDB.

---

# 🚀 Features

* Track books and available copies
* Manage patrons and memberships
* Borrow and return books
* Automatic overdue detection
* Fine calculation for late returns
* Author and category relationships
* Complete borrowing history per patron

---

# 🧱 Tech Stack

* Node.js
* Express.js (v4)
* Apollo Server (GraphQL)
* MongoDB + Mongoose
* Nodemon

---

# 📂 Project Structure

```
librarian-graphql/
│
├── models/
│   ├── Book.js
│   ├── Patron.js
│   ├── Borrow.js
│   ├── Author.js
│   ├── Category.js
│   └── Fine.js
│
├── schema.js
├── resolvers.js
├── server.js
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone or Download Project

```
git clone <your-repo-url>
cd librarian-graphql
```

or download ZIP and extract.

---

## 2️⃣ Install Dependencies

```
npm install
```

---

## 3️⃣ Start MongoDB

If installed locally:

```
brew services start mongodb-community
```

or run:

```
mongod
```

---

## 4️⃣ Run Server

```
npm run dev
```

Server starts at:

```
http://localhost:4000/graphql
```

---

# 🗄️ Database Models

## Book

* isbn
* title
* author (ref Author)
* publisher
* category (ref Category)
* total_copies
* available

## Patron

* name
* email
* membership_date
* membership_type (standard/premium)

## Borrow

* book_id
* patron_id
* borrow_date
* due_date
* return_date
* status (borrowed/returned/overdue)

## Author

* name
* biography
* birth_year

## Category

* name
* description

## Fine

* patron_id
* amount
* reason
* paid_date

---

# 🔎 GraphQL Queries

## Get Available Books

```graphql
query {
  availableBooks {
    title
    available
  }
}
```

## Get Patron Borrow History

```graphql
query {
  patron(id: "PATRON_ID") {
    name
    borrows {
      book { title }
      borrowDate
      dueDate
      status
    }
  }
}
```

## Get Overdue Books

```graphql
query {
  overdueBorrows {
    book { title }
    patron { name }
    dueDate
  }
}
```

---

# ✏️ GraphQL Mutations

## Borrow Book

```graphql
mutation {
  createBorrow(input: {
    bookId: "BOOK_ID"
    patronId: "PATRON_ID"
    dueDate: "2026-03-10"
  }) {
    id
    status
    dueDate
  }
}
```

## Return Book

```graphql
mutation {
  returnBook(input: {
    borrowId: "BORROW_ID"
  }) {
    id
    status
    returnDate
  }
}
```

---

# 💰 Fine Calculation Logic

If return date > due date:

```
late_days = ceil(return_date - due_date)
fine = late_days × 10
```

Fine document is automatically created.

---

# ✅ Test Cases Covered

* Book availability updates
* Borrow reduces available copies
* Return increases copies
* Overdue detection works
* Fine generated for late return
* Patron borrowing history stored
* Author & category relationships

---

# 👨‍💻 How to Access & Use the API (For Users)

Follow these steps to run the system on your computer:

### Step 1 — Install Node.js and MongoDB

* Install Node.js (v18+ recommended)
* Install MongoDB Community Edition

### Step 2 — Start MongoDB

```
brew services start mongodb-community
```

### Step 3 — Install Project Dependencies

```
npm install
```

### Step 4 — Run Server

```
npm run dev
```

### Step 5 — Open GraphQL Interface

Open browser:

```
http://localhost:4000/graphql
```

### Step 6 — Run Queries or Mutations

Paste GraphQL queries in the playground and execute.

---

# 📌 Notes

* MongoDB must be running before starting server
* Replace IDs in queries with real database IDs
* Default fine rate = 10 per day

---

# 📄 License

Educational project for academic use.

---

# 🙌 Author

Kirthish Shetty
GraphQL Librarian Tracking Mini Project
