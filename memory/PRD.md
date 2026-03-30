# Casa Juan Restaurant - PRD

## Problem Statement
Crear página web de reservas para Rest. Casa Juan - restaurante de comida casera canaria en Adeje, Tenerife.

## User Choices
- Sistema de reservas con calendario interactivo
- Menú del restaurante incluido
- Multiidioma: Español, Inglés, Alemán
- Google Maps integrado
- Logo proporcionado por el usuario

## User Personas
1. **Turistas** (EN/DE): Visitantes de Alemania y países angloparlantes buscando comida local auténtica
2. **Locales** (ES): Residentes de Adeje que buscan comer bien a buen precio
3. **Grupos/Familias**: Reservas para comidas familiares con varias personas

## Core Requirements
- Landing page atractiva con hero section
- Sistema de reservas funcional con calendario y selección de hora
- Carta del restaurante con platos canarios
- Información de contacto y ubicación con mapa
- FAQ sobre servicios del restaurante
- Soporte multiidioma (ES/EN/DE)

## What's Been Implemented (2026-03-30)

### Backend (/app/backend/server.py)
- API REST con FastAPI
- Endpoints: `/api/menu`, `/api/reservations`, `/api/time-slots`
- CRUD completo para reservas
- Menú con 8 platos canarios típicos en 3 idiomas

### Frontend
- Header con logo, navegación y selector de idioma
- Hero section con CTA de reserva
- Stats ribbon (4.7★, 1900+ reseñas, 10-20€)
- Sección de menú con tabs por categorías
- Sistema de reservas con calendario Shadcn
- Sección "Por qué elegir Casa Juan"
- FAQ con acordeón
- Sección de contacto con Google Maps embed
- Footer con CTA final

### Features
- Multiidioma completo (ES/EN/DE)
- Calendario interactivo para reservas
- Selector de hora y comensales
- Formulario de reserva con validación
- Navegación smooth scroll
- Diseño responsive

## Prioritized Backlog

### P0 (Completado)
- [x] Landing page funcional
- [x] Sistema de reservas
- [x] Multiidioma
- [x] Menú del restaurante

### P1 (Futuro)
- [ ] Confirmación por email real (requiere servicio de email)
- [ ] Panel de administración para gestionar reservas
- [ ] Galería de fotos del local/platos

### P2 (Mejoras)
- [ ] Sistema de reviews/testimonios
- [ ] Integración con WhatsApp para reservas
- [ ] SEO optimizado

## Next Tasks
1. Implementar envío de emails de confirmación (Resend/SendGrid)
2. Crear panel admin para gestionar reservas
3. Añadir más platos al menú
