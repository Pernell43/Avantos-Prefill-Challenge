# Avantos Prefill Challenge – de275b

This project is a solution to the Avantos React coding challenge. It demonstrates the ability to traverse a form DAG, visualize form nodes, and allow users to view and configure prefill mappings for each form field.

---

## 🚀 Tech Stack

- **React + TypeScript**
- **Zustand** – global state management
- **Axios** – API interaction
- **Vite** – development/build tooling
- **Custom mock API server** (provided)

---

## 📦 Folder Structure
src/
├── api/ ← Axios call to fetch form graph
├── data/ ← Mock global values
├── features/
│ ├── FormList/ ← Lists forms from the DAG
│ ├── PrefillPanel/ ← Prefill config + modal
├── hooks/ ← Zustand stores (form + modal)
├── models/ ← Shared types/interfaces
├── utils/ ← DAG traversal logic (parent map, ancestors)

---

## 🖥️ Features

- Lists all form nodes from the DAG
- Select a form to view its fields
- Configure prefill mappings:
  - Use form fields from upstream (direct + transitive)
  - Use global values (like company name)
- Visual feedback:
  - Green for form-based prefill
  - Blue for global-based prefill
- Remove mappings with ✖
- State updates are persisted in memory

---

## 🧠 Design Considerations

- Code split by **feature**
- All mappings are handled via `Zustand`
- DAG traversal built with reusable utility functions
- Global data sources can be extended via `globalData.ts`
- Modal is designed to support additional source types (e.g. API-based)

---

## 🛠️ Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/de275b.git
   cd de275b

2. Install the dependencies
    
    ```npm install

3. Start the FrontEnd
    
    ```npm run dev

4. Clone and start the mock API server (in a separate folder prefereably)

    ```git clone https://github.com/mosaic-avantos/frontendchallengeserver.git
    ```cd frontendchallengeserver
    ```npm install
    ```npm start

You can find a 30-minute walkthrough of my approach, logic, and demo here:
[Unlisted YouTube Link] – insert your video link here