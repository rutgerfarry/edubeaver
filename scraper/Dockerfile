FROM ubuntu:14.04
MAINTAINER Rutger Farry <rutgerfarry@gmail.com>
ENV REFRESHED_AT 2015-5-5

RUN apt-get update
RUN apt-get install -yqq curl
RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
RUN apt-get install -yqq nodejs

COPY . /src
RUN cd /src