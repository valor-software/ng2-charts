FROM cypress/included:5.1.0
WORKDIR /root/ng2-charts
COPY . .
RUN npm i
RUN npm i -g gulp
WORKDIR /root/ng2-charts/chartjs-chart-financial
RUN npm i
WORKDIR /root/ng2-charts
RUN npm run build:financial
RUN npm run build:lib
RUN npm run build
ENTRYPOINT [ ]
