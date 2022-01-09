import { MongoClient } from 'mongodb'

// /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.e1c4w.mongodb.net/meetups?authSource=admin&replicaSet=atlas-kkgn0z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        client.close();

        res.status(201).json({ message: "meetup inserted successfully" });
    }
}

export default handler;