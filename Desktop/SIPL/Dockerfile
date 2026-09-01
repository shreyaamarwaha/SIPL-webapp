FROM python:3.12-slim

WORKDIR /app

# Copy requirements
COPY backend/requirements-prod.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements-prod.txt

# Copy application code
COPY backend/ .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "ml.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
