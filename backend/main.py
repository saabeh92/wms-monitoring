import uvicorn
from app.routes import app

if __name__ == "__main__":
    uvicorn.run("app.routes:app", host="127.0.0.1", port=8000, reload=True)
