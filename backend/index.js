const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({
  path: "./config.env",
});
require("./DB/connection");
const express = require("express");

const morgan = require("morgan");

const helmet = require("helmet");

const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(morgan("common"));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json());

app.use(cookieParser());

// const whitelist = ["http://localhost:3000", "http://localhost:3001"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// {
//   origin: ["http://localhost:3000"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }
app.use(cors());

app.use("/images", express.static("assets/images"));

app.use("/api/", require("./Routes/PatientRoutes/PatientRoute"));
app.use("/api/", require("./Routes/DoctorRoutes/DoctorRoutes"));
app.use(
  "/api/",
  require("./Routes/DoctorRoutes/DoctorProfessionalDetailsRoutes")
);
app.use("/api/", require("./Routes/OPDPatientRoutes/OPDPatientRoutes"));
app.use("/api/", require("./Routes/IPDPatientRoutes/IPDPatientRoutes"));
app.use("/api/", require("./Routes/BillingRoutes/BillingRoutes"));
app.use("/api/", require("./Routes/AdminAuth/AdminAuth"));
app.use("/api/", require("./Routes/AdminAuth/AdminCheckAuth"));

app.get("/home", (req, res) => {
  res.send("this is hms main page");
});

app.listen(PORT, () => {
  console.log(`MongoDb server is running at port number ${PORT}`);
});
