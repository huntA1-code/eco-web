
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6fd2c35a-f91f-4da7-99b4-293a269031a3

## Quick Setup for Local Development

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup Steps

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Set up environment variables (optional)
cp .env.example .env.local
# Edit .env.local if you want to configure API endpoints

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Configuration

By default, the application uses mock data for development. This ensures it works immediately without requiring a backend API.

To use a real API:
1. Create a `.env.local` file
2. Set `REACT_APP_API_URL=https://your-api-url.com/api`
3. Remove or set `REACT_APP_USE_MOCK=false`

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6fd2c35a-f91f-4da7-99b4-293a269031a3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6fd2c35a-f91f-4da7-99b4-293a269031a3) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Troubleshooting

If you're experiencing issues:

1. **Network Errors**: The app uses mock data by default. If you see network errors, make sure you have `REACT_APP_USE_MOCK=true` in your `.env.local` file.

2. **Dependencies Issues**: Try deleting `node_modules` and running `npm install` again.

3. **Port Issues**: If port 8080 is busy, the dev server will automatically use another port.

4. **Build Issues**: Make sure you're using a compatible Node.js version (16+ recommended).
