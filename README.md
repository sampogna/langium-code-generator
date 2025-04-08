# Langium Generator

Langium Generator is a powerful tool that takes a custom syntax for defining classes and generates a fully functional CRUD application with HTML, CSS, JavaScript, and integration with Supabase. This generator automates the creation of a web-based CRUD interface based on your class definitions and integrates with Supabase for backend storage and user authentication.

## Features

- **Custom Syntax Input**: Define your classes using a simple, custom syntax.
- **CRUD Generation**: Automatically generate a full CRUD (Create, Read, Update, Delete) application.
- **Frontend**: HTML, CSS, and JavaScript files for a functional web application.
- **Supabase Integration**: Automatically integrate with Supabase to handle database operations and user authentication.
- **Supabase Project URL & JWT Token**: The generator requires a Supabase project URL and a JWT token for secure API calls.

## Requirements

Before using the Langium Generator, make sure you have the following:

- **Node.js** (v14 or higher)
- **Supabase Account**: A Supabase project URL and JWT token to connect to your backend.
- **Langium Syntax Definition**: A custom syntax file that describes the classes you want to create.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/langium-generator.git
    cd langium-generator
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

### Input Format

The Langium Generator expects an input file in a custom syntax format to describe the classes. Below is an example:

```txt
class User {
  name: string;
  email: string;
  age: number;
}

class Post {
  title: string;
  content: string;
  userId: string;
}
