from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.transform import router as transform_router

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    debug=settings.debug
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(
    transform_router,
    prefix=settings.api_v1_prefix,
    tags=["transform"]
)


@app.get("/")
async def root():
    return {
        "message": "JSLT Playground API",
        "version": settings.version,
        "docs": "/docs"
    }