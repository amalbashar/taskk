# Event Management Project

Project description: A web application for managing and organizing events, using **Laravel** for the back-end and **React** for the front-end.

## Requirements

### Back-End
- PHP 8.0 or higher
- Laravel 8.x or higher
- MySQL or any similar database
- Composer (for dependency management)

### Front-End
- Node.js (preferably v14 or higher)
- npm or yarn
- React 17.x or higher

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/amalbashar/taskk

### 2. Back-End Installation:

1. **Navigate to the project directory**:
   - Open a terminal or command prompt and navigate to the project folder:
     ```bash
     cd your_project_name
     ```

2. **Install dependencies using Composer**:
   - Make sure you have [Composer](https://getcomposer.org/) installed on your system. Run the following command to install all necessary dependencies for the back-end:
     ```bash
     composer install
     ```

3. **Set up the environment file (`.env`)**:
   - Copy the `.env.example` file to `.env` to set up your environment configurations:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and configure your database settings and other environment variables, such as:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database_name
     DB_USERNAME=your_database_user
     DB_PASSWORD=your_database_password
     ```

4. **Generate the application key**:
   - Run the following command to generate the application key. This key is used to encrypt user sessions and other sensitive data:
     ```bash
     php artisan key:generate
     ```

5. **Run database migrations**:
   - Run the migrations to create the necessary database tables:
     ```bash
     php artisan migrate
     ```

6. **Create a Seeder (Optional)**:
   - If you want to populate your database with sample data, you can create a seeder. For example, to create a seeder for events:
     ```bash
     php artisan make:seeder EventSeeder
     ```
   - Once created, add data to the `EventSeeder.php` file located in the `database/seeders` directory. Here's an example of how to populate the events table:
     ```php
     use Illuminate\Database\Seeder;
     use App\Models\Event;

     class EventSeeder extends Seeder
     {
         public function run()
         {
             Event::create([
                 'name' => 'Sample Event',
                 'date' => '2025-04-01',
                 'location' => 'Sample Location',
                 'description' => 'This is a sample event.',
             ]);
         }
     }
     ```
   - Finally, run the seeder to insert the data into the database:
     ```bash
     php artisan db:seed --class=EventSeeder
     ```

7. **Start the Laravel server**:
   - You can start the Laravel development server by running the following command:
     ```bash
     php artisan serve
     ```

   - This will start the back-end server on `http://localhost:8000`.

By following these steps, your back-end (Laravel) will be set up and ready to use.
