/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const admin = require("firebase-admin");

const serviceAccount = require("./permission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://api-ojt07-v2-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

// Setup app dependencies
const db = admin.firestore();
const express = require("express");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors({ origin: true }));

// use app to create route with request (req) and response (res)
// Basic test route
app.get("/api/hello-world", (req, res) => {
  return res.status(200).send("Hello World! and better");
});

// Create
app.post("/api/users", (req, res) => {
  (async () => {
    try {
      const query = db.collection("users");
      const response = [];
      await query
        .get()
        .then((querySnapshot) => {
          const docs = querySnapshot.docs; // the result of our query
          for (const doc of docs) {
            // add each doc to our JSON response
            const selectedItem = {
              id: doc.id,
              ...doc.data(),
            };
            response.push(selectedItem);
          }
        })
        .then(async (respro) => {
          const id = response.length + 1;
          await db
            .collection("users")
            .doc("/" + id + "/")
            .create({
              ...req.body,
              createdAt: new Date().toISOString(),
            });
          const resData = {
            id,
            ...req.body,
            createdAt: new Date().toISOString(),
          };
          return res.status(200).json(resData);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Read item
app.get("/api/users/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);
      const user = await document.get();
      const response = user.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Read all
app.get("/api/users", (req, res) => {
  (async () => {
    try {
      const query = db.collection("users");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs; // the result of our query
        for (const doc of docs) {
          // add each doc to our JSON response
          const selectedItem = {
            id: doc.id,
            ...doc.data(),
          };
          response.push(selectedItem);
        }
        return response; // each then should return a value
      });
      return res.status(200).send(response); // end of async function should return a value
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Update
app.patch("/api/users/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);
      await document.update(req.body);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Delete
app.delete("/api/users/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/products", (req, res) => {
  (async () => {
    try {
      const query = db.collection("products");
      const response = [];
      await query
        .get()
        .then((querySnapshot) => {
          const docs = querySnapshot.docs; // the result of our query
          for (const doc of docs) {
            // add each doc to our JSON response
            const selectedItem = {
              id: doc.id,
              ...doc.data(),
            };
            response.push(selectedItem);
          }
        })
        .then(async (respro) => {
          const id = response.length + 1;
          await db
            .collection("products")
            .doc("/" + id + "/")
            .create({ ...req.body, createdAt: new Date().toISOString() });
          const resData = {
            id,
            ...req.body,
            createdAt: new Date().toISOString(),
          };
          return res.status(200).json(resData);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Read item
app.get("/api/products/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("products").doc(req.params.id);
      const user = await document.get();
      const response = user.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Read all
app.get("/api/products", (req, res) => {
  (async () => {
    try {
      const query = db.collection("products");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs; // the result of our query
        for (const doc of docs) {
          // add each doc to our JSON response
          const selectedItem = {
            id: doc.id,
            ...doc.data(),
          };
          response.push(selectedItem);
        }
        return response; // each then should return a value
      });
      return res.status(200).send(response); // end of async function should return a value
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Update
app.patch("/api/products/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("products").doc(req.params.id);
      await document.update(req.body);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Delete
app.delete("/api/products/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("products").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/orders", (req, res) => {
  (async () => {
    try {
      const query = db.collection("orders");
      const response = [];
      await query
        .get()
        .then((querySnapshot) => {
          const docs = querySnapshot.docs; // the result of our query
          for (const doc of docs) {
            // add each doc to our JSON response
            const selectedItem = {
              id: doc.id,
              ...doc.data(),
            };
            response.push(selectedItem);
          }
        })
        .then(async (respro) => {
          const id = response.length + 1;
          await db
            .collection("orders")
            .doc("/" + id + "/")
            .create({ ...req.body, createdAt: new Date().toISOString() });
          const resData = {
            id,
            ...req.body,
            createdAt: new Date().toISOString(),
          };
          return res.status(200).json(resData);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Read item
app.get("/api/orders/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("orders").doc(req.params.id);
      const user = await document.get();
      const response = user.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Read all
app.get("/api/orders", (req, res) => {
  (async () => {
    try {
      const query = db.collection("orders");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs; // the result of our query
        for (const doc of docs) {
          // add each doc to our JSON response
          const selectedItem = {
            id: doc.id,
            ...doc.data(),
          };
          response.push(selectedItem);
        }
        return response; // each then should return a value
      });
      return res.status(200).send(response); // end of async function should return a value
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/orders", (req, res) => {
  (async () => {
    try {
      const query = db.collection("orders");
      const response = [];
      await query
        .get()
        .then((querySnapshot) => {
          const docs = querySnapshot.docs; // the result of our query
          for (const doc of docs) {
            // add each doc to our JSON response
            const selectedItem = {
              id: doc.id,
              ...doc.data(),
            };
            response.push(selectedItem);
          }
        })
        .then(async (respro) => {
          const id = response.length + 1;
          await db
            .collection("orders")
            .doc("/" + id + "/")
            .create({ ...req.body, createdAt: new Date().toISOString() });
          const resData = {
            id,
            ...req.body,
            createdAt: new Date().toISOString(),
          };
          return res.status(200).json(resData);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Update
app.patch("/api/orders/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("orders").doc(req.params.id);
      await document.update(req.body);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Delete
app.delete("/api/orders/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("orders").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// cart
// // Read item
app.get("/api/cartItems/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("cartItems").doc(req.params.id);
      const user = await document.get();
      const response = user.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Read all
app.get("/api/cartItems", (req, res) => {
  (async () => {
    try {
      const query = db.collection("cartItems");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs; // the result of our query
        for (const doc of docs) {
          // add each doc to our JSON response
          const selectedItem = {
            id: doc.id,
            ...doc.data(),
          };
          response.push(selectedItem);
        }
        return response; // each then should return a value
      });
      return res.status(200).send(response); // end of async function should return a value
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Update
app.patch("/api/cartItems/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("cartItems").doc(req.params.id);
      await document.update(req.body);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/cartItems", (req, res) => {
  (async () => {
    try {
      const query = db.collection("cartItems");
      const response = [];
      await query
        .get()
        .then((querySnapshot) => {
          const docs = querySnapshot.docs; // the result of our query
          for (const doc of docs) {
            // add each doc to our JSON response
            const selectedItem = {
              id: doc.id,
              ...doc.data(),
            };
            response.push(selectedItem);
          }
        })
        .then(async (respro) => {
          const id = response.length + 1;
          await db
            .collection("cartItems")
            .doc("/" + id + "/")
            .create({ ...req.body, createdAt: new Date().toISOString() });
          const resData = {
            id,
            ...req.body,
            createdAt: new Date().toISOString(),
          };
          return res.status(200).json(resData);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Delete
app.delete("/api/cartItems/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("cartItems").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// order detail
// // Read item
app.get("/api/orderDetails/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("orderDetails").doc(req.params.id);
      const user = await document.get();
      const response = user.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Read all
app.get("/api/orderDetails", (req, res) => {
  (async () => {
    try {
      const query = db.collection("orderDetails");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs; // the result of our query
        for (const doc of docs) {
          // add each doc to our JSON response
          const selectedItem = {
            id: doc.id,
            ...doc.data(),
          };
          response.push(selectedItem);
        }
        return response; // each then should return a value
      });
      return res.status(200).send(response); // end of async function should return a value
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Update
app.patch("/api/orderDetails/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("orderDetails").doc(req.params.id);
      await document.update(req.body);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/orderDetails", (req, res) => {
  (async () => {
    try {
      const query = db.collection("orderDetails");
      const response = [];
      await query
        .get()
        .then((querySnapshot) => {
          const docs = querySnapshot.docs; // the result of our query
          for (const doc of docs) {
            // add each doc to our JSON response
            const selectedItem = {
              id: doc.id,
              ...doc.data(),
            };
            response.push(selectedItem);
          }
        })
        .then(async (respro) => {
          const id = response.length + 1;
          await db
            .collection("orderDetails")
            .doc("/" + id + "/")
            .create({ ...req.body, createdAt: new Date().toISOString() });
            const resData = {
              id,
              ...req.body,
              createdAt: new Date().toISOString(),
            };
            return res.status(200).json(resData);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// // Delete
app.delete("/api/orderDetails/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("orderDetails").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


// Expose our CRUD app as a single Cloud Function :)
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
