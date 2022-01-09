import React, { useState } from 'react'
import Head from 'next/head'
import MeetupList from './../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

// const meetups = [
//     {
//         id: 'm1',
//         titel: 'Big ben',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/1280px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg',
//         address: 'London, UK',
//         description: 'This is a sample meetup',
//     },
//     {
//         id: 'm2',
//         titel: 'Marina Beach',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Chennai_-_bird%27s-eye_view.jpg/1280px-Chennai_-_bird%27s-eye_view.jpg',
//         address: 'Chennai, Tamil Nadu',
//         description: 'This is a sample meetup',
//     }
// ];



const index = (props) => {
    return (<>
        <Head>
            <title>Meetups</title>
            <meta name="description" content="Browse a huge list is highly active meetups list" />
        </Head>
        <MeetupList meetups={props.meetups} />
    </>
    )
}

// export async function getServerSideProps(context) {

//     const req = context.req;
//     const res = context.res;

//     return {
//         props: { meetups }
//     }
// }

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.e1c4w.mongodb.net/meetups?authSource=admin&replicaSet=atlas-kkgn0z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10 // seconds
    }
}

export default index
