# Simple Multithreaded HTTP Server in Java

![Java Version](https://img.shields.io/badge/Java-21+-blue?logo=java&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/License-MIT-green)

A foundational HTTP server built from scratch in pure Java. This project serves as a practical demonstration of core backend principles, focusing on multithreading, socket programming, and the fundamentals of the HTTP protocol, without relying on any external frameworks.

## ✨ Core Features

*   **⚡ Multithreaded Architecture:** Employs a classic "thread-per-client" model to handle multiple concurrent client connections.
*   **📄 Static File Serving:** Serves static files (HTML, CSS, etc.) from a local `www` directory.
*   **🌐 HTTP/1.1 Compliant:** Understands basic `GET` requests and serves responses with correct status codes (`200 OK`, `404 Not Found`) and headers (`Content-Type`, `Content-Length`).
*   **🚀 Zero Dependencies:** Built using only standard Java libraries to showcase a deep understanding of the underlying technology.

## 🏗️ Architecture Deep Dive

The server's design is intentionally simple to clearly separate concerns, following the model of a busy restaurant.

### 1. The Manager (`HttpServer.java`)
The `HttpServer` class acts as the single point of entry. Its sole responsibility is to listen on a specific port for new client connections. When a new connection is detected, it immediately delegates the task to a dedicated "Waiter" and goes back to listening. This ensures the server is always available to accept new clients without delay.

```java
// HttpServer.java
while (true) {
    // 1. Wait for a new client to connect
    Socket clientSocket = serverSocket.accept();

    // 2. Create a dedicated handler for this client
    ClientHandler clientHandler = new ClientHandler(clientSocket);

    // 3. Start the handler on a new thread and immediately loop back to wait for the next client
    new Thread(clientHandler).start();
}
```

### 2. The Waiter (`ClientHandler.java`)
The `ClientHandler` is a `Runnable` class responsible for handling the entire lifecycle of a single client's request. Each instance runs on its own thread, completely isolated from other clients. Its job is to:
1.  Read and parse the client's HTTP request.
2.  Locate the requested file on the server.
3.  Construct and send a valid HTTP response (either the file's content or a 404 error).
4.  Close the connection.

This separation ensures that a slow or complex request from one client does not block the entire server from handling other, faster requests.

## 🚀 Getting Started

You can run this server either from the command line or directly within an IDE like IntelliJ IDEA.

### Prerequisites
*   Java Development Kit (JDK) 21 or newer.

### Option 1: Running from IntelliJ IDEA (Recommended)
1.  Clone this repository.
2.  Open the project folder in IntelliJ IDEA.
3.  Locate the `HttpServer.java` file in the `src` directory.
4.  Click the green "play" button next to the `main` method to start the server.
5.  You will see a confirmation message in the console: `Listening for connections on port 8080...`

### Option 2: Running from the Command Line
1.  Clone this repository and open a terminal in the project's root directory.
2.  Compile the Java source files:
    ```sh
    javac -d out src/*.java
    ```
3.  Run the compiled server:
    ```sh
    java -cp out HttpServer
    ```
4.  You will see the confirmation message: `Listening for connections on port 8080...`

## 🧪 How to Test

Once the server is running:

1.  **Test a Successful Request:**
    *   Open your web browser and navigate to `http://localhost:8080/` or `http://localhost:8080/index.html`.
    *   **Expected Result:** You should see the content of the `index.html` file, which confirms a `200 OK` response.

2.  **Test a Not Found Error:**
    *   In your browser, navigate to a file that doesn't exist, such as `http://localhost:8080/does-not-exist.html`.
    *   **Expected Result:** You should see the content of the `404.html` file, which confirms a `404 Not Found` response.

## 📈 Future Improvements

This server provides a solid foundation, but its "thread-per-client" model has limitations under heavy load. The next logical step for performance improvement would be to implement a **Thread Pool** (e.g., using Java's `ExecutorService`). This would replace the costly process of creating a new thread for every request with a more efficient model of reusing a fixed set of worker threads.