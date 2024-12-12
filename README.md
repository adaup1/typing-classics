# Typing Classics

A web application that allows users to practice typing while reading classic literature from the public domain.

Go to https://typingclassics.com to try it out!

## Features

- Type along to complete books from the public domain
- Real-time statistics including WPM, accuracy, and progress
- Support for special characters with "Easy Special Characters" mode
- Responsive design for both desktop and mobile
- Book cover image generation for texts without covers
- Auto-pause functionality after 2 seconds of inactivity

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
POSTGRES_URL="your_postgres_connection_string"
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [next-yak](https://github.com/jantimon/next-yak) - Styling solution
- [Vercel Postgres](https://vercel.com/storage/postgres) - Database
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography (Roboto Mono, Raleway, Nunito Sans)

## Features in Development

- User accounts for progress tracking
- Book request system
