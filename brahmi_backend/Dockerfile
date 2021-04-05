FROM python:3.7

WORKDIR /brahmi_backend/

COPY requirements.txt .

RUN apt-get update && apt-get install -y python3-opencv
RUN pip3 install -r requirements.txt

COPY . .

CMD python3 controller.py