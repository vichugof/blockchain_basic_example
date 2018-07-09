FROM python:3.6-alpine

WORKDIR /app

# Install dependencies.
ADD requirements.txt /app
RUN cd /app && \
    pip install -r requirements.txt

# Add actual client source code.
ADD blockchain_client.py /app

# Add static folder.
ADD static/ /app/static

# Add templating folder.
ADD templates/ /app/templates

EXPOSE 8080

CMD ["python", "blockchain_client.py", "--port", "8080"]
