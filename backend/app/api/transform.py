from fastapi import APIRouter, HTTPException
from app.models.transform import (
    TransformRequest,
    TransformResponse,
    JSLTValidationRequest,
    JSLTValidationResponse
)
from app.services.jslt_service import JSLTService

router = APIRouter()
jslt_service = JSLTService()


@router.post("/transform", response_model=TransformResponse)
async def transform_json(request: TransformRequest):
    try:
        return jslt_service.transform(request.input_json, request.jslt_expression)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/validate", response_model=JSLTValidationResponse)
async def validate_jslt(request: JSLTValidationRequest):
    try:
        return jslt_service.validate_jslt(request.jslt_expression)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "JSLT Playground API"}