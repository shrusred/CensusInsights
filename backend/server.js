//importing express and initializing it on data
// const { fileTypeFromBuffer } = require("file-type");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const locationphotoJSON = "./data/locationphoto.json";
const mysql = require("mysql");
console.log(locationphotoJSON);
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../backend/knexfile.js"));

const router = express.Router();
const users = [
  { id: "111", username: "jmcreid", password: "abc123", role: "manager" },
  { id: "222", username: "dschuman", password: "efg789", role: "manager" },
  { id: "1", username: "msmith", password: "sun4455", role: "fieldagent" },
  { id: "2", username: "amarco", password: "moon1122", role: "fieldagent" },
  { id: "3", username: "cdietrich", password: "junjul333", role: "fieldagent" },
  { id: "4", username: "skurkoff", password: "canada123", role: "fieldagent" },
  { id: "5", username: "zcesare", password: "america123", role: "fieldagent" },
  { id: "6", username: "hmazari", password: "london123", role: "fieldagent" },
  { id: "7", username: "nburbank", password: "spain123", role: "fieldagent" },
];

//solving CORS:
const cors = require("cors");
app.use(cors());
app.use(express.json());

const fs = require("fs");

const PORT = process.env.PORT || 8080;

// app.use(bodyparser.json());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "rootroot",
  database: "censusinsights", //updated the database
});
function getUsers() {
  //reusable async function
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT m.managerid AS id,m.username,m.password,m.role FROM manager m UNION SELECT f.fieldagentid,f.username,f.password,f.role FROM fieldagent f;",
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        // console.log(results);
        resolve(results);
      }
    );
  });
}

//read file: locationphotoJSON
function readLocationphoto() {
  const locationphotoFile = fs.readFileSync(locationphotoJSON);
  const locationphotoData = JSON.parse(locationphotoFile);
  return locationphotoData;
}

// write new data into the locationphoto
function writeLocationPhotoItem(data) {
  const newLocationPhotoData = data;

  const oldLocationPhotoData = readLocationphoto();

  const toWrite = [...oldLocationPhotoData, newLocationPhotoData];
  fs.writeFileSync("./data/locationphoto.json", JSON.stringify(toWrite));
}

//Creating new locationphoto in the storage
function createNewLocationPhotoItem(data) {
  //Creating data obj
  const newItem = {
    assignmentid: data.assignmentid,
    imagepath: data.imagepath,
  };

  //Writing new inventory on database
  writeLocationPhotoItem(newItem);
}

const fileTypeFromBuffer = (...args) =>
  import("file-type").then(({ fileTypeFromBuffer }) =>
    fileTypeFromBuffer(...args)
  ); //Ben told me to do this

////////////////////////////////////////////////////
/////////////////   API ACTIONS   //////////////////
////////////////////////////////////////////////////

// 1. Assignment photo file upload POST
app.post(
  "/assignment/:assignmentid/image", //what is the use of the /image at the end ?
  // middleware for parsing the incoming request body, provide an array of types that your server will support
  // Valid types can be found here: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
  bodyparser.raw({
    type: [
      "image/png",
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
    ],
    limit: "10MB",
  }),

  async (req, res) => {
    console.log("request received", req.body);
    const assignmentid = req.params.assignmentid;

    // determine file type (ex. png)
    const fileType = await fileTypeFromBuffer(req.body);
    console.log("type", fileType);

    const imgpath = `./images/${uuidv4()}.${fileType.ext}`; //this could be the image path that is stored in the db
    // save the image to the server's filesystem with a unique name using the fileType extension
    fs.writeFileSync(imgpath, req.body);

    console.log(imgpath);

    const query = `UPDATE assignments SET imagepath= '${imgpath}' WHERE assignmentid=${assignmentid};`;
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      res.send("Data inserted successfully");
    });
  }
);
// 2. DELETE Q. delete data if there is no census data then delete, else say you cannot delete
app.delete("/assignment/:assignmentid", (req, res) => {
  console.log("File deleted");
  return res.status(200).json({ result: true, msg: "file deleted" });
});

const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token found" });
  }
  const authTokenArray = req.headers.authorization.split(" ");
  if (
    authTokenArray[0].toLowerCase() !== "bearer" &&
    authTokenArray.length !== 2
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  jwt.verify(authTokenArray[1], "somesecretstring", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "The token is expired or invalid" });
    }
    req.jwtPayload = decoded;
    next();
  });
};
// 3. Authorization POST (LOGIN END POINT)
//new line
app.post("/login", async (req, res) => {
  // console.log("req bod", req.body);
  const { username, password } = req.body;
  const users_db = await getUsers();
  console.log(users_db);
  const user = users.find((user) => {
    return user.username === username;
  });
  console.log(user.id);
  // console.log("user", user);

  if (!user) {
    return res.status(403).json({ message: "This user doesn't exist" });
  }

  if (user.password === password) {
    // Generate a token and send it back
    const token = jwt.sign(
      {
        userid: user.id, //
        username: username,
        loginTime: Date.now(),
      },
      "somesecretstring", //process.env.JWT_SECRET, //.dotenv. create a file on machine with .env and ignore this in source control. Use the .dotenv package to load the file and then access it with the process
      { expiresIn: "3m" }
    );
    return res.status(200).json({ token, role: user.role });
  } else {
    return res.status(403).json({ message: "Invalid username or password" });
  }
});

// a protected route, note we are using a second parameter "authorize" which is our middleware for authentication

// 4. Authorization GET relevant data
app.get("/profilehome/:id", authorize, (req, res) => {
  console.log("reached profile home page based on id");
  return res.status(200).json({ token });
});

//Listening for access on PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

////// OLD CODE --- DELETE LATER IF FOUND TO BE IRRELEVANT  //////
//1. Attempt 1
// app.post("/photoupload", (req, res) => {
//   // console.log(req);
//   console.log(req.body);
//   // writeLocationPhotoItem(req.body);
//   // console.log("file uploaded");
//   return res.status(200).json({ result: true, msg: "file uploaded" });
// });
