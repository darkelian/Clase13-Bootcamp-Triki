# 🎮 Proyecto Triqui (Tic-Tac-Toe) 🎮
## URL de Ejecución 🌐
- Puedes jugar el juego en línea en la siguiente URL: [Ejecutar Proyecto](https://darkelian.github.io/Clase13-Bootcamp-Triki/)

## Vistas 📸
<div align="center">
  <img src="https://github.com/darkelian/Clase13-Bootcamp-Triki/blob/main/triqui.gif" alt="Video de Demostración">
</div>

## Autor:
**Brayan Elian Peña Jaimes**

## Descripción
Este es un proyecto de un juego de Triqui (Tic-Tac-Toe) desarrollado como parte del Bootcamp. El juego permite a los usuarios jugar en dos modos:
1. 👫 Jugador vs Jugador
2. 🤖 Jugador vs Máquina

La interfaz del juego se ha creado utilizando HTML5 y CSS3, y la lógica del juego se maneja con JavaScript (ES6). Además, se ha implementado una animación inicial para mejorar la experiencia del usuario.

## Estructura del Proyecto 📁
El proyecto está organizado en los siguientes archivos:

- **`index.html`**: Contiene la estructura principal del contenido.
- **`styles.css`**: Define los estilos y la apariencia visual del juego.
- **`scripts.js`**: Contiene toda la lógica del juego y maneja los eventos del DOM.

## Funcionalidades ✨
- 🌀 Animación inicial antes de empezar el juego.
- 👫 Modo de juego Jugador vs Jugador.
- 🤖 Modo de juego Jugador vs Máquina con una IA básica.
- 📊 Registro de puntajes y visualización de resultados (ganador, perdedor, empate).
- 🖱️ Interfaz de usuario interactiva con efectos de hover en los botones.

## Clases y Funciones Principales 🛠️

### Clases
- **Clase `Tablero`**: Maneja toda la lógica del juego de Triqui.
- **Clase `Jugador`**: Contiene la información de los jugadores.

### Funciones en `scripts.js`
- **`startGame(mode)`**: Inicializa el juego y establece el modo de juego (jugador o máquina).
- **`handleCellClick(event)`**: Maneja los clics en las celdas del tablero.
- **`makeAIMove()`**: Implementa la lógica para el movimiento del AI.
- **`checkWin()`**: Verifica si hay un ganador.
- **`showResult(message)`**: Muestra el resultado del juego.
- **`resetGame()`**: Reinicia el juego para una nueva partida.
- **`blackhole(element)`**: Implementa la animación inicial.

## Instalación y Ejecución 🚀
1. Clona el repositorio:
   ```bash
   git clone https://github.com/darkelian/Clase13-Bootcamp-Triki.git
