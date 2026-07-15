# Angel Number Calculator - System Architecture

## 1. Directory Structure & Layout
The application uses **TanStack Start** with file-based routing.

### Key Paths (TanStack Start)
* `/app/routes/__root.tsx`: Core layout, styles, global elements. Manages Theme Provider (Light/Dark toggler, defaulted to Light).
* `/app/routes/index.tsx`: Tier 1 Core interactive calculator, plus extensive SEO articles, calculation examples, and FAQ sections.
* `/app/routes/result.tsx`: Dynamically computed calculation results (NOINDEX). Features client-side fetching to the AI Server Function.
* `/app/routes/angel-number.$number.tsx`: Tier 2 SEO detail page. Supports 64 popular search sequences.
* `/app/routes/what-does-$number-mean.tsx` / `/app/routes/why-am-i-seeing-$number.tsx`: Tier 3 SEO detail Q&A pages.

### Public Assets & SEO Compliance
* `/public/google7cfc68ab913bcd14.html`: Required search console verification code.
* `/public/robots.txt`: Crawling configuration allowing search bots.
* `/public/sitemap.xml`: Full site index indexing the homepage and all 64 Tier 2 angel number detail routes.

## 2. Database Schema
For a free open tool, we simplify the relational model to two tables: `user_calculations` and optionally `email_leads`.

```sql
-- Track user calculations for SEO and usage analysis
CREATE TABLE user_calculations (
    id BIGSERIAL PRIMARY KEY,
    session_id VARCHAR(255),
    name VARCHAR(255),
    birthday DATE,
    focus_area VARCHAR(50),
    name_number INT,
    life_path_number INT,
    personal_vibration INT,
    angel_number VARCHAR(10),
    country_code VARCHAR(10),
    language VARCHAR(10),
    device_type VARCHAR(20),
    utm_source VARCHAR(100),
    utm_campaign VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Store opt-in newsletter subscribers (if user elects to sign up for weekly guides)
CREATE TABLE email_leads (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    calculation_id BIGINT REFERENCES user_calculations(id),
    angel_number VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 3. Simplified Funnel Flow with AI Reading
1. **Interactive Entry**: User fills in their Name, Birthday, and Focus Area on the homepage.
2. **Animation**: 3-second cosmic particle loading experience.
3. **Instant Results**: Results are displayed immediately without any block.
4. **AI Processing**:
   * On mount, `/result` checks `localStorage` for a cached reading matching the user's name, birthday, and focus.
   * If a cache exists, it renders immediately.
   * If no cache exists, the frontend displays an elegant shimmer skeleton and triggers the `generateAIReading` server function.
   * The server function formats the prompt, calls SiliconFlow, enforces the compliance guidelines, and streams back the response.
   * The frontend caches and renders the text.
5. **Subscription (Opt-in)**: At the bottom of the result page, a newsletter card invites users to opt-in for monthly astrology and angel number vibration guides.
