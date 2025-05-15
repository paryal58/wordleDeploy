# Wordle Clone 

Welcome to Wordle Clone, a simple implementation of the popular Wordle game. This project features a JavaScript frontend paired with a Spring Boot backend to implement an interactive word-guessing game with persistent player scores and a competitive leaderboard.

This Spring Boot backend handles:

- RESTful API endpoints for:
	- Random word selection
	- Player score tracking and updating
	- Leaderboard retrieval (top players by score)
- Persistent storage of player data using Spring Data JPA with H2 database
- Ensuring scores are saved and retrieved for a dynamic, competitive leaderboard experience
