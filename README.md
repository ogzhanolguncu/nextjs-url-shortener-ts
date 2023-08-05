# Url Shortener

## Simple url shortener with NextJS13 App Router, Typescript, Upstash Redis, Tailwind

Idea behind this project to create a simple url shortener with least amount of clutter with latest technologies.
Only has shortening url, redirecting to original url and showing the recently shortened urls based on cookie of the user.

## Running the app

[Live App](https://nextjs-url-shortener-ts.vercel.app/)

In order to run the you need couple of api keys. Create a .env file with these configs in it:

```bash
UPSTASH_SECRET_URL="--"
UPSTASH_SECRET_TOKEN="--"
```

For Redis, you can use Upstash Redis and create redis db, and just copy the keys to .env file.
Finally,

```bash
npm run dev
```

## Tech Stack

- NextJS13 App Router
- Typescript
- Redis - Upstash Redis
- Tailwind
- Vitest

## Feedback

If you have any feedback, please reach out to me or feel free to open up an issue.
