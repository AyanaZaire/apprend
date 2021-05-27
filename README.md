# Apprend

Apprend is a community class bulletin board where members can post classes and workshops for their local community.

Apprend uses Ruby on Rails as the framework for building the backend. Apprend leverages `sqlite3` as the database for Active Record. The frontend of the application is built using HTML, CSS, and JavaScript providing the UI for members to fetch and change data from the backend.

## Installation

* Ruby version: 2.3.3

* Database creation: `rails db:migrate && rails db:seed`

* Application initialization: `rails s`

To install Apprend, fork and clone this repository on to your local machine.

Run the following line to install all gems, migrate the database, and seed the databased with initial data:

```bash
bundle install && rails db:migrate && rails db:seed
```

If this is unsuccessful, you may need to create the database, load the schema, and initialize with the seed data using:

```bash
rake db:setup  
```

Initialize the server:

```bash
rails s
```

Once the server is running, you should now be able to demo the application via the frontend's `index.html` file.

## Usage

There is full CRUD functionality for courses. Each course can be created or edited based on title, description, cover image, category, location, time, and date. Users can also search courses by title and sort courses by category.

As a community member, one can:
- Create a course
- See all courses available
- Update a course
- Delete a course
- Search a course by title
- Sort the list of courses by category

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
