# cs450-classproject-reactjs-springboot

##Requirements:

- You must have java 15 or above installed to run the project.
- If you are using windows, you must add your java directory and make it an environment variable in order to use java in window's terminal.
##Project's structure:
- The backend is written in Java using Spring Boot framework to support the REST api. To access the database, I am using Sring JDBC, which is similar to regular JDBC. You can access backed codebase following this src\main\java\com\cs450\project\. The setup connection to GMU Oracle is in \main\java\com\cs450\resource\application.properties.
- The frontend is written in Javascript using Reactjs framework and Material UI, which is a UI framework for React components.
##How to run:

- Since we need to connect GMU oracle database, you need to run GMU VPN using your GMU credentials before running the application; otherwise, you will be rejected by the GMU server.
- To start up the application, simply run this command in your terminal: java -jar project-0.0.1-SNAPSHOT.jar. Then you can use the application through your localhost:8080.
- The jar file is a complied version of my application, if you want to inspect the source code seperately, you need to install the newest version of nodejs, npm, and maven apache.
