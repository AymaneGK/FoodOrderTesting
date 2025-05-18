# Food Ordering Web App Testing Project

This README provides instructions for setting up both the application under test (Laravel Food Ordering Web App) and the Playwright test project designed to run against it.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Application Setup](#application-setup)
- [Test Project Setup](#test-project-setup)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)

> **Important**: This testing setup requires cloning TWO separate repositories:
> 1. The application under test: `https://github.com/jasonchn18/laravel-food-ordering-web-app.git`
> 2. The test project: `https://github.com/AymaneGK/FoodOrderTesting.git`

## Prerequisites

To run the tests on this application, you'll need:

- **Windows environment** with git installed
- **Composer** installed
- **Xampp** with:
  - PHP version 7.4.30 (to simulate the server side)
  - phpMyAdmin (to simulate the database)
- **IDE** (Visual Studio Code, etc.)
- **Node.js** (v16 or later) installed for Playwright

## Application Setup

Follow these steps to set up the application under test:

1. **Clone the project repository**:
   ```bash
   git clone https://github.com/jasonchn18/laravel-food-ordering-web-app.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd laravel-food-ordering-web-app
   ```

3. **Start Xampp services**:
   - Ensure both Apache and MySQL modules are running

4. **Install PHP Dependencies**:
   ```bash
   composer install
   ```

5. **Set up environment file**:
   - Copy the `.env.example` file provided with the assignment
   - Rename it to `.env`
   - Configure the database settings in the `.env` file

6. **Replace migration files**:
   - Locate the 2 migration files provided with the assignment
   - Copy them to the project's `database/migrations` directory to replace the existing ones

7. **Run database migrations**:
   ```bash
   php artisan migrate:fresh
   ```

8. **Seed the database**:
   ```bash
   php artisan db:seed
   ```

9. **Start the application server**:
   ```bash
   php artisan serve
   ```
   The application should now be running at `http://localhost:8000`

## Test Project Setup

After setting up the application, follow these steps to set up the test project:

1. **Clone the Playwright test project repository**:
   ```bash
   git clone https://github.com/AymaneGK/FoodOrderTesting.git
   ```

2. **Navigate into the test project directory**:
   ```bash
   cd FoodOrderTesting
   ```

3. **Install test project dependencies**:
   ```bash
   npm install
   ```

4. **Install Playwright browsers** (if not already installed):
   ```bash
   npx playwright install
   ```

## Running Tests

Once both the application and test project are set up:

1. **Ensure the Laravel application is running** (`php artisan serve`)

2. **In a separate terminal window**, navigate to your test project directory:
   ```bash
   cd FoodOrderTesting
   ```

3. **Execute the tests**:
   ```bash
   npx playwright test
   ```
   
4. **Execute the tests of a specific module (cart module example)**:
   ```bash
   npx playwright test tests/cart
   ```
   
## Troubleshooting

- **Database Connection Issues**: Verify the database credentials in the `.env` file match your Xampp MySQL settings
- **Missing Dependencies**: Run `composer install` or `npm install` again if you encounter missing dependency errors
- **Port Conflicts**: If port 8000 is already in use, the Laravel app can be started on a different port using `php artisan serve --port=8080`
- **Migration Errors**: Ensure you've replaced the migration files as instructed in step 6 of the Application Setup

---

For any additional issues or questions, please refer to the project documentation or contact the test project maintainer.
