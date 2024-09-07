const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');

dotenv.config();

const ambiente = process.env.AMBIENTE.toUpperCase();

const client = new MongoClient(process.env.DB_URL);

const database = client.db('Teste-IOT');

async function mongoConnect() { 
    try{
        if (!client.connected) { 
            await client.connect(); 
            console.log('Conexão com o banco de dados estabelecida com sucesso!'); 
        }        
    }catch(error){
        console.log('Ocorreu um erro durante a conexão como banco de dados!', error)
    }
}

async function mongoDisconnect(){  
    try{
        if (client.connected) { 
            await client.close(); 
            console.log('Conexão com o banco de dados fechada com sucesso!'); 
        }        
    }catch(error){
        console.log('Ocorreu um erro ao fechar a conexão com banco de dados!', error);
    }
}

function getClient() { 
    return client; 
}

function getDatabase(db) { 
    if (!db){
        return database;        
    }    

    return client.db(db); 
}

async function getCollection(collection, db) { 
    let dbName = db;

    const database = getDatabase(dbName);
    
    const collections = await database.listCollections({name: collection}).toArray();

    if (collections.length > 0) { 
        return database.collection(collection); 
    }

    const newCollection = await database.createCollection(collection, { capped: false });

    return newCollection; 
}

module.exports = { 
    mongoConnect, 
    mongoDisconnect, 
    getClient, 
    getDatabase, 
    getCollection, 
    ObjectId 
};
