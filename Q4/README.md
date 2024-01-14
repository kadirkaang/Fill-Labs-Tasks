# User Management Project

This project is a simple user management application built using Next.js (TypeScript), Golang (Fiber), SQLite, and GORM.

## Getting Started

1. Clone the project:

    ```bash
    git clone https://github.com/kkg52/Fill-Labs-Tasks.git
    cd Fill-Labs-Tasks/Q4
    ```

2. Install dependencies in the `client` and `server` folders:

    ```bash
    # Inside the client folder
    cd client
    npm install

    # Inside the server folder
    cd ../server
    go mod tidy
    ```

3. Start the project:

    ```bash
    # Inside the client folder
    cd client
    npm run dev

    # Inside the server folder
    cd ../server
    go run server.go
    ```

5. Open your browser and go to `http://localhost:3000` to explore the application.

## Project Structure

- `client`: Front-end interface built with Next.js and TypeScript.
- `server`: Back-end server built with Golang (Fiber).
- `db`: SQLite database file and GORM migrations file.

## Technologies Used

- **Next.js (TypeScript)**: For fast and interactive user interface development.
- **Golang (Fiber)**: Lightweight and fast web framework for the server side.
- **SQLite**: Lightweight and portable relational database system.
- **GORM**: ORM (Object-Relational Mapping) library for Golang.

## Contribution

1. Fork the project.
2. Add new features or fix bugs.
3. Submit your changes as a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---
© 2024 User Management Project
