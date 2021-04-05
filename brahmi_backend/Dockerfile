FROM python:3.7

WORKDIR /brahmi_backend/

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

CMD python3 controller.py