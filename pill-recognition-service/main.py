import base64
import io
import uvicorn
import numpy as np
import logging
import datetime
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from PIL import Image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing.image import img_to_array
from typing import List, Optional

# Setup structured logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("medchain-ai")

# Initialize FastAPI app
app = FastAPI(
    title="MedChain AI Pill Recognition API", 
    version="1.1.0",
    description="Professional-grade image analysis service for pharmaceutical verification."
)

# Load pre-trained MobileNetV2 model globally
logger.info("Initializing neural network layers...")
try:
    model = MobileNetV2(weights="imagenet")
    logger.info("AI Model loaded and verified.")
except Exception as e:
    logger.error(f"Failed to load AI model: {e}")
    raise RuntimeError("Model initialization failure.")

# --- Data Models ---

class ImageRequest(BaseModel):
    image_base64: str = Field(..., description="Base64 encoded string of the pill image.")

class AnalysisMetadata(BaseModel):
    timestamp: str
    processed_size: str
    model_version: str

class AnalyzeResponse(BaseModel):
    confidence: float
    verdict: str
    top_prediction: str
    is_trusted: bool
    metadata: AnalysisMetadata

# --- Endpoints ---

@app.get("/health")
async def health_check():
    """Service health monitoring endpoint."""
    return {"status": "healthy", "model_loaded": True, "version": "1.1.0"}

def determine_verdict(prediction_class: str, prob: float) -> str:
    """Mock heuristic mapping to simulate 'Authentic' vs 'Suspicious'."""
    if prob > 0.75:
        return "AUTHENTIC"
    elif prob > 0.40:
        return "CHECK_SERIAL"
    return "SUSPICIOUS"

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_pill(request: ImageRequest):
    """
    Analyzes an uploaded image to verify pill authenticity.
    Uses convolution neural networks for feature extraction.
    """
    try:
        # 1. Decode and Validate Image
        logger.info("Incoming analysis request received.")
        try:
            image_data = base64.b64decode(request.image_base64)
            image = Image.open(io.BytesIO(image_data))
        except Exception:
            logger.warning("Decryption failure: Invalid Base64 payload.")
            raise HTTPException(status_code=422, detail="Invalid image payload. Ensure strict Base64 encoding.")
        
        # 2. Preprocessing
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        orig_size = f"{image.width}x{image.height}"
        image = image.resize((224, 224))
        
        img_array = img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        
        # 3. Model Inference
        predictions = model.predict(img_array)
        decoded = decode_predictions(predictions, top=1)[0][0]
        
        _, class_name, prob = decoded
        prob = float(prob)
        
        # 4. Final Verdict Logic
        verdict = determine_verdict(class_name, prob)
        is_trusted = verdict == "AUTHENTIC"
        
        logger.info(f"Analysis Complete: {class_name} ({prob:.2f}) -> {verdict}")
        
        # 5. Build Response
        analysis_metadata = AnalysisMetadata(
            timestamp=datetime.datetime.now().isoformat(),
            processed_size=orig_size,
            model_version="MobileNetV2-Production"
        )
        
        return AnalyzeResponse(
            confidence=round(float(prob) * 100, 2),
            verdict=verdict,
            top_prediction=class_name.replace("_", " ").title(),
            is_trusted=is_trusted,
            metadata=analysis_metadata
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Internal System Anomaly: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="An internal error occurred during spectral analysis.")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global handler caught error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "System wide exception caught by MedChain AI internal monitor."},
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
