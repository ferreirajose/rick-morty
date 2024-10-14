  # Running an Angular Project

  This README.md guide provides instructions on how to run an Angular project from scratch. Whether you're starting a new project or collaborating with others, these steps will help you set up and run the Angular project seamlessly.

  ## Prerequisites

  Before you begin, ensure you have the following installed:

  - Node.js: Angular requires Node.js to be installed. You can download and install it from [Node.js website](https://nodejs.org/).
  - npm (Node Package Manager): npm usually comes with Node.js installation.

  ## Installation

  1. **Install Angular CLI**:

    Angular CLI (Command Line Interface) is a powerful tool that simplifies the process of creating and managing Angular projects.

    Open your terminal or command prompt and run the following command to install Angular CLI globally:

    ```
    npm install -g @angular/cli
      ```

  2. **Install Dependencies**:

    ```
    npm install
      ```

  3. **Clone the Angular project repository:**

      ```
      git clone https://github.com/ferreirajose/rick-morty.git
      ```

  ## Running the Project

  1. **Start the development server:**

      ```
      npm run start:dev
      ```

  2. **Accessing the project in the browser:**

      ```
      http://localhost:4200/
      ```

  3. **Run unit tests:**
      
      ```
      npm run test
      ```
  4. **Build the project:**
      ```
      ng build --prod
      ```

  4. **Demo:**
    [Link](https://rick-morty-pied-seven.vercel.app/home)

  ## Problems with installing dependencies

    try downloading using the command below
    
    ```
    npm i --legacy-peer-deps
    ```
