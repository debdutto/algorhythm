#####################################################
# Docker file to build hackathon website
# based on latest nodejs version
#####################################################

#pull the latest base image for nodejs
FROM node:carbon

# Expose the default web and net port
EXPOSE 80

# Add project files
ADD src /home/code/
WORKDIR /home/code/

ADD etc /etc

# install dependencies and cleanup temp directories
# RUN yum install -y tar curl which wget git make zeromq-devel krb5-devel xz openssl-devel lua-devel cronie gcc-c++ && \
# RUN cd /home/code
RUN npm install
RUN rm -rf /tmp/* /root/.npm /root/.node-gyp

#run the app using supervisor
ENTRYPOINT /usr/bin/supervisord -n -c /etc/supervisord.conf