### The Hot Discord Cards Project

> One of the trading card games of all time. Also a social media platform, I guess.

---

###### WHAT IS THIS?

Hot Discord Cards (working title) is a web platform developed by [Mike Ploythai](https://github.com/mploythai) and [Shaleen Mathur](https://github.com/shaleen23) for our Software Engineering course at Cal State Fullerton.

The idea stemmed from the desire to create an interactive app that revolved around our friends, hence why we refer to this project as a _love letter to our friends_. As development continued, the idea evolved into a platform where users can earn points, and use those points to unlock cards at random. These cards represent our friends in funny ways, and can be traded with other users.

The purpose of this project is just to get a laugh out of our friends, and to show the gratitude we have towards them.

###### HOW TO RUN LOCALLY

0. You must have a Supabase account and a Discord developer account.

   - In your Discord developer portal, create an app. You may name this app whatever.
   - In the app's settings, go to `OAuth2` to retrieve your app's **client ID** and **client secret**
   - In a new tab, create a Supabase project, and go to the authentication settings.
     - In your authentication settings, scroll to the Discord option, enable it, paste the **client id** and **client secret** in the proper fields.
     - Finally, copy the **callback URL** and paste it into the Supabase Discord auth settings.

1. In Supabase, create 3 tables: `profiles`, `owners`, and `cards`.

   - In a future update, we will provide .csv templates for you to import to fill theses tables properly.

2. Next, create a storage bucket in Supabase called `cards`. This is where you'll upload your images for the cards.

3. With your backend set up, you may now open up the code.
   - First, in the `.env.local` file, input the **Supabase URL** and **Supabase anon key**, which are provided in your Supabase project settings.
     - NOTE: Don't forget to add `.env.local` to `.gitignore` to protect your keys from being exposed if you wanted to host your own instance online.
   - Next, with **Node.js** installed, install the dependencies using `npm i`
   - Finally, start up the local server with `npm run dev`

###### FEATURES (UPDATED 12/08/2022)

- [x] Profile customization (username, bio)
- [x] Clicker game to earn virtual currency called dabloons
- [x] Use points to unlock common, rare, super rare, mega rare cards
- [x] Discard owned cards to each dabloons back
- [x] View card stats
- [x] View other users' profiles
- [x] Global leaderboard for users to compete for the most amount of clicks globally

###### CREDITS

This project wouldn't be possible with our lovely tech stack ([Next.js](https://nextjs.org), [Chakra UI](https://chakra-ui.com), [Supabase](https://supabase.com)) and our [wonderful friends](https://github.com/mploythai/hot-discord-cards/ACKNOWLEDGEMENTS.md) who let us use their faces!

---

Discord pls don't sue us we swear we'll change the name eventually.
