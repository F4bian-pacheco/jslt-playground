# Dockerfile de desarrollo para app React + Vite usando pnpm
# No usa nginx; ejecuta el servidor de desarrollo de Vite (hot-reload)

FROM node:20-alpine AS dev

WORKDIR /app

# Habilitar corepack y pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar solo package/lock para aprovechar cache de dependencias.
# (rutas relativas al contexto: ./frontend-v2)
COPY package.json pnpm-lock.yaml* ./

# Instalar todas las dependencias (incluye dev deps)
RUN pnpm install --no-frozen-lockfile

# Copiar el resto del proyecto (context: ./frontend-v2)
COPY . .

# Hacer el servidor de Vite accesible desde fuera del contenedor
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# Comando para desarrollo: ejecutar Vite directamente para asegurar flags de host
CMD ["pnpm", "exec", "vite", "--host", "0.0.0.0", "--port", "3000"]