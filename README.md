# HomeHop - Vacation Rental App

Built as a project for the SoftUni Web React module - project defense.

## Features

- User authentication, offer posting, reservations, comments & rating, filters

## Technologies Used

- Back-end: Django
- Database: PostgreSQL
- Font-end: React & Tailwind
- User Authentication: Django's built-in authentication system and JWT

## How to install

- Create a virtual environment for python
`python -m venv env`
- Run the virtual environment
On Windows - `.\env\Scripts\Activate.ps1`
On Linux - `source ./env/bin/activate`
- Navigate to the server directory
`cd home_hop_server`
- Install the requirements
`pip install -r requirements.txt`
- Make migrations and migrate
`python manage.py makemigrations`
`python manage.py migrate`
- Run the server
`python manage.py runserver`
- Open another prompt and navigate to the client directory
`cd home_hop`
- Install the node modules
`npm i`
- Run the development server
`npm run dev`

## Screenshots

![Profile page](<screenshots/Screenshot 2023-12-09 051203.png>)
![Post details](<screenshots/Screenshot 2023-12-09 051232.png>)