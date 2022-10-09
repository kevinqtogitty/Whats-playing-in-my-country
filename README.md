# What's Playing in My Country?

An SPA to solve the dreaded paralysis by analysis of streaming services

## Table of Contents

- [About](#about)
- [Tools](#tools)
- [Features](#features)
- [What did I Learn?](#lessons)
- [Future Plans](#future)


## About

Bouncing between streaming services to find the 'right' thing to watch? Hours suddenly passed by and still you haven't decided?
This is what "What's Playing in My Country?" aims to solve. Paralysis by analysis. 

It queries TMDB for 20 of the latest films (and upcoming ones), from all the streaming service providers from the country the user chooses.
It also includes movies only released in theatres.

## Tools

- Vite
- Typescript
- React
- NodeJS/Express
- Firebase
- Axios
- Context API
- Styled Components

## Features

1. User can create an account or login into an existing one by signing up with email or gmail portal. This is done with Firebase Auth and Firestore
2. User can save/delete movies to their watchlist, which is stored into their user profile in FireStore
3. User can delete their account
4. User can reset a forgotten password
5. New movies are shown and updatedly automatically as TMDB is updated. Once the movie is gone it is gone, to prevent more searching/browsing.
6. Click on the movie poster to open a modal with the following:
    - Where to Rent (based on your country)
    - Where to Stream (based on your country)
    - Release Date (based on your country)
    - Cast/Crew/Director
    - Rating
    - Synopsis
    - Trailers/BTS
    - TMDB User reviews

## Lessons

1. Understanding Auth routes
2. How to store users & their data in NoSQL DB
3. Mobile first design
4. Familiarity with Googles Firebase services
5. Using Context API to share user login state/country data for making requests

## Future

1. Migrating from a single Context Store to Redux Toolkit for better state management
2. Allowing the user to save movies from their watchlist to a favorites list
3. Allowing the user to add notes to movies
4. Allowing the user to mark films watched without removing them from their watchlist

