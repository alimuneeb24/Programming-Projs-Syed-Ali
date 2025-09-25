import java.io.*;
import java.net.Socket;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ClientHandler implements Runnable {
    private final Socket socket;
    public ClientHandler(Socket socket){
        this.socket = socket;
    }

    @Override
    public void run(){
        try(
                InputStream input = socket.getInputStream();
                OutputStream output = socket.getOutputStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(input))
                ){
            String requestLine = reader.readLine();
            if (requestLine == null || requestLine.isEmpty()){
                return;
            }
            System.out.println("Request received " + requestLine);

            String[] tokens = requestLine.split(" ");
            String method = tokens[0];
            String requestedPath = tokens[1];

            if ("GET".equals(method)) {
                if (requestedPath.equals("/")) {
                    requestedPath = "/index.html";
                }
            Path filepath = Paths.get("www" + requestedPath);
            if(Files.exists(filepath) && !Files.isDirectory(filepath)){
                byte [] fileBytes = Files.readAllBytes(filepath);
                sendResponse(output, "200 OK", "text/html", fileBytes);
            }else {
                System.out.println("File not found " + filepath);
                Path notFoundPath = Paths.get("www/404.html");
                byte[] notFoundBytes = Files.readAllBytes(notFoundPath);
                sendResponse(output, "404 Not Found", "text/html", notFoundBytes);
                }
            }
        }catch (IOException e){
            System.err.println("Error handling client requests " + e.getMessage());
        }
    }private void sendResponse(OutputStream output, String status, String contentType, byte[] content)
            throws IOException{
        output.write(("HTTP/1.1 " + status + "\r\n").getBytes());
        output.write(("Content-Type: " + contentType + "\r\n").getBytes());
        output.write(("Content-Length: " + content.length + "\r\n").getBytes());
        output.write("\r\n".getBytes());
        output.write(content);
        output.flush();
    }
}