To run the app:

1. Provide DB url in .env file, using MongoDB
2. Run `npm install`
3. Run `npm run start:dev`

Routes:

To register use:
POST on `localhost:3000/auth/register`
Body:
{
"email": "email",
"password": "password"
}

To login use:
POST on `localhost:3000/auth/login`
Body:
{
"email": "email",
"password": "password"
}
Responce:
{
"token": "token"
}

To create referral link use:
POST on `localhost:3000/referral`
You need to add Bearer token.
Responce:
{
"referralLink": "localhost:3000/referral/bab6ab03-25d3-4a6d-8bed-b169af89af45"
}

When following a referral link, a cookie file with an identifier is saved and a redirect to the registration route occurs.
GET on `localhost:3000/referral/bab6ab03-25d3-4a6d-8bed-b169af89af45`

To get referral statistic use:
GET on `localhost:3000/referral/statistic`
You need to add Bearer token.
Responce:
{
"registred": 1,
"viewed": 4
}

To delete referral link use:
DELETE on `localhost:3000/referral/`
You need to add Bearer token.
