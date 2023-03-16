//importing express and initializing it on data
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const locationphotoJSON = "./data/locationphoto.json";
const mysql = require("mysql");
console.log(locationphotoJSON);
const jwt = require("jsonwebtoken");
const router = express.Router();
// const knex = require("knex")(require("../backend/knexfile.js"));

//solving CORS:
const cors = require("cors");
app.use(cors());
app.use(express.json());

const fs = require("fs");

const PORT = process.env.PORT || 8080;

//////////////////////////////////////////////////////
/////////   DATABASE CONNECTION   ////////////////////
//////////////////////////////////////////////////////
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "rootroot",
  database: "censusinsights",
});
//////////////////////////////////////////////////////
/////////   FUNCTIONS   //////////////////////////////
//////////////////////////////////////////////////////
//1.function to get all the users that can login
function getUsers() {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT m.managerid AS id,m.username,m.password,m.role,m.managername as name FROM manager m UNION SELECT f.fieldagentid,f.username,f.password,f.role,f.fieldagentname FROM fieldagent f;",
      (error, results, fields) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      }
    );
  });
}
//2. function to get the user information based on the user id passed
function getUser(id) {
  const statement = `SELECT DISTINCT managerid FROM manager WHERE managerid=${id};`;

  return new Promise((resolve, reject) => {
    connection.query(statement, (error, results, fields) => {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
}
//.3 function to get the fieldagent's assignments based on id based
function getFieldagentAssignments(id) {
  const fieldagent_assignments_query = `SELECT assignmentid as id,street,city,postalcode,date_format(assignment_date,'%Y-%m-%d') as assignment_date,latitude,longitude FROM assignments where fieldagent_id=${id} and assignmentid NOT IN (SELECT DISTINCT assignment_id FROM censusdata);`;
  return new Promise((resolve, reject) => {
    connection.query(fieldagent_assignments_query, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      console.log(results);
      resolve(results);
    });
  });
}
// 4. function to get the fieldagent's particular assignment for verification

function getFieldagentAssignmentVerify(userid, assignmentid) {
  const fieldagent_assignment_verify_query = `SELECT * FROM assignments where fieldagent_id=${userid} and assignmentid =${assignmentid};`;
  return new Promise((resolve, reject) => {
    connection.query(
      fieldagent_assignment_verify_query,
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        console.log(results);
        resolve(results);
      }
    );
  });
}
//5. Function to get fieldagent information
function getFieldagentInfo(id) {
  const fieldagent_info_query = `select fieldagentid,fieldagentname,latitude,longitude from fieldagent where fieldagentid=${id};`;
  return new Promise((resolve, reject) => {
    connection.query(fieldagent_info_query, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      console.log(results);
      resolve(results);
    });
  });
}

//6. function to get the manager information
function getManagerInfo(id) {
  const manager_info_query = `select * from manager where managerid=${111};`;
  return new Promise((resolve, reject) => {
    connection.query(manager_info_query, (error, results, fields) => {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
}

//7. function to get the assignments of a manager
function getManagerAssignments(id) {
  const manager_assignments_query = `select distinct a.assignmentid as id,f.fieldagentid,f.fieldagentname,a.street,a.city,a.postalcode,a.latitude,a.longitude,c.assignment_id as censusassignment from   assignments a join fieldagent f on a.fieldagent_id=f.fieldagentid join manager m on m.managerid=f.manager_id left join censusdata c on c.assignment_id=a.assignmentid where m.managerid=${id};`;
  return new Promise((resolve, reject) => {
    connection.query(manager_assignments_query, (error, results, fields) => {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
}
function getCensus(managerid) {
  const census_query = `select a.assignmentid,m.managername,g.municipality_name,g.region_name,c.age,c.householdnumber,c.income,c.occupation,c.gender,c.ethnicity from geo g join assignments a on a.city=g.municipality_name join manager m on m.region_id=g.regionid join censusdata c on c.assignment_id=a.assignmentid where m.managerid=${managerid};`;
  return new Promise((resolve, reject) => {
    connection.query(census_query, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}
//8.function to read file: locationphotoJSON
function readLocationphoto() {
  const locationphotoFile = fs.readFileSync(locationphotoJSON);
  const locationphotoData = JSON.parse(locationphotoFile);
  return locationphotoData;
}

//9. function to write new data into the locationphoto
function writeLocationPhotoItem(data) {
  const newLocationPhotoData = data;

  const oldLocationPhotoData = readLocationphoto();

  const toWrite = [...oldLocationPhotoData, newLocationPhotoData];
  fs.writeFileSync("./data/locationphoto.json", JSON.stringify(toWrite));
}

//10.function to create new locationphoto in the storage
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
  ); //Received from instructor Ben

////////////////////////////////////////////////////
/////////////////   API ACTIONS   //////////////////
////////////////////////////////////////////////////

// 1. Assignment photo file upload POST method
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
// 2. ADD assignment Logic to be implemented
app.post("/assignment", (req, res) => {
  console.log("posting assignment");
  console.log(req.body);
  console.log(req.body.street);
  console.log(req.body.city);
  console.log(req.body.postalcode);
  console.log(req.body.fieldagent_id);
  console.log(req.body.latitude);
  console.log(req.body.longitude);

  console.log(typeof req.body);
  const query = `insert into assignments (street,city,postalcode,fieldagent_id,latitude,longitude) values ('${req.body.street}','${req.body.city}','${req.body.postalcode}','${req.body.fieldagent_id}','${req.body.latitude}','${req.body.longitude}');`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(400).send("Input expected in the right format");
    } else return res.status(200).send("Assignment aded!");
  });
});
// 3. EDIT assignment Logic to be implemented
app.put("/assignment/:assignmentid", (req, res) => {
  console.log("in the put call");
  const query = `UPDATE assignments SET street = '${req.body.street}', city='${req.body.city}', postalcode='${req.body.postalcode}',latitude='${req.body.latitude}',longitude='${req.body.longitude}', fieldagent_id='${req.body.fieldagent_id}'  WHERE assignmentid= ${req.params.assignmentid};`;
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    return res.status(200).send("Assignment edited!");
  });
});
// 4. DELETE Logic to be implemented: delete data if there is no census data then delete, else say you CANNOT delete
app.delete("/assignment/:assignmentid", (req, res) => {
  console.log("Assignment deleted");
  const query = `DELETE FROM assignments where assignmentid=${req.params.assignmentid}`;
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    return res.status(200).send("Assignment deleted!");
  });
});
// 5. ADD censusdata Logic to be implemented
app.post("/census/:assignmentid", (req, res) => {
  var values = [];
  req.body.map((obj) => {
    let item = [
      req.params.assignmentid,
      obj.age,
      obj.ethnicity,
      obj.gender,
      obj.income,
      obj.occupation,
      req.body.length,
    ];
    values.push(item);
  });
  let query = `insert into censusdata (assignment_id,age,ethnicity,gender,income,occupation,householdnumber) VALUES ?;`;
  connection.query(query, [values], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res
        .status(400)
        .send(
          "Census data already updated for this assignmentID or data sent in wrong format"
        );
    } else return res.status(200).send("Census data for assignment added!");
  });
});
//////////////// AUTHORIZATION  //////////////////
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
// 6. LOGIN END POINT- user login verification
// a protected route, note we are using a second parameter "authorize"
// which is our middleware for authentication
app.post("/login", async (req, res) => {
  ///Q. Adding the authorize cause error, why?

  const { username, password } = req.body;
  const users_db = await getUsers();

  const user = users_db.find((user) => {
    return user.username === username;
  });

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
        role: user.role,
        name: user.name,
      },
      "somesecretstring",
      { expiresIn: "3m" }
    );
    return res
      .status(200)
      .json({ token, role: user.role, id: user.id, name: user.name });
  } else {
    return res.status(403).json({ message: "Invalid username or password" });
  }
});

// 7. Get fieldagent information
app.get("/fieldagent/:id", async (req, res) => {
  const fieldagent_Info = await getFieldagentInfo(req.params.id);
  return res.send(fieldagent_Info);
});

// 8. Get assignments of a field agent
app.get("/fieldagent/:id/assignments", async (req, res) => {
  const fieldagent_Assignments = await getFieldagentAssignments(req.params.id);
  return res.send(fieldagent_Assignments);
});

// 9. Get manager information
app.get("/manager/:id", async (req, res) => {
  const manager_Info = await getManagerInfo(req.params.id);
  return res.send(manager_Info);
});

// 10. Get manager assignments
app.get("/manager/:id/assignments", async (req, res) => {
  const manager_Assignments = await getManagerAssignments(req.params.id);
  return res.send(manager_Assignments);
});

// 11. Get census data and region data for manager
app.get("/manager/:id/census", async (req, res) => {
  const manager_census = await getCensus(req.params.id);
  return res.send(manager_census);
});

// 12. Get particular assignment of field agent for verification

app.get("/verify/:userid/assignment/:assignmentid", async (req, res) => {
  const assignment_verify = await getFieldagentAssignmentVerify(
    req.params.userid,
    req.params.assignmentid
  );
  return res.send(assignment_verify);
});

//app.patch

/////////////////////////////////////////////////////////////////
/////////////   Listening for access on PORT   //////////////////
/////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
