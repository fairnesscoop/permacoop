FROM node:16

WORKDIR /root/permacoop

RUN git clone https://github.com/fairnesscoop/permacoop.git .
RUN git checkout feat-hotwire
RUN make install-deps
RUN make build

CMD ["make", "start-dist"]
