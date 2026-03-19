# La Butaca Ecommerce App

Este es un proyecto de ecommerce para una cadena de cines (evolucionado visualmente a **La Butaca**), construido bajo un stack tecnológico moderno, responsivo y diseñado para ofrecer una experiencia de usuario fluida, estilo IMAX futurista, con temática oscura premium y acentos rojos brillantes.

## Sitio publicado 💻🖥️

**https://reto-frontend-cp-peach.vercel.app/**

## 🚀 Tecnologías Utilizadas

- **React 18 + Vite**: Para un entorno de desarrollo ultra rápido y compilación optimizada.
- **React Router v6**: Para la navegación SPA con `React.lazy` y `Suspense` (Lazy loading).
- **Zustand**: Para el manejo del estado global (`authStore` y `cartStore`), ofreciendo una alternativa más ligera y sencilla a Redux.
- **Tailwind CSS**: Para el diseño visual (tema oscuro, responsive, animaciones personalizadas) directo en el HTML.
- **React Hook Form + Zod**: Para el manejo y validación estructurada de formularios.
- **Axios & MD5**: Para el consumo de los servicios y encriptación de firmas de seguridad hacia la API de PayU.
- **Lucide React**: Para iconos modernos y ligeros.

## 📦 Estructura del Proyecto

```
src/
├── components/   # Componentes reusables (Navbar, Cards premium, Modals, etc.)
├── constants/    # Rutas centralizadas
├── hooks/        # Lógica reutilizable
├── mocks/        # Datos simulados (Cartelera de estrenos y Dulcería surtida)
├── pages/        # Vistas de la aplicación (Home, Login, Dulcería, Pago)
├── services/     # Servicios asíncronos para consumo de mock o proxy a PayU
├── store/        # Estado global (auth, cart)
├── utils/        # Esquemas de validación Zod
└── App.jsx       # Rutas y configuración general de la app
```

## 🛠️ Instalación y Ejecución

1. Asegúrate de tener Node.js instalado (idealmente >= 18).
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre el `localhost` generado por Vite (ej. `http://localhost:5173` o `http://localhost:5175`) en tu navegador.

## 💳 Datos de Prueba PayU (Sandbox)

Para probar la pasarela de pagos integrada en la ruta `/pago`, utiliza los siguientes datos de tarjeta (la validación del formulario requiere los formatos exactos):

- **Número de Tarjeta**: `4097440000000004` (SIN espacios)
- **Fecha de Expiración**: `12/30` (Cualquier fecha válida posterior a la actual en formato MM/YY)
- **CVV**: `321` (Cualquier número de 3 dígitos)
- **DNI**: Requiere exactamente 8 dígitos (ej. `12345678`).

*Nota sobre arquitectura tolerante a fallos: Debido a las constantes caídas técnicas de PayU Sandbox en la región de Perú (Account 512323), `payuService.js` cuenta con un sistema de failover automático que derivará el cobro falso a los servidores de respaldo de Colombia para garantizar que la presentación del prototipo nunca falle.*

## 🧠 Decisiones Técnicas y de Diseño

1. **Proxy con Vite**: Para evitar los errores de CORS al comunicarse con PayU desde el frontend en desarrollo, se configuró un proxy en `vite.config.js` (`/payu-api` -> `https://sandbox.api.payulatam.com`).
2. **Global State**: Se usó Zustand por ser una librería "boilerplate-free", reduciendo el código en comparación a Redux.
3. **Mocks y Skeletons**: Se incorporaron delays artificiales en los servicios (`setTimeout`) en conjunto a "Loading Skeletons" con efecto Shimmer Premium para simular latencias reales de red elegantemente.
4. **Diseño "La Butaca"**: Toda la paleta cambió a un modo Oscuro Futurista usando variables CSS globales, animaciones interactivas al hacer scroll/hover y tipografías envolventes como `Bebas Neue` y `Outfit`.
5. **Autenticación Ficticia**: Existen rutas públicas y protegidas manejadas mediante Interceptores de React Router.

## 🚀 Vista del sitio web 

<img width="1339" height="487" alt="image" src="https://github.com/user-attachments/assets/ccf12e68-0f10-48ec-949d-d484ac8cbc47" />

<img width="1335" height="516" alt="image" src="https://github.com/user-attachments/assets/2f9b0877-5f1b-4f4e-9f24-8eaffa286ebe" />


**Login**

<img width="1336" height="507" alt="image" src="https://github.com/user-attachments/assets/0b5d76da-62b5-4df9-bad9-8f2aef5b6829" />


**Dulceria**

<img width="1338" height="522" alt="image" src="https://github.com/user-attachments/assets/e2cc43a0-65f5-4c07-a02a-7ca3d2b9f846" />
