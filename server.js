const express = require("express");
const cors = require("cors");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./arbi-463c1-firebase-adminsdk-8sdt2-ecfd650b5b.json");
const bodyParser = require("body-parser");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Enable CORS
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

// Define the root route
app.post("/api/start", (req, res) => {
  const data = req.body;

  const db = admin.firestore();
  const docRef = db
    .collection("users")
    .doc(data.dato + "-" + data.email)
    .set(data);

  docRef
    .then(() => {
      res.json({
        message: "Hello, World!",
        data: data,
        status: "success",
      });
    })
    .catch((error) => {
      res.json({
        message: "Hello, World!",
        data: data,
        status: "failed",
      });
    });
});

app.post("/api/referal", (req, res) => {
  const data = req.body;

  const db = admin.firestore();
  db.collection("referals")
    .doc("referalId-" + data.referal)
    .get()
    .then((doc) => {
      console.log(doc.data());
      if (doc.exists) {
        res.json({
          message: "Hello, World!",

          name: doc.data().name,
          // data from the request
        });
      } else {
        res.status(201).json({
          message: "Hello, World!",
          data: data,
          status: "failed",
        });
      }
    });
});

app.listen(1234, () => {
  console.log("Server running on port 1234");
});
