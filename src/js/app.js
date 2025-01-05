
document.addEventListener('DOMContentLoaded', () => {
    // Escuchar el clic en todos los enlaces
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            console.log(`Enlace clickeado: ${link.href}`);
        });

        // Hover efecto
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'transform 0.3s ease';
            link.style.transform = 'scale(1.2)'; // Escala 1.5x
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)'; // Regresa al tamaño normal
        });
    });

    // Escuchar el clic en todos los inputs
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('click', (event) => {
            console.log(`Input clickeado: ${input.name || input.id}`);
        });

        // Hover efecto
        input.addEventListener('mouseenter', () => {
            input.style.transition = 'transform 0.3s ease';
            input.style.transform = 'scale(1.1)'; // Escala 1.5x
        });

        input.addEventListener('mouseleave', () => {
            input.style.transform = 'scale(1)'; // Regresa al tamaño normal
        });
    });

    // Escuchar el clic en todos los botones
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (event) => {
            console.log(`Botón clickeado: ${button.textContent || button.id}`);

            if (button.textContent.trim() === "Sign Up") {
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                overlay.style.zIndex = '9999';
                overlay.style.display = 'flex';
                overlay.style.justifyContent = 'center';
                overlay.style.alignItems = 'center';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                document.body.appendChild(overlay);

                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);

                const thankYouMessage = document.createElement('div');
                thankYouMessage.style.fontSize = '2rem';
                thankYouMessage.style.fontWeight = 'bold';
                thankYouMessage.style.color = 'white';
                thankYouMessage.style.textAlign = 'center';
                thankYouMessage.innerHTML = 'ありがとう<br>Thank you<br>Gracias';
                overlay.appendChild(thankYouMessage);

                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                    }, 200);
                }, 2000);
            }
        });

        // Hover efecto
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'transform 0.3s ease';
            button.style.transform = 'scale(1.1)'; // Escala 1.5x
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)'; // Regresa al tamaño normal
        });
    });
});

/*Event listener timeout*/
document.addEventListener('DOMContentLoaded', () => {
    let inactivityTimeout;

    // Función para reiniciar el temporizador de inactividad
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
            handleInactivity();
        }, 10 * 60 * 1000); // 10 minutos
    };

    // Función que se ejecuta cuando hay inactividad
    const handleInactivity = () => {
        console.log("Usuario inactivo durante 10 minutos. Refrescando la página...");

        // Si hay un usuario logeado, realizar logout
        if (typeof logoutUser === "function") {
            logoutUser(); // Llama a una función de logout si está implementada
        }

        // Refrescar la página y volver al inicio
        window.scrollTo(0, 0); // Volver al inicio de la página
        location.reload(); // Refrescar la página
    };

    // Agregar listeners globales para detectar actividad
    ['click', 'scroll', 'mousemove', 'keydown'].forEach(eventType => {
        window.addEventListener(eventType, resetInactivityTimer);
    });

    // Iniciar el temporizador al cargar la página
    resetInactivityTimer();
});

// Función simulada de logout
function logoutUser() {
    console.log("Log out.");
    // Aquí puedes realizar una redirección o limpieza de datos de sesión
    // Por ejemplo:
    // sessionStorage.clear();
    // window.location.href = "/login"; // Redirige a la página de inicio de sesión
}

/*Event listener gallery*/
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.other-gallery img'); // Selecciona todas las imágenes
    let currentIndex = null; // Índice actual de la imagen expandida

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.8)'; // Fondo oscuro
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '999';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.cursor = 'pointer';
    document.body.appendChild(overlay);

    const expandedImg = document.createElement('img');
    expandedImg.style.maxWidth = '80%';
    expandedImg.style.maxHeight = '80%';
    expandedImg.style.borderRadius = '10px';
    expandedImg.style.objectFit = 'contain';
    expandedImg.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    overlay.appendChild(expandedImg);

    // Funcionalidad para mostrar la imagen expandida
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            expandedImg.src = img.src; // Copia el src de la imagen clickeada
            currentIndex = index; // Guarda el índice de la imagen actual
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all'; // Activa interacción
        });
    });

    // Funcionalidad para cerrar la imagen
    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none'; // Desactiva interacción
        currentIndex = null; // Resetea el índice
    });

    // Navegación por teclado
    document.addEventListener('keydown', (event) => {
        if (currentIndex !== null) { // Solo actúa si hay una imagen expandida
            if (event.key === 'ArrowRight') {
                // Avanzar a la siguiente imagen
                currentIndex = (currentIndex + 1) % images.length; // Cicla al inicio si está en la última
                expandedImg.src = images[currentIndex].src;
            } else if (event.key === 'ArrowLeft') {
                // Retroceder a la imagen anterior
                currentIndex = (currentIndex - 1 + images.length) % images.length; // Cicla al final si está en la primera
                expandedImg.src = images[currentIndex].src;
            } else if (event.key === 'Escape') {
                // Cerrar la imagen expandida
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                currentIndex = null; // Resetea el índice
            }
        }
    });
});

/*Efecto de transicion sobre iconos*/
document.addEventListener('DOMContentLoaded', () => {
    const socialIcons = document.querySelectorAll('.social-icons a svg path');

    socialIcons.forEach((path) => {
        path.addEventListener('mouseenter', () => {
            path.style.transition = 'fill 0.3s ease'; // Transición suave
            path.style.fill = '#c0b785'; // Cambia el relleno al color deseado
        });

        path.addEventListener('mouseleave', () => {
            path.style.fill = 'none'; // Restablece el relleno
        });
    });
});
