# 🛒 বাংলা বাজার


প্রয়োজনীয় পণ্যের আজকের দাম এক নজরে। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক দাম, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।



## ✨ Features

1. 📈 **দামের ওঠানামা:** আজ কোন ৬টি পণ্যের দাম সবচেয়ে বেশি বেড়েছে বা কমেছে তা আলাদা section-এ দেখা যায়।
2. 🎞️ **Live Price Ticker:** পণ্যের নাম, দাম ও ▲/▼ শতাংশসহ অনন্ত চলমান ticker strip।
3. 🗂️ **ক্যাটাগরি পাতা ও সাজান:** ৮টি ক্যাটাগরি, দাম অনুযায়ী (কম→বেশি, বেশি→কম) সাজানো যায়। বাংলা সংখ্যার বদলে আসল সংখ্যা ধরে sort হয়।
4. 🏪 **বাজারভিত্তিক বিস্তারিত:** প্রতিটি পণ্যের ১২টি বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দামের table (Protected Route)।
5. 🔐 **Authentication:** BetterAuth দিয়ে Email/Password, Google ও GitHub login, toast বার্তাসহ।
6. 👤 **প্রোফাইল ও তথ্য আপডেট:** ব্যবহারকারীর নাম বদলানো যায়।
7. 📱 **সম্পূর্ণ Responsive:** মোবাইল, ট্যাবলেট ও ডেস্কটপে সঠিকভাবে চলে, Skeleton loading ও ৪০৪ পাতাসহ।

## 🛠️ Technologies Used

| প্রযুক্তি | কাজ |
|---|---|
| Next.js (App Router) | UI ও routing |
| TypeScript | টাইপ নিরাপত্তা |
| Tailwind CSS + DaisyUI | Styling ও responsive design |
| BetterAuth | Authentication |
| MongoDB Atlas | ব্যবহারকারীর তথ্য সংরক্ষণ |
| react-hot-toast | Toast বার্তা |
| Vercel | Deployment |





## 🔌 API

`/products`, `/products?category=chal`, `/products/:id`, `/categories`, `/categories/:slug`

