FROM node:carbon
MAINTAINER jimmy "jimmy@spiffyventures.com"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Ensure image is capable of fetching deps over ssh
RUN apt-get update -qqy
RUN apt-get install -qqy ca-certificates git-core ssh

# Setup ssh; redirect to use ssh when fetching private github deps
ADD ./id_rsa /root/.ssh/
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config
RUN git config --global url.ssh://git@github.com/.insteadOf https://github.com/

RUN git clone git@github.com:strap/strap_docsite.git /usr/src/app

RUN npm install

EXPOSE 8124

CMD ["node", "server.js"]