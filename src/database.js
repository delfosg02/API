import MongoClient from 'mongodb';    

export async function connect() {                                          
    try {                                                 //para manejar funciones con async y await se utiliza el try y catch
        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useNewUrlParser: true, useUnifiedTopology:true 
        });
        const db = client.db('mi-base-de-datos');
        console.log('DB is connected');
        return db;
    }  catch(e) {
        console.log(e);
    } 
}