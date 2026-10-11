# Aura — Frontend E-commerce (Next.js)

Frontend de e-commerce construido con **Next.js 16 (App Router)** + **TypeScript** que consume la API REST de Laravel (e-commerce-api). Implementa un flujo completo de compra: desde el catálogo público hasta el pago con Stripe y el historial de órdenes.

## Stack Tecnológico

- **Next.js 16.4** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Stripe.js** + **React Stripe Elements** (formulario de pago)
- **Lucide React** (iconos)
- **Server Components** para lecturas (fetch en servidor)
- **Server Actions** para mutaciones (login, registro, crear orden)

## Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd e-commerce-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiar el archivo de ejemplo y ajustar los valores:

```bash
cp .env.example .env.local
```

Contenido del archivo `.env.example`:

```env
# URL base de la API REST (Laravel)
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Llave pública de Stripe (modo test)
NEXT_PUBLIC_STRIPE_KEY=pk_test_tu_llave_publica_aqui
```

> **Nota:** La `NEXT_PUBLIC_API_URL` debe apuntar a la URL donde esté corriendo la API de Laravel. `NEXT_PUBLIC_STRIPE_KEY` debe ser la llave pública de Stripe en modo test.

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

> **Importante:** La API de Laravel debe estar corriendo previamente en `http://localhost:8000`.

## Rutas Implementadas

| Ruta | Descripción | Tipo |
|---|---|---|
| `/` | Catálogo público — listado de productos con hero section | Pública |
| `/product/[id]` | Vista detalle de un producto individual | Pública |
| `/auth/login` | Inicio de sesión (consume API) | Pública |
| `/auth/register` | Registro de usuario (consume API) | Pública |
| `/cart` | Carrito de compras con gestión de productos | Pública |
| `/checkout` | Finalizar compra y pasarela de pago con Stripe | Pública (pago requiere auth) |
| `/orders` | Historial de compras del usuario | Protegida (requiere auth vía middleware) |

## Arquitectura y Patrones

### Server Components (lecturas)
- `/` — `page.tsx` obtiene productos vía `fetch` en servidor con `{ next: { tags: ['products'] } }`
- `/product/[id]` — `page.tsx` obtiene detalle del producto en servidor
- `/orders` — `page.tsx` obtiene órdenes del usuario autenticado con cookie httpOnly

### Server Actions (mutaciones)
- `src/actions/auth.ts` — `loginAction`, `registerAction`, `logoutAction` (almacenan token en cookie `httpOnly`)
- `src/actions/order.ts` — `createOrderAction` (crea orden + procesa pago vía API con Stripe)

### Manejo de estado y Seguridad
- **Carrito:** Context API con `localStorage` para persistencia (estado local, sin llamadas innecesarias a la API)
- **Autenticación:** Token guardado en cookie `httpOnly` mediante Server Actions
- **Protección de Rutas:** `src/middleware.ts` intercepta accesos no autenticados a `/orders` y redirige a `/auth/login`

### Rendimiento y Resiliencia
- `loading.tsx` en rutas clave: `/` (catálogo), `/checkout`, `/cart`, `/orders`, `/product/[id]`
- `error.tsx` para captura de errores en todos los segmentos: raíz, `/checkout`, `/cart`, `/orders`, `/product/[id]`
- `<Suspense>` implementado en secciones clave/pesadas: lista de productos en `src/app/page.tsx` y acciones de usuario en `src/components/layout/Header.tsx`
- Evitar interfaces desactualizadas tras mutaciones mediante `revalidateTag('products')` y `revalidatePath('/orders')` tras la creación de órdenes

## Flujo de Compra

1. El usuario navega al **catálogo** (`/`) y explora productos
2. Entra al **detalle** (`/product/[id]`) y agrega al carrito
3. En el **carrito** (`/cart`) ajusta cantidades y procede al pago
4. Ingresa datos de tarjeta con **Stripe Elements** (usar `4242 4242 4242 4242` en test)
5. El Server Action crea la orden en la API, que procesa el pago con Stripe
6. Se redirige al **historial** (`/orders`) con confirmación de compra exitosa

## Endpoints de la API Consumidos

| Método | Endpoint | Uso |
|---|---|---|
| `GET` | `/api/products` | Listado de productos |
| `GET` | `/api/products/:id` | Detalle de producto |
| `POST` | `/api/auth/login` | Inicio de sesión |
| `POST` | `/api/auth/register` | Registro de usuario |
| `POST` | `/api/auth/logout` | Cierre de sesión |
| `POST` | `/api/orders` | Crear orden + pago Stripe |
| `GET` | `/api/orders` | Historial de compras |
