import React from 'react'
import Head from 'next/head'

import { MongoClient, ObjectId } from 'mongodb'

import MeetupDetail from '../../components/meetups/MeetupDetail'

const MeetupDetails = (props) => {

    return (<>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={`This is about ${props.meetupData.title} meetup`} />
        </Head>
        <MeetupDetail image={props.meetupData.image} title={props.meetupData.title} address={props.meetupData.address} description={props.meetupData.description} />
    </>
    )
}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.e1c4w.mongodb.net/meetups?authSource=admin&replicaSet=atlas-kkgn0z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })
    client.close();
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://root:root@cluster0.e1c4w.mongodb.net/meetups?authSource=admin&replicaSet=atlas-kkgn0z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
    };
}

export default MeetupDetails


// getStatisProps - pregenerates the page for all the possible id so that it can be rendered before the request comes in

// getStaticPaths - provides the server the data for which the server must pregenerate the oages (i.e) for the dynamic set of ids, so that it will generate the pages in the server.  The fallback is an option that tells whether thw paths contain all the valus or only some possible values