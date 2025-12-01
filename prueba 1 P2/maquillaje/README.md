# Prueba Práctica P2 - Catálogo de Maquillaje

Este proyecto es una aplicación web desarrollada en React que consume la API pública de Makeup API para mostrar un catálogo de productos de la marca Maybelline.

## Cumplimiento de Criterios de Evaluación

A continuación se detalla cómo este proyecto cumple con los criterios solicitados:

| Criterio | Descripción del Cumplimiento |
|----------|------------------------------|
| **Consumo correcto de la API REST en la nube** | Se utiliza `fetch` dentro de un servicio (`src/services/productService.js`) para consumir la API `https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`. La petición es de tipo GET y se maneja asíncronamente con `async/await`. |
| **Identificación y uso de 3 a 5 parámetros de la API** | Se han seleccionado y mostrado 4 parámetros clave de cada producto en las tarjetas: <br> 1. **Imagen** (`image_link`): Se muestra la foto del producto. <br> 2. **Nombre** (`name`): Título del producto. <br> 3. **Precio** (`price`): Costo del producto. <br> 4. **Calificación** (`rating`): Puntuación del producto (o descripción si no hay rating). |
| **Desarrollo del Frontend usando componentes** | - **Hooks**: Se implementa `useState` para manejar los datos, carga y errores, y `useEffect` para realizar la llamada a la API al montar el componente (encapsulado en el custom hook `useFetch`). <br> - **Componentes**: La aplicación está modularizada en `App`, `Navbar`, `ProductList`, `ProductCard` y `Loading`. <br> - **Estructura**: El código está organizado en carpetas (`components`, `services`, `hooks`, `styles`). |
| **Documentación y diseño visual** | - **Diseño**: Se utiliza **Bootstrap 5** para la maquetación responsiva (Grid system) y estilos de componentes (Cards, Navbar, Badges, Spinners). <br> - **Interfaz**: Limpia y ordenada, mostrando un indicador de carga mientras se obtienen los datos y manejo de errores visual. |

## Instalación y Ejecución

1.  Navegar a la carpeta del proyecto:
    ```bash
    cd PruebaPracticaP2
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Ejecutar la aplicación:
    ```bash
    npm start
    ```
