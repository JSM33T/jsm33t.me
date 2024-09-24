# JSM33T's web space 1.0.0

## Intro

Some web space intro to check deployment triggers

## Account (W.I.P)

### Auth

You can authenticate using following methods to the app to perform some member only actions like commenting on blogs,Liking blogs, Direct messaging e.t.c

- ✅ Login via Email
- 🔘 Login via Google

### Preferences

You have the following provisions for your account

- Change username, Firstname, Lastename etc except Email.
- Username that is already reserverd can not be used further

### Data

You have the provision to get all the data of yours i own. Icluding the data you have input + the google account name,avatar.

Your accounts are public and so is your public facing data like (username,firstname, lastname, avatar). Your crucial informtion like your email will remain private unless you choose to make ti public.

### Roles and Exp

You will be given the role of author if you have an article published in my portal, Authors can see their blog like and comments/replies' stats.

Your time on the app is recorded as exp points are given accordingly. If you have spent a good amount of time you will receive goodies earlier thn other people.

## Submission

### Blog

You can submit your blog by any means,provide me the markdown, images or any relevant information in the mail ```mail@jsm33t.me```

## Technical Details

### Tech stack

#### Frontend

- Framework - Angular 18 (stand alone)
- UI - Official BS 5 UI Kit called 'Around' The style file is excluded from the source code in github.
- Vendor libraries- Lightgallery,Parallax-js,Imagesloaded,AOS

#### Backend

The whole backend runs in .NET Web API powered by C#.

#### Database

- MSSQL Server
- Data is also served by json and md files for blogs and galleries

### Servers

#### Preview : ```jsm33t.vercel.app```

Preview of new UI features added befroe they come to the main server.

#### UI : ```jsm33t.me```

Main UI server that.

#### API : ```api.jsm33t.me```

API server for al the crucial backend operations.

#### CDN : ```cdn.jsm33t.me```

CDN server to serve all the assets (files, archives, images,markdowns etc).

The CDN files are not available in source code

All three servers (except the preview) need to be accessible for the app/site to work properly.
