My StyleShop Project

📌 Overview

This is a Next.js project built using TypeScript and styled with Tailwind CSS. The project ensures a high-quality frontend implementation with a focus on UI design, responsiveness, and user experience.

🚀 Setup & Running Locally

Prerequisites

Ensure you have the following installed:

Node.js (v18+ recommended)

Yarn or npm

Installation & Running the Project

Clone the repository:

git clone https://github.com/ABHIKALVIUM/main-intern.git

cd main-intern

Install dependencies:

npm install

Build the project:

npm run build

Start the production server:

npm run start

Open http://localhost:3000 in your browser to see the app.

🎨 Design Choices

1. Next.js & TypeScript

Next.js is chosen for its SSR (Server-Side Rendering) and ISR (Incremental Static Regeneration) capabilities.

TypeScript ensures type safety and maintainability.

2. Tailwind CSS

Utilized for utility-first styling.


🔥 Challenges Faced & Solutions

1. Implementing Barcode Scanning

Challenge: Ensuring the barcode scanner worked across different devices.

Solution: Used a third-party library and handled camera permissions properly.

2. Managing Complex Forms

Challenge: Handling deeply nested form fields efficiently.

Solution: Used React Hook Form for schema validation and form handling.

3. Performance Optimization

Challenge: Reducing unnecessary re-renders and optimizing images.

Solution: Used Next.js Image Optimization and Memoization.

