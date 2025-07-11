from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.config import settings
from src import models
from src.helpers.database import engine
from src.routers.users import router as user_router

models.Base.metadata.create_all(bind=engine)

origins = [
        "http://localhost:3000",
        "http://localhost:3000/?",   
]

if (settings.debugging):
    app = FastAPI(debug=True, reload=True, port=5006)
else:
    app = FastAPI(port=5006)


@app.get("/healthcheck", include_in_schema=False)
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

app.include_router(user_router)
