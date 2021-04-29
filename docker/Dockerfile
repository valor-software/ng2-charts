FROM ubuntu
RUN apt update
RUN apt-get -y install build-essential checkinstall libssl-dev curl git
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash
ENV NVM_DIR="/root/.nvm"
WORKDIR /root
RUN \. "$NVM_DIR/nvm.sh" && \. "$NVM_DIR/bash_completion" && nvm install 14.6.0
ENV PATH=/root/.nvm/versions/node/v14.6.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
RUN npm i -g npm
# RUN git clone -b development https://github.com/valor-software/ng2-charts.git
# RUN cd ng2-charts ;\
#     npm ci
WORKDIR /mnt
CMD ["npm", "run", "build:lib"]
