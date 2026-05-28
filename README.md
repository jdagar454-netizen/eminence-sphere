# Eminence Sphere — Consulting & Business Services

Welcome to the official repository for **Eminence Sphere Consulting & Business Services**, deployed live on GitHub Pages with a custom domain configuration.

## Live Website

- **Production URL**: [https://eminencesphere.online](https://eminencesphere.online)
- **Deployment URL**: [https://jdagar454-netizen.github.io/eminence-sphere/](https://jdagar454-netizen.github.io/eminence-sphere/)
- **Hiring Pipeline Admin Dashboard**: [https://eminencesphere.online/pipeline.html](https://eminencesphere.online/pipeline.html)

---

## Key Features

1. **Enterprise Careers Portal (`careers.html`)**
   - Displays career opportunities and placement pathways.
   - Allows candidates to submit profiles to the talent pool via the virtual recruitment assistant.

2. **AI Recruitment Chatbot Assistant (`js/chatbot.js` & `css/chatbot.css`)**
   - Interactive chat widget embedded globally across all website pages.
   - Collects candidate profiles (name, email, phone, role, experience, resume/skills link) via a guided conversational flow.
   - Automatically populates the candidate database on completion.
   - Features choice-chip triggers, typing indicators, auto-scroll, validation, and profile download options.

3. **Recruitment Pipeline Admin Dashboard (`pipeline.html`)**
   - Admin console for HR managers to view, search, filter, and delete registered candidates.
   - Outputs metrics on candidate demographics (Total applicants, Engineering applicants, Consulting applicants, and last submission timestamp).
   - Enables downloading structured applicant transcripts as JSON files.

4. **Premium UI/UX Design System**
   - Built on a modern dark-mode palette: deep space navy (`#07091C`) coupled with rich accents of gold (`#C9A84C`) and blue glow parameters.
   - Implements glassmorphism cards, blur backdrop filters, custom input styling, responsive menus, and hover animations.

5. **SEO & Accessibility Optimized**
   - Full responsive layout for mobile and desktop viewports.
   - Configured open-graph tags, canonical links, descriptive page titles, and web app manifest details.

---

## Tech Stack & Architecture

- **Frontend**: Semantic HTML5, Vanilla CSS3 (Custom design system variables, grids, and flexbox), ES6 Vanilla JavaScript.
- **Data Persistence**: Client-side `localStorage` (`eminence_candidates` key) for decentralized candidate processing.
- **Hosting**: GitHub Pages with a custom CNAME mapping to `eminencesphere.online`.

---

## DNS Configuration (Hostinger)

To route your domain `eminencesphere.online` to this repository, the following DNS records are configured:

### 1. Root A Records (`@`)
Point these to GitHub Pages IP addresses:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### 2. Subdomain CNAME Record (`www`)
Point this to your GitHub user pages endpoint:
- `jdagar454-netizen.github.io`
