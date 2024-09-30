# Running the Application

1. **Backend**:
   - Navigate to the backend directory:

     ```bash
     cd weather-proxy
     ```

   - Install the backend dependencies:

     ```bash
     npm install
     ```

   - Set up the environment variables by creating a `.env` file in the `weather-proxy` directory and adding the following:

     ```bash
     MONGO_ROOT=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
     OPENWEATHER_API_KEY=your_openweathermap_api_key
     ```

   - Start the backend server:

     ```bash
     npm run start
     ```

   - The backend will run on `http://localhost:3000`.

2. **Frontend**:
   - Navigate to the frontend directory:

     ```bash
     cd ../weather-app
     ```

   - Install the frontend dependencies:

     ```bash
     npm install
     ```

   - Start the frontend application:

     ```bash
     npm run dev
     ```
