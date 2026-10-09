# CarKino.com

> **CarKino.com** — Used-Car Buy and Sell Marketplace (Version 1.0 MVP)

CarKino is an online automotive marketplace where private sellers and verified dealers list used cars, and buyers search, compare, and contact sellers directly with zero fraud risk and instant valuation.

---

## 🚀 Features

* **Landing Page**: Modern high-fidelity UI with alternating dark/light luxury styling.
* **Search & Browse Catalog (`/cars`)**: Full filters (Make, Model, Price, Body Type, Fuel, Transmission, City) with Grid/List view and sorting.
* **Vehicle Comparison Matrix (`/compare`)**: Side-by-side comparison for up to 3 cars with detailed spec matrix and contact actions.
* **Auto Finance & EMI Calculator (`/financing`)**: Interactive slider tool for calculating monthly installments, loan amounts, and bank interest comparisons.
* **Post an Ad**: Multi-step ad submission with photo upload and phone OTP verification.
* **Admin Moderation Panel (`/admin`)**: Fraud detection, photo verification checks, and one-click Approve/Reject queue.
* **Seller & Dealer Dashboard (`/dashboard`)**: Inventory management with real-time views, direct WhatsApp/phone leads, and featured boosts.
* **REST API (`/api/cars`)**: REST API route for inventory listings.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **State Management**: React Context with LocalStorage persistence

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or port 3001) in your browser.
