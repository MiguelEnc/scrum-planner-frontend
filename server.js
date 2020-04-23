const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API running");
});

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/invitations", require("./routes/api/invitations"));
app.use("/api/projects", require("./routes/api/projects"));
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
