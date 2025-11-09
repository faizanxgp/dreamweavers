"""
Pydantic schemas for request/response validation
"""
from .dream import (
    DreamCreate,
    DreamUpdate,
    DreamResponse,
    IstikharaDreamCreate,
    IstikharaDreamResponse
)
from .interpretation import InterpretationResponse

__all__ = [
    "DreamCreate",
    "DreamUpdate",
    "DreamResponse",
    "IstikharaDreamCreate",
    "IstikharaDreamResponse",
    "InterpretationResponse",
]
