# UCLInsights
A full-stack web app that scrapes and presents match statistics for over 1,000 UEFA Champions League players across six stat categories, giving fans a dynamic, filterable view of the tournament.

<img width="1889" height="999" alt="Screenshot 2026-05-02 194822" src="https://github.com/user-attachments/assets/500bf46d-ace7-4292-87d1-a244f8aea1aa" />


## How It Works
 
The scraper fetches all six stat categories in parallel, paginates through the full player list, and writes a CSV per category. These are loaded into PostgreSQL and served through a REST API consumed by the React frontend.

## Features
 
- Six stat dashboards: Goals, Attempts, Attacking, Distribution, Defending, Disciplinary
- Filterable tables by player name, team, nationality, and position
- Interactive Recharts visualisations on every page
- Player modals with full stat breakdowns

## Tech Stack
 
| Layer     | Technology                                 |
|-----------|--------------------------------------------|
| Scraper   | Python, `requests`, `concurrent.futures`   |
| Database  | PostgreSQL                                 |
| Backend   | Java, Spring Boot, Spring Data JPA, Maven  |
| Frontend  | React, React Router, Recharts, Vite        |
 
