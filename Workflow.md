Hi! I've created this markdown file to explain how my website works!

When the website link is clicked, **index.html** creates a basic HTML “container” in which React will load into and control. **main.jsx** is then run, which attaches React to the HTML page, as well as enables routing through browsers and loads the app. **App.jsx** will then handle frontend page routing with the /Login page as a default.

If the user chooses to create a new account, **App.jsx** will reroute the user to the /Register page, which is handled by both the register function **routes.py** (backend) and **Register.jsx** (frontend). When the user enters their desired username, password and email, **api.js** is called, which [i dont know what it does, send a https request I think]. The register function in **routes.py** then collect the inputed data - hashing the password along the way, and stores it in a dictionary, which is added to the the **Supabase** database as a table using the POST method.

Once the user has registered, **Register.jsx** then navigates to the /Login page (handled by **Login.jsx** for frontend and **routes.py** for backend), where the user is prompted to enter their username and password. **routes.py** verifies if the user exists, checks the password and creates a JWT password. **api.js** is again called and does some random stuff I dont know about to check whether it matches the database or not.

If the login is successful, the user is rerouted to the /Dashboard page, after it passes through **ProtectedRoute.jsx** which checks whether the device has received a token from the backend. **Dashboard.jsx** then runs fetchTasks() to retreive the user's exisiting tasks...
