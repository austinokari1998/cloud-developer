import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import * as HttpStatus from 'http-status-codes';

const isImageUrl = require('is-image-url');


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/imagefiltering", async ( req:Request, res:Response ) => {
    let image_url = req.query.image_url;
    if (!image_url) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: 'Please include an image URL ' });
    }
    if (!isImageUrl(image_url)) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: 'The image URL is invalid' });
    }
    let filtered_image_url = await filterImageFromURL(image_url);
    res.sendFile(filtered_image_url , () =>
        deleteLocalFiles([filtered_image_url])
    );
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req:Request, res:Response ) => {
    res.send("try GET /imagefiltering?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();