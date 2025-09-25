// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSZohtnPXem6m7f6A63KjXTQMUUFNk0Cg",
  authDomain: "ghost-entrance.firebaseapp.com",
  databaseURL: "https://ghost-entrance-default-rtdb.firebaseio.com",
  projectId: "ghost-entrance",
  storageBucket: "ghost-entrance.firebasestorage.app",
  messagingSenderId: "977704976997",
  appId: "1:977704976997:web:48497f9420c62920757c8c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set };