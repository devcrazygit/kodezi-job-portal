# Kodezi Job Portal

This repository contains the showcase of MERN stack for job portal.

There are two roles
- Admin
- Applicant

You can use docker for running

### Installation
First you have to create .env file. Copy the file ".env.example" as ".env"

And please replace your AWS S3 bucket keys in .env file
```
AWS_S3_ACCESS_KEY=<Your access key>
AWS_S3_SECRET_KEY=<Your secret key>
AWS_S3_BUCKET_NAME=<Your bucket name>
```

And `MONGO_CONNECTION_STRING` in .env file should be changed whether you use docker or not.

```
MONGO_CONNECTION_STRING=mongodb://mongo-db:27017  # when you use docker compose
MONGO_CONNECTION_STRING=mongodb://localhost:27017 # your mongodb url
```

If you use docker compose, then please run the following command in project root folder.
```
> docker compose build
> docker compose up
```

If you do not use docker, then you have to install node packages in both `/api` and `/ui` folder

```
> cd ./api
> npm i
> cd ../ui
> npm i
```
and then run both projects.

In `api` project,
```
npm run dev
```

In `ui` project,
```
npm run start
```

As you can see, if you do not use docker, then need more command. So using docker is recommended.



### Seed

For test, you have to seed db at first

```
> cd ./api
> npm ru seed
```

Admin Users (2 admin users)
- admin1@t.com, admin2@t.com
- abcabcabc (password)

There are 500 sample users

Applicant Users email is `t1@t.com`, `t2@t.com` ... `t500@t.com`
and password is `abcabcabc` for all users

There will be several job postings, authored by each of admin users.
And all users are applied to the `Job 1` after db seed.
