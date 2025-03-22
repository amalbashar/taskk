<?php



    return [
        'paths' => ['api/*', 'admin'], // المسارات التي تسمح بطلبات CORS
        'allowed_methods' => ['*'], // السماح بجميع الطرق (GET, POST, PUT, DELETE, etc.)
        'allowed_origins' => ['http://localhost:3000'], // السماح بطلبات من React
        'allowed_headers' => ['*'], // السماح بجميع العناوين
        'exposed_headers' => [], // العناوين التي يمكن تعريضها للعميل
        'max_age' => 0, // الوقت الأقصى لتخزين النتائج (بالثواني)
        'supports_credentials' => true, // السماح بإرسال بيانات الاعتماد (مثل الكوكيز)
    ];


