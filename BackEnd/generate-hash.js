const bcrypt = require("bcrypt");

const password = "admin123"; // Change this to your desired password

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log("Hashed password:", hash);
});
