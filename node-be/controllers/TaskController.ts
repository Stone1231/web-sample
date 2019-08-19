import Service from '../services/TaskService';
/* app/controllers/welcomeController.ts */

// Import only what we need from express
import { Router, Request, Response } from 'express';
//import {raw, json, text, urlencoded, ParsedAsJson, ParsedAsText, ParsedRaw, ParsedAsUrlencoded} from 'body-parser';
import * as bodyParser from 'body-parser';

import Row from '../entity/Task'

import * as express from 'express';

//import * as cors from 'cors'

// Assign router to the express.Router() instance
let router: Router = Router();
//let router: express.Application = express();

router.use(bodyParser.json());
//router.use(cors());

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/',async (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided

    const result = await Service.all({ offset: 0, limit: 10 });

    res.send(result);
});

router.post('/',async (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    
    var row:Row = req.body;
   
    const result = await Service.add(row);

    res.send(result);
});

router.put('/:id',async (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided

    let id = req.param("id"); 
    var row:Row = req.body;
    row.id = +id;
   
    const result = await Service.update(row.id, row);

    res.send(result);
});

router.delete('/:id',async (req: Request, res: Response) => {
    // Extract the name from the request parameters
    
    //let { name } = req.params;
    let id = req.param("id");

    const result = await Service.delete(+id);

    res.send(result);
});

router.get('/:id',async (req: Request, res: Response) => {
    // Extract the name from the request parameters
    
    //let { name } = req.params;
    let id = req.param("id");

    const result = await Service.get(+id);

    res.send(result);
});

//router.use(cors());

// Export the express.Router() instance to be used by server.ts
export const TaskController: Router = router;