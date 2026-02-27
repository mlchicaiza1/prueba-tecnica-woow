-- Inserción de usuarios iniciales (seeders)
-- Las contraseñas para ambos usuarios son: 'password123' (hasheada con bcrypt)
-- Puedes usar 'admin@example.com' y 'user@example.com' para probar

INSERT INTO public.users (
    id, 
    name, 
    email, 
    password, 
    role, 
    "createdAt", 
    "updatedAt"
) VALUES 
(
    '11111111-1111-1111-1111-111111111111', 
    'Admin User', 
    'admin@example.com', 
    '$2y$10$1vWEM8xFJ0xHvO1SzH445edHijIz3tU7abTXMp0Y69EjWYOKWxLGK', -- password123 
    'admin', 
    now(), 
    now()
),
(
    '22222222-2222-2222-2222-222222222222', 
    'Normal User', 
    'user@example.com', 
    '$2y$10$1vWEM8xFJ0xHvO1SzH445edHijIz3tU7abTXMp0Y69EjWYOKWxLGK', -- password123
    'user', 
    now(), 
    now()
)
ON CONFLICT ("email") DO NOTHING;
