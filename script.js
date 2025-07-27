// JavaScript retro del año 2005 - Las Nenas de Paquito Webcams Fullscreen

// Configuración de webcams
const webcams = {
    salon: {
        name: "Salon",
        videoUrl: "https://metrosexual.lasnenasdepaquito.es/test.webm",
        description: "¡Disfruta de la transmisión en vivo desde nuestro salón! Aquí puedes ver todo lo que pasa en tiempo real.",
        viewers: 42
    }
};

let currentWebcam = 'salon';
let startTime = new Date();
let menuVisible = true;

// Función para detectar si es un dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// Función para mostrar advertencia de móvil
function showMobileWarning() {
    if (isMobile()) {
        const warning = document.getElementById('mobile-warning');
        if (warning) {
            // Mostrar el mensaje
            warning.style.display = 'flex';
            
            // Ocultar después de 3 segundos con efecto de disolución
            setTimeout(() => {
                warning.classList.add('fade-out');
                
                // Remover completamente después de la transición
                setTimeout(() => {
                    warning.style.display = 'none';
                }, 500);
            }, 3000);
        }
    }
}

// Función para configurar el video
function setupVideo() {
    const videoElement = document.getElementById('webcam-video');
    if (videoElement) {
        // Configurar bucle
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.controls = false; // Deshabilitar controles
        
        // Event listener para asegurar bucle infinito
        videoElement.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play().catch(e => console.log('Error reproduciendo video:', e));
        });
        
        // Event listener para errores
        videoElement.addEventListener('error', function() {
            console.log('Error en el video, reintentando...');
            setTimeout(() => {
                this.load();
                this.play().catch(e => console.log('Error reproduciendo video:', e));
            }, 1000);
        });
    }
}

// Función para inicializar la página
function initPage() {
    console.log("🎬 Las Nenas de Paquito - Webcams Fullscreen cargadas con éxito!");
    
    try {
        // Configurar video inicial
        setupVideo();
        
        // Mostrar advertencia para móviles
        showMobileWarning();
        
        // Contador de visitas totales
        updateVisitorCounter();
        
        // Efectos de hover para enlaces
        addHoverEffects();
        
        // Inicializar webcam
        updateWebcamDisplay();
        
        // Iniciar contador de tiempo
        startTimeCounter();
        
        // Configurar eventos de teclado
        setupKeyboardEvents();
        
        console.log("✅ Inicialización completada con éxito");
    } catch (error) {
        console.error("❌ Error durante la inicialización:", error);
    }
}

// Función para mostrar/ocultar menú
function toggleMenu() {
    const menu = document.querySelector('.floating-menu');
    const toggle = document.querySelector('.menu-toggle');
    const webcamOverlay = document.querySelector('.webcam-overlay');
    
    if (menuVisible) {
        menu.classList.add('hidden');
        toggle.classList.add('hidden');
        webcamOverlay.classList.add('hidden');
        menuVisible = false;
    } else {
        menu.classList.remove('hidden');
        toggle.classList.remove('hidden');
        webcamOverlay.classList.remove('hidden');
        menuVisible = true;
    }
}

// Función para mostrar/ocultar chat
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const chatButton = document.querySelector('.chat-button');
    
    if (chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
        chatButton.textContent = 'ABRIR CHAT';
    } else {
        chatWindow.classList.add('open');
        chatButton.textContent = 'CERRAR CHAT';
    }
}

// Configurar eventos de teclado
function setupKeyboardEvents() {
    console.log("🎹 Configurando eventos de teclado...");
    
    document.addEventListener('keydown', function(e) {
        console.log(`🔑 Tecla presionada: ${e.key}`);
        
        // ESC para mostrar/ocultar menú
        if (e.key === 'Escape') {
            console.log("📱 ESC presionado - toggle menu");
            toggleMenu();
        }
        
        // Teclas numéricas para cambiar webcams
        if (e.key === '1') {
            console.log("1️⃣ Tecla 1 presionada");
            changeWebcam('salon');
        }
        if (e.key === '2') {
            console.log("2️⃣ Tecla 2 presionada");
            changeWebcam('cocina');
        }
        if (e.key === '3') {
            console.log("3️⃣ Tecla 3 presionada");
            changeWebcam('dormitorio');
        }
        
        // F11 para pantalla completa
        if (e.key === 'F11') {
            e.preventDefault();
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    });
    
    console.log("✅ Eventos de teclado configurados");
}

// Función para cambiar webcam
function changeWebcam(room) {
    console.log(`🎯 Intentando cambiar a webcam: ${room}`);
    
    if (room === 'cocina' || room === 'dormitorio') {
        // Mostrar mensaje de que la webcam está fuera de servicio
        const roomName = room === 'cocina' ? 'Cocina' : 'Dormitorio';
        console.log(`❌ ${roomName} - FUERA DE SERVICIO`);
        showWebcamTransition(`${roomName} - FUERA DE SERVICIO`);
        return; // No cambiar la webcam
    }
    
    if (webcams[room]) {
        currentWebcam = room;
        console.log(`✅ Cambiando a: ${webcams[room].name}`);
        
        // Mostrar transición
        showWebcamTransition(webcams[room].name);
        
        // Actualizar video
        const videoElement = document.getElementById('webcam-video');
        if (videoElement && webcams[room].videoUrl) {
            videoElement.src = webcams[room].videoUrl;
            videoElement.loop = true; // Asegurar que esté en bucle
            videoElement.load(); // Recargar el video con la nueva fuente
            
            // Asegurar que el video se reproduzca en bucle
            videoElement.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            });
        }
        
        // Actualizar enlaces activos
        document.querySelectorAll('.menu-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[onclick="changeWebcam('${room}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log(`✅ Enlace activo actualizado: ${room}`);
        } else {
            console.log(`❌ No se encontró enlace para: ${room}`);
        }
        
        // Actualizar display
        updateWebcamDisplay();
    }
}

// Actualizar información de la webcam
function updateWebcamDisplay() {
    const webcam = webcams[currentWebcam];
    
    // Actualizar información de la webcam si es necesario
    if (webcam) {
        console.log(`📹 Webcam actualizada: ${webcam.name}`);
    }
    
    // El contador de visitas se maneja por separado en updateVisitorCounter()
}

// Función para mostrar transición de webcam
function showWebcamTransition(roomName) {
    const transition = document.createElement('div');
    transition.innerHTML = `Cambiando a ${roomName}...`;
    transition.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 24px;
        font-weight: bold;
        z-index: 9999;
        animation: transition 1s ease-in-out;
    `;
    
    document.body.appendChild(transition);
    
    // Si es el mensaje de fuera de servicio, que dure más tiempo
    const duration = roomName.includes('FUERA DE SERVICIO') ? 3000 : 1000;
    
    setTimeout(() => {
        document.body.removeChild(transition);
    }, duration);
}

// Contador de visitas totales REAL
function updateVisitorCounter() {
    const counter = document.querySelector('.counter');
    if (counter) {
        // Obtener visitas reales del localStorage
        let visits = localStorage.getItem('realVisits');
        const sessionVisited = sessionStorage.getItem('sessionVisited');
        
        if (!visits) {
            // Primera visita - inicializar con 1247
            visits = 1247;
            localStorage.setItem('realVisits', visits.toString());
        }
        
        // Solo incrementar si es una nueva sesión
        if (!sessionVisited) {
            visits = parseInt(visits) + 1;
            localStorage.setItem('realVisits', visits.toString());
            sessionStorage.setItem('sessionVisited', 'true');
            console.log(`🎯 Nueva visita registrada: ${visits} visitas totales`);
        }
        
        // Formatear número con comas
        const formattedVisits = visits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        counter.textContent = formattedVisits;
        
        // Sin animación continua - solo estático
        counter.style.animation = 'none';
    }
}



// Iniciar contador de tiempo
function startTimeCounter() {
    // Solo actualizar fecha y hora cada segundo
    setInterval(updateDateTime, 1000);
}

// Efectos de hover para enlaces
function addHoverEffects() {
    const links = document.querySelectorAll('.menu-link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.1) rotate(2deg)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
            }
        });
    });
}

// Función para actualizar fecha y hora
function updateDateTime() {
    const now = new Date();
    
    // Formatear fecha
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('es-ES', dateOptions);
    
    // Formatear hora
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const timeString = now.toLocaleTimeString('es-ES', timeOptions);
    
    // Actualizar elementos en el overlay
    const dateElement = document.getElementById('webcam-date');
    const timeElement = document.getElementById('webcam-time');
    
    if (dateElement) {
        dateElement.innerHTML = `
            <img src="https://metrosexual.lasnenasdepaquito.es/iconos/calendario.png" alt="Calendario" class="date-icon">
            ${dateString}
        `;
    }
    
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Inicializar todo cuando la página esté cargada
document.addEventListener('DOMContentLoaded', function() {
    initPage();
    
    // Actualizar fecha y hora cada segundo
    setInterval(updateDateTime, 1000);
    
    // Efecto de carga completada
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 500);
});

// Añadir estilos CSS adicionales dinámicamente
const additionalStyles = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0.5; }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes construction {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
    
    @keyframes transition {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 