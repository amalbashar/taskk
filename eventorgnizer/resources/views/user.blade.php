<!-- resources/views/admin/dashboard.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>user Dashboard</title>
</head>
<body>
    <h2>Welcome to user Dashboard</h2>
    <p>Only accessible by user.</p>

    <a href="{{ route('logout') }}">Logout</a>
</body>
</html>
