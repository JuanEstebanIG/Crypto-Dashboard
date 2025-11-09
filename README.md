# 📊 Cripto Dashboard

Dashboard interactivo para seguimiento de criptomonedas en tiempo real.

## 🎯 ¿Por qué este proyecto?

Este proyecto fue desarrollado para:
- Practicar JavaScript vanilla moderno (ES6+)
- Implementar arquitectura modular escalable
- Trabajar con APIs RESTful (CoinGecko)
- Crear interfaces responsive y atractivas
- Manejar estado de aplicación sin frameworks

## 🚀 Características

- **Visualización en tiempo real** de las 20 principales criptomonedas
- **Gráficos interactivos** con datos históricos de 30 días
- **Sistema de favoritos** para guardar tus monedas preferidas
- **Comparación de monedas** gráfico compartido
- **Diseño responsive** adaptable a distintos dispositivos
## 🛠️ Tecnologías

- HTML5, CSS3, JavaScript ES6+
- Chart.js para visualización de datos
- CoinGecko API
- LocalStorage para persistencia

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/JuanEstebanIG/cripto-dashboard.git
```

2. Abre el proyecto:
```bash
cd cripto-dashboard
```

3. **Inicia un servidor local** (requerido por el uso de módulos ES6+):

```bash
# En VS Code
# 1. Instala la extensión "Live Server"
# 2. Click derecho en index.html
# 3. Selecciona "Open with Live Server"
```

> ⚠️ **Importante**: No se puede abrir `index.html` directamente en el navegador debido al uso de módulos ES6+. Debes usar un servidor local.

## 🚧 Próximas Características

### En desarrollo

- **🔍 Búsqueda de criptomonedas**: Sistema de búsqueda en tiempo real que permitirá filtrar monedas por nombre o símbolo
- **📚 Documentación completa**: JSDoc detallado en todas las funciones para mejor mantenibilidad del código
- **⚡ Refactorización de caché de gráficos**: Optimización del sistema de caché para mejorar el rendimiento y reducir peticiones a la API.

## 💡 Uso

### Ver estadísticas
Haz clic en el botón "Estadísticas" de cualquier moneda para ver su gráfico de los últimos 30 días.

### Agregar favoritos
Haz clic en la estrella ⭐ para agregar una moneda a favoritos. Accede a tu lista con el botón "Favoritos" en la esquina superior derecha.

### Comparar monedas
Desplázate a la sección "Comparar Monedas", selecciona dos criptomonedas diferentes y haz clic en "Comparar" para ver en el mismo grafico el rendimiento de los últimos 30 días de las dos monedas.

## 📁 Estructura del Proyecto

```
cripto-dashboard/
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├──css/
|   └── styles.css
├── assets/
│   ├──  heroIMG.jpg
|   ├──  monedaHero.webp
|   ├──  star-hollow.svg
|   ├──  star.svg
|   └──  statistics.svg
│
└── JS/
    ├── main.js
    ├── api.js
    ├── cards.js
    ├── chart.js
    ├── comparative.js
    ├── errors.js
    ├── favorites.js
    └── loading.js
```

## 📝 Notas

- Este proyecto usa la API gratuita de CoinGecko, que tiene límites de uso
- Los favoritos se guardan localmente en tu navegador
- Se requiere conexión a internet para cargar datos actualizados
- **Requiere servidor local** para funcionar correctamente debido a módulos ES6+

## 👤 Autor

**Juan Esteban Isaza**

- Email: isazaj601@gmail.com
- GitHub: [@JuanEstebanIG](https://github.com/JuanEstebanIG)