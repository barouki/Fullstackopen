if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let PORT = process.env.PORT || 3000;
let DB_URI =
  "mongodb+srv://drayman:drayman1@cluster0-pqcsx.mongodb.net/test?retryWrites=true&w=majority";

if (process.env.NODE_ENV === "test") DB_URI = process.env.TEST_DB_URI;

module.exports = {
  DB_URI,
  PORT,
};
