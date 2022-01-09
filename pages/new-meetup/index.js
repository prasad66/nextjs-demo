import { useRouter } from 'next/router';
import Head from 'next/head'
import React from 'react'

import NewMeetupForm from './../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {

    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup/', {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data);
        router.replace('/');

    }

    return <>
        <Head>
            <title>Add Meetup</title>
            <meta name="description" content="Add a meetup to the list of meetups" />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>

}

export default NewMeetupPage
