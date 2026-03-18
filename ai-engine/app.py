from fastapi import FastAPI
import requests

app = FastAPI()

# Simple memory (later → database)
failure_count = 0

def analyze_failure(error_message):
    if "500" in error_message:
        return "Payment service instability detected"
    if "EAI_AGAIN" in error_message:
        return "Service unreachable (network/DNS issue)"
    return "Unknown failure"

@app.get("/")
def root():
    return {"message": "AI Engine Running"}

@app.get("/analyze")
def analyze():
    global failure_count

    try:
        res = requests.get("http://localhost:3003/order")
        return {
            "status": "All systems healthy",
            "data": res.json()
        }

    except Exception as e:
        failure_count += 1

        diagnosis = analyze_failure(str(e))

        return {
            "status": "Failure detected",
            "error": str(e),
            "diagnosis": diagnosis,
            "failure_count": failure_count
        }