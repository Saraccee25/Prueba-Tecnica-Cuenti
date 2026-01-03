Podcaster App

Aplicación web desarrollada en React + Vite que permite visualizar un listado de podcasts, ver el detalle de cada podcast y reproducir sus episodios, consumiendo datos desde la API pública de iTunes y feeds RSS.

Tecnologías utilizadas

React

Vite

React Router DOM

Axios

JavaScript (ES6+)

CSS

Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

Node.js (versión 16 o superior recomendada)

npm o yarn

Instalación

Clona el repositorio o descarga el proyecto:

git clone <url-del-repositorio>
cd podcaster-app


Instala las dependencias:

npm install

Modo Development

En este modo los assets no están minificados, lo que facilita el desarrollo y la depuración.

Ejecutar la aplicación en modo desarrollo:
npm run dev


La aplicación se ejecutará normalmente en:
http://localhost:5173

Incluye hot reload

Código legible y sin minificar

Este modo es ideal para desarrollo y debugging.

Modo Production

En este modo los assets se generan concatenados y minificados, optimizados para producción.

Generar build de producción:
npm run build


Esto creará una carpeta dist/ con los archivos optimizados.

Ejecutar el build localmente:
npm run preview


Sirve la aplicación usando los assets optimizados

Simula un entorno de producción