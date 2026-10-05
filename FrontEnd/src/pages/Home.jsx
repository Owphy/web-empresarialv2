import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css';

/* ===== INICIO: Datos de las diapositivas del carrusel ===== */
const diapositivas = [
    {
        imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
        etiqueta: 'Bienvenido',
        titulo: 'Soluciones empresariales con visión y compromiso',
        descripcion: 'Impulsamos el crecimiento de tu organización con herramientas confiables.',
    },
    {
        imagen: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
        etiqueta: 'Equipo',
        titulo: 'Personas dedicadas a tus resultados',
        descripcion: 'Un equipo multidisciplinario que acompaña cada decisión de tu negocio.',
    },
    {
        imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
        etiqueta: 'Innovación',
        titulo: 'Procesos modernos para empresas que avanzan',
        descripcion: 'Optimizamos tu operación con tecnología y buenas prácticas.',
    },
    {
        imagen: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=80',
        etiqueta: 'Confianza',
        titulo: 'Relaciones de largo plazo con cada cliente',
        descripcion: 'Transparencia, seguimiento y soporte en todo momento.',
    },
];
/* ===== FIN: Datos de las diapositivas del carrusel ===== */

/* ===== INICIO: Datos de los servicios ===== */
const servicios = [
    {
        numero: '01',
        titulo: 'Consultoría',
        descripcion: 'Analizamos los procesos de tu empresa y proponemos soluciones a la medida de tus objetivos.',
    },
    {
        numero: '02',
        titulo: 'Gestión de proyectos',
        descripcion: 'Planificamos, coordinamos y damos seguimiento a cada etapa para cumplir tiempos y presupuesto.',
    },
    {
        numero: '03',
        titulo: 'Soporte continuo',
        descripcion: 'Acompañamos a tu equipo con atención especializada y mejoras constantes.',
    },
];
/* ===== FIN: Datos de los servicios ===== */

/* ===== INICIO: Datos de las cifras (valor numérico para la animación) ===== */
const cifras = [
    { valor: 10, sufijo: '+', etiqueta: 'Años de experiencia' },
    { valor: 250, sufijo: '', etiqueta: 'Clientes atendidos' },
    { valor: 98, sufijo: '%', etiqueta: 'Satisfacción' },
    { texto: '24/7', etiqueta: 'Soporte' },
];
/* ===== FIN: Datos de las cifras ===== */

/* ===== INICIO: Detección de "movimiento reducido" del sistema ===== */
const prefiereMenosMovimiento = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* ===== FIN: Detección de "movimiento reducido" ===== */

/* ===== INICIO: Hook useRevelar (muestra un elemento al entrar en pantalla) ===== */
function useRevelar() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const elemento = ref.current;
        if (!elemento) return;

        if (prefiereMenosMovimiento() || !('IntersectionObserver' in window)) {
            setVisible(true);
            return;
        }

        const observador = new IntersectionObserver(
            ([entrada]) => {
                if (entrada.isIntersecting) {
                    setVisible(true);
                    observador.disconnect(); // se anima una sola vez
                }
            },
            { threshold: 0.2 }
        );

        observador.observe(elemento);
        return () => observador.disconnect();
    }, []);

    return [ref, visible];
}
/* ===== FIN: Hook useRevelar ===== */

/* ===== INICIO: Hook useContador (cuenta de 0 al valor final) ===== */
function useContador(valorFinal, activo, duracion = 1600) {
    const [valor, setValor] = useState(0);

    useEffect(() => {
        if (!activo || valorFinal === undefined) return;

        if (prefiereMenosMovimiento()) {
            setValor(valorFinal);
            return;
        }

        let idFrame;
        const inicio = performance.now();

        const animar = (ahora) => {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            const suavizado = 1 - Math.pow(1 - progreso, 3); // desaceleración suave
            setValor(Math.round(valorFinal * suavizado));
            if (progreso < 1) idFrame = requestAnimationFrame(animar);
        };

        idFrame = requestAnimationFrame(animar);
        return () => cancelAnimationFrame(idFrame);
    }, [valorFinal, activo, duracion]);

    return valor;
}
/* ===== FIN: Hook useContador ===== */

/* ===== INICIO: Componente Revelar (envoltorio con animación de entrada) ===== */
function Revelar({ children, retraso = 0, className = '', as: Etiqueta = 'div' }) {
    const [ref, visible] = useRevelar();

    return (
        <Etiqueta
            ref={ref}
            className={`revelar ${visible ? 'revelar-visible' : ''} ${className}`}
            style={{ transitionDelay: `${retraso}ms` }}
        >
            {children}
        </Etiqueta>
    );
}
/* ===== FIN: Componente Revelar ===== */

/* ===== INICIO: Componente Cifra (número animado) ===== */
function Cifra({ valor, sufijo, texto, etiqueta, activo }) {
    const numero = useContador(valor, activo);

    return (
        <div className="inicio-cifra">
            <span className="inicio-cifra-valor">
                {texto ?? `${numero}${sufijo}`}
            </span>
            <span className="inicio-cifra-etiqueta">{etiqueta}</span>
        </div>
    );
}
/* ===== FIN: Componente Cifra ===== */

function Inicio(){
    const [refCifras, cifrasVisibles] = useRevelar();

    return(
    /* ===== INICIO: Página de inicio ===== */
    <div className="inicio-pagina">

        {/* ===== INICIO: Carrusel de imágenes deslizantes ===== */}
        <section className="inicio-hero">
            <Carousel
                fade
                interval={6000}
                pause="hover"
                className="inicio-carrusel"
                prevLabel="Anterior"
                nextLabel="Siguiente"
            >
                {diapositivas.map((diapositiva) => (
                    <Carousel.Item key={diapositiva.titulo} className="inicio-slide">

                        {/* ===== INICIO: Imagen de fondo de la diapositiva ===== */}
                        <div
                            className="inicio-slide-imagen"
                            style={{ backgroundImage: `url(${diapositiva.imagen})` }}
                            role="img"
                            aria-label={diapositiva.titulo}
                        />
                        <div className="inicio-slide-capa" />
                        {/* ===== FIN: Imagen de fondo de la diapositiva ===== */}

                        {/* ===== INICIO: Texto de la diapositiva ===== */}
                        <div className="inicio-slide-contenido">
                            <div className="inicio-hero-contenido">
                                <span className="inicio-etiqueta">{diapositiva.etiqueta}</span>
                                <h1 className="inicio-titulo">{diapositiva.titulo}</h1>
                                <p className="inicio-descripcion">{diapositiva.descripcion}</p>

                                {/* ===== INICIO: Botones de acción ===== */}
                                <div className="inicio-acciones">
                                    <Link to="/register" className="inicio-boton inicio-boton-principal">
                                        Crear cuenta
                                    </Link>
                                    <Link to="/login" className="inicio-boton inicio-boton-secundario">
                                        Iniciar sesión
                                    </Link>
                                </div>
                                {/* ===== FIN: Botones de acción ===== */}
                            </div>
                        </div>
                        {/* ===== FIN: Texto de la diapositiva ===== */}

                    </Carousel.Item>
                ))}
            </Carousel>

            {/* ===== INICIO: Indicador para desplazarse hacia abajo ===== */}
            <a href="#servicios" className="inicio-scroll" aria-label="Ver servicios">
                <span />
            </a>
            {/* ===== FIN: Indicador para desplazarse hacia abajo ===== */}
        </section>
        {/* ===== FIN: Carrusel de imágenes deslizantes ===== */}

        {/* ===== INICIO: Sección de servicios ===== */}
        <section className="inicio-servicios" id="servicios">
            <div className="inicio-contenedor">

                {/* ===== INICIO: Encabezado de servicios ===== */}
                <Revelar className="inicio-seccion-encabezado">
                    <h2 className="inicio-seccion-titulo">Nuestros servicios</h2>
                    <p className="inicio-seccion-subtitulo">Lo que podemos hacer por tu empresa</p>
                </Revelar>
                {/* ===== FIN: Encabezado de servicios ===== */}

                {/* ===== INICIO: Tarjetas de servicios (aparición escalonada) ===== */}
                <div className="inicio-tarjetas">
                    {servicios.map((servicio, indice) => (
                        <Revelar key={servicio.numero} retraso={indice * 150}>
                            <article className="inicio-tarjeta">
                                <span className="inicio-tarjeta-numero">{servicio.numero}</span>
                                <h3 className="inicio-tarjeta-titulo">{servicio.titulo}</h3>
                                <p className="inicio-tarjeta-texto">{servicio.descripcion}</p>
                            </article>
                        </Revelar>
                    ))}
                </div>
                {/* ===== FIN: Tarjetas de servicios ===== */}

            </div>
        </section>
        {/* ===== FIN: Sección de servicios ===== */}

        {/* ===== INICIO: Banda de cifras (contadores animados) ===== */}
        <section className="inicio-cifras" ref={refCifras}>
            <div className="inicio-contenedor inicio-cifras-grid">
                {cifras.map((cifra) => (
                    <Cifra key={cifra.etiqueta} {...cifra} activo={cifrasVisibles} />
                ))}
            </div>
        </section>
        {/* ===== FIN: Banda de cifras ===== */}

        {/* ===== INICIO: Pie de página ===== */}
        <footer className="inicio-pie">
            <p>© {new Date().getFullYear()} Mi aplicación. Todos los derechos reservados.</p>
        </footer>
        {/* ===== FIN: Pie de página ===== */}

    </div>
    /* ===== FIN: Página de inicio ===== */
    );
}

export default Inicio;
