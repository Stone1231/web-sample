/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';

// Import WecomeController from controllers entry point

import {TestController, TaskController} from './controllers';

import * as cors from 'cors'

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: number = process.env.PORT || 8080;

// Mount the WelcomeController at the /welcome route
app.use(cors());
app.use('/test', TestController);
app.use('/task', TaskController);
//app.options('*',cors());

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});