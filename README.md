# DineMark App

This is a simple web application that allows users to view a list of restaurants and mark them as favorites. The application is built with Next.js, React, TypeScript, tRPC, and Prisma.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your PostgreSQL database and update the `DATABASE_URL` in the `.env` file
4. Apply the database schema:
   ```
   npx prisma db push
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Usage

- View the list of restaurants on the home page
- Click the heart icon to mark a restaurant as a favorite

## Technologies Used

- Next.js
- React
- TypeScript
- tRPC
- Prisma
- PostgreSQL

## API Endpoints

The application uses tRPC for API communication. The following procedures are available:

- `getRestaurants`: Retrieve all restaurants, can be filtered by search text and/or categories.
- `toggleFavorite`: Mark a restaurant as a favorite.
