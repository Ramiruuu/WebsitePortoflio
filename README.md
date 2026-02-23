# 🌐 Remar Gonzaga Oclarit — Personal Portfolio Website

A personal portfolio website built with HTML, CSS, and vanilla JavaScript. It showcases my background, education, skills, projects, and courses taken as a BS Information Technology student at the University of Science and Technology of Southern Philippines (USTP).

---

## 📸 Preview

> Live Site: [https://ramiruuu.github.io/WebsitePortoflio]([https://ramiruuu.github.io/WebsitePortoflio](https://website-portoflio-gamma.vercel.app/))

---

## ✨ Features

- **Hero Section** — Introduction with social media links (GitHub, Facebook, Instagram, LinkedIn)
- **About Section** — Personal info, contact details, and portrait
- **Education Section** — Academic background displayed as cards
- **Courses Taken** — Dynamically fetched from a hosted JSON file on GitHub, grouped by year level and semester, with animated subject cards and a live search bar
- **Skills Section** — List of technical and soft skills
- **Projects Section** — Showcases real projects with live links
- **Contact Form** — Simple form for reaching out
- **Fully Responsive** — Works on desktop, tablet, and mobile

---

## 🛠️ Built With

- **HTML5** — Semantic markup
- **CSS3** — Custom styling, Flexbox, CSS Grid, animations
- **Vanilla JavaScript** — DOM manipulation, Fetch API, dynamic rendering
- **Google Fonts** — Inter & Playfair Display
- **GitHub Pages** — Hosting
- **allorigins.win** — CORS proxy for fetching the JSON file

---

## 📁 Project Structure

```
WebsitePortoflio/
├── index.html
├── assets/
│   ├── css/
│   │   ├── styles.css        # Main styles for all sections
│   │   └── courses.css       # Styles for courses section & search bar
│   ├── js/
│   │   └── courses.js        # Fetches and renders courses from JSON
│   ├── images/
│   │   ├── background.png
│   │   ├── idpicture.png
│   │   ├── rotaknows.png
│   │   ├── sarapsacdo.png
│   │   └── subnet.png
│   └── jsonfiles/
│       └── courses.json      # Course data (year level, semester, code, description, units)
```

---

## 📦 courses.json Format

The courses are fetched dynamically from:
```
https://raw.githubusercontent.com/Ramiruuu/WebsitePortoflio/main/assets/jsonfiles/courses.json
```

Each course entry follows this structure:
```json
{
  "year_level": "1st",
  "sem": "1st",
  "code": "IT111",
  "description": "Introduction to Computing",
  "credit": "3"
}
```

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Ramiruuu/WebsitePortoflio.git
   ```

2. Open `index.html` in your browser — no build tools or dependencies required.

> **Note:** The courses section fetches data via a CORS proxy. Make sure you have an internet connection for it to load.

---

## 🔍 Courses Search Feature

The Courses section includes a **live search bar** that filters subjects dynamically as you type. It matches against both the subject **code** and **description**, highlights the matching keyword inside the card, and hides year/semester blocks that have no matching results.

---

## 📬 Contact

**Remar Gonzaga Oclarit**
- 📧 oclaritremar25@gmail.com
- 📞 0965-042-3556
- 📍 Cagayan de Oro City, Philippines
- 🔗 [LinkedIn](https://www.linkedin.com/in/oclarit-remar-986828350)
- 🐙 [GitHub](https://github.com/Ramiruuu)

---

## 📄 License

This project is open source and available for reference and learning purposes.
