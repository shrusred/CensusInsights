const express = require("express");
// path is used for filesystem methods
const path = require("path");
// body-parser is used to parse the body of the image being sent
const bodyparser = require("body-parser");
// uuidv4 is used to generate unique IDs
const { v4: uuidv4 } = require("uuid");
/*
  "file-type" is used to quickly find the type of a file from the buffer.
  
  However the package does not support commonJS (require syntax vs import syntax), so I am using dynamic imports to load the appropriate method

  See this S/O question for more info: https://stackoverflow.com/questions/57169793/error-err-require-esm-how-to-use-es6-modules-in-node-12
*/
const fileTypeFromBuffer = (...args) =>
  import("file-type").then(({ fileTypeFromBuffer }) =>
    fileTypeFromBuffer(...args)
  );

// used for writing files to the server's filesystem
const { writeFileSync } = require("fs");

const app = express();

const PORT = 8080;

// route handler for serving the client side of the application "http://localhost:8080/ will serve index.html"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// route specifically used to accept new images
app.post(
  "/api/image",
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
  }),
  // route handler
  async (req, res) => {
    console.log("request received", req.body);

    // determine file type (ex. png)
    const fileType = await fileTypeFromBuffer(req.body);
    console.log("type", fileType);

    // save the image to the server's filesystem with a unique name using the fileType extension
    // writeFileSync(`./${uuidv4()}.${fileType.ext}`, req.body);

    const imgpath = `./images/${uuidv4()}.${fileType.ext}`; //this could be the image path that is stored in the db
    writeFileSync(imgpath, req.body);

    // just sending a generic 200 response. You could send whatever you want here
    res.status(200).send("ok");
  }
);

app.listen(PORT, () => console.log("listening on port", PORT));

//save the image on the file system - backend folder called images; store in the db the info needed to retrieve that image; store image path key
//save image to disk or some disk -> save path of image to the database
