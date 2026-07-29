const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectToDb = require("../backend/db/db.connection");
const expenseRoutes = require("../backend/routes/expense.routes");
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  /^https:\/\/.*\.vercel\.app$/,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    for (const allowedOrigin of allowedOrigins) {
      if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
        return callback(null, true);
      }
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(express.json());
app.use(cors(corsOptions));
connectToDb();
app.use("/", expenseRoutes);

app.listen(process.env.PORT, () => {
  //   console.log(process.env.MONGO_URI);

  console.log(`The app is running at port ${process.env.PORT}`);
});
