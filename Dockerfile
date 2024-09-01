FROM python

# set work directory
WORKDIR /usr/src/student-app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN apt update
RUN apt install nodejs -y
RUN apt install npm -y
COPY package*.json ./
RUN npm install
# RUN npm install react-router-dom@latest
COPY ./requirements.txt /usr/src/student-app/.
RUN pip install -r requirements.txt
