Flight Reservation Web Application with Python, Django, Bootstrap5, HTML, CSS & JavaScript.

### Features
1. Users can create their user account.
2. Users can book both one-way as well as round-trip tickets 
3. Webpages are mobile responsive.
4. Users can cancel their booked tickets.
5. Users can view their previously booked tickets (Both confirmed and cancelled tickets).
6. Tickets are downloadable as pdf document.
7. As-you-type Search

### Files & Directories
- setup
  - `Data` - contains airports and flights data
    - `airports.csv`
    - `international_flights.csv`
  - `flight` - main application directory
    - `static` - contains css, images and javascripts
      - `css`
      - `img`
      - `js`
    - `templates` - contains HTMLs
      - `book.html` - page for selected flight and reading user data
      - `bookings.html` - page for showing bookings done by user
      - `index.html` - home page
      - `login.html` - user login page
      - `payment.html` - payment page
      - `payment_process.html` - payment completion page
      - `register.html` - user registeration page
      - `search.html` - flight result page after user search
      - `ticket.html` - paid ticket info page
    - `admin.py` - register featurs that are to be used in admin dashboard
    - `apps.py` - app configuration
    - `models.py` - all models used in application are create here
    - `tests.py` - contains test cases 
    - `urls.py` - handles the URLS of web application
    - `utils.py` - contains Django helper functions used in views.py
    - `views.py` - contains web application views
  - `setup` - project directory
    - `asgi.py` - ASGI config for setup project
    - `settings.py` - Django settings for setup project
    - `urls.py` - handles all the URLs of the project
    - `utils.py` - contains Django helper functions used in views.py
    - `wsgi.py` - WSGI config for setup project
  `manage.py` - used basically as a command-line utility and for deploying, debugging, or running our web application.
  `README.MD` - contains information about project
  `requirements.txt` - contains all Python packages required to run this web application

### Installation
- Install Python 3.12.0 from [here](https://www.python.org/downloads/) manually.
- Install project dependencies by running `py -m pip install -r requirements.txt`.
- Install PostgreSQL from [here](https://www.postgresql.org/download/) manually.

- Setup Database manually: (configuration can be changed accordingly in settings.py)
  - Register Server
    - Name: as-you-want
    - User: 'postgres'
    - PASSWORD: 'admin'
    - HOST: 'localhost' or '127.0.0.1'
    - PORT: '5432'
  - Create Database 
    - Name: 'airlinedatabase'

- Run the commands `py manage.py makemigrations` and `py manage.py migrate` in the project directory to make and apply migrations.

- Create superuser with `py manage.py createsuperuser`. This step is optional.

- Run the command `py manage.py runserver` to run the web server.
- Open web browser and goto `127.0.0.1:8000` url to start using the web application.