# College Management Application
This is a comprehensive College Management Application developed using Spring Boot for the backend and Next.js for the frontend. The application helps in managing various aspects of college operations such as student information, course management, faculty details, and more.

## Features
- Manage student data
- Course and subject management
- Faculty management
- User roles and permissions
- department management

## Setup Instructions
Backend - Spring Boot
### Install Java
Ensure that you have Java 17 installed on your system. You can verify the installation by running the following command:

```bash
Copy code
java -version
```

### Install Maven
Download and install Maven to manage dependencies and build the project.

```bash
Clone the Repository
Clone the project repository to your local machine:
```

```bash
git clone https://github.com/Anku-yadav-001/college-management.git
```

```bash
cd college-management-application
```

```bash
cd api
Run the Spring Boot Application
You can start the Spring Boot application using Maven:
```

```bash
mvn spring-boot:run
Alternatively, you can build the project and run the jar file:
```

```bash
mvn clean install
java -jar target/college-management-application.jar
```

### Access the Application
The application will be available at http://localhost:8080.

## Frontend - Next.js

### Install Node.js
Ensure that Node.js and Yarn are installed on your system. You can check the version by running:

```bash
node -v
yarn -v
```

```bash
cd ui
```

### Install Dependencies
Install the required dependencies using npm:

```bash
npm install
```

### Run the Next.js Development Server
Start the Next.js development server:

```bash
npm run dev
```

### Access the Frontend
The frontend will be available at http://localhost:3000.