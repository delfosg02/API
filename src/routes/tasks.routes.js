import {Router} from 'express'  //importando de express la funcion Router para exportar
const router = Router();

import {connect} from  '../database'
import { ObjectID } from "mongodb";
import app from '../server';

router.get('/', async (req, res) => {            //desde esta ruta exportada estamos requiriendo nuestra db            
    const db = await connect();             //usamos el await para darle el sentido de funcion asincrona ya que en la realidad son funciones mas lentas 
    const result = await db.collection('tasks').find({}).toArray();  //
    res.json(result);      //esto devuelve al usuario los resultados solicitados de la db 

   router.post('/', async (req, res) => {
    const db = await connect();
    const task = {
      title: req.body.title,
      description: req.body.description 
    };
    
    const result = await db.collection('tasks').insertOne(task);
    res.json (result.ops[0]); //desde la propiedad ops del resultado solo quiero ver el valor 0
   }); 

   router.get('/:id', async (req, res) => {
     const { id } = req.params;
     const db = await connect();
     const result = await db.collection('tasks').findOne({ _id: ObjectID(id) });
     res.json(result);
   }); 

   router.delete('/:id', async (req, res) => {
     const { id } = req.params;
     const db = await connect();
     const result = await db.collection('tasks').deleteOne({_id: ObjectID(id)});
     res.json({
       message: 'Task ${id} deleted',
       result
     })
     
    });

    router.put('/:id', async (req, res) => {
      const { id } = req.params
      const updateTask = {
        title: req.body.title,
        description: req.body.description
      };
      const db = await connect();
      await db.collection ('tasks').updateOne({_id: ObjectID(id)}, { $set: updateTask });
      res.json ({
        message: `Task ${id} update`
      });
    });

 });

 export default router;   