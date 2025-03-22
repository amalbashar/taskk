<!-- resources/views/auth/login-user.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>

    <form action="{{ route('login.post') }}" method="POST">
        @csrf

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>

        @error('email')
            <p>{{ $message }}</p>
        @enderror

        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>

        @error('password')
            <p>{{ $message }}</p>
        @enderror

        <button type="submit">Login</button>
    </form>

    <p>Don't have an account? <a href="{{ route('register') }}">Register here</a></p>
</body>
</html>
