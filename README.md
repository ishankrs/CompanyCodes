# CompanyCodes

CompanyCodes is a community-driven platform that helps candidates discover **interview questions asked by specific companies**, aggregated from public sources and user submissions.

The goal is to make interview preparation **more transparent, data-informed, and company-focused**, without paywalls or dark patterns.

---

## ✨ What CompanyCodes Does

- 🔍 Search interview questions **by company**
- 📊 See **question frequency** across companies
- 🧠 Discover commonly repeated interview patterns
- ✍️ Contribute questions you’ve seen in real interviews
- 🌍 Fully open-source and community-driven

The platform prioritizes **data quality**, **clarity**, and **fair access**.

---

## 🧱 How the Data Is Structured

CompanyCodes separates data into clear layers to keep the dataset reliable:

### Canonical Dataset (Read-Only)
- Curated questions
- Company ↔ question mappings
- Frequency signals
- Publicly searchable

### Community Submissions
- Public users can submit questions
- Submissions are **rate-limited**
- Nothing goes directly into the main dataset

### Moderation Layer
- All submissions are reviewed by an admin
- Approved items are staged before merging
- Prevents spam and low-quality data

---

## 🔐 Authentication (To be implemented in future for cross device progress savinf)



---

## Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase (Postgres)
- **Hosting:** Vercel (planned)



---

## 🚀 Planned Features

The roadmap includes (but is not limited to):

- Bookmarks / starred questions
- Progress and filters
- Duplicate detection during moderation
- Company-level analytics and trends
- Public data export (CSV / JSON)

All features will follow the same principles:
**transparent, optional, and user-respecting**.

---

## 🤝 Contributing

CompanyCodes is open to contributions.

Ways to help:
- Improve UI/UX
- Optimize search and performance
- Improve moderation workflows
- Add documentation
- Suggest features or report issues

Contribution guidelines will be added as the project evolves.

---

## ⚠️ Disclaimer

CompanyCodes is **not affiliated with any company or interview platform**.

All questions are either:
- Publicly available
- Submitted by users from memory

Content may be incomplete or outdated. Always verify with official sources.

---

## 📄 License

MIT License — free to use, modify, and distribute.
