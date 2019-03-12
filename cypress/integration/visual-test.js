describe('Snapshot test', () => {
  const browsers = [{
    name: 'chrome',
    browserVersion: 'latest',
    width: 360,
    height: 640
  }, {
    name: 'firefox',
    browserVersion: 'latest',
    width: 1366,
    height: 768
  }, {
    name: 'chrome',
    browserVersion: 'latest',
    width: 1366,
    height: 768
  }];

  describe('Main Page', () => {
    it(`navigate to main Demo page and check info`, () => {
      const topBarSelector = 'mat-toolbar';
      const mainContentSelector = 'main';
      cy.visit('');

      cy.get(topBarSelector).should('be.visible')
        .eyesOpen({
          appName: 'NG2-charts',
          testName: `NG2-charts Main Page Top Bar`,
          browser: browsers
        })
        .eyesCheckWindow({
          sizeMode: 'selector',
          selector: topBarSelector,
          sendDom: false,
        })
        .eyesClose();

      cy.get(mainContentSelector).should('be.visible')
        .eyesOpen({
          appName: 'NG2-charts',
          testName: `NG2-charts Main Page Content`,
          browser: browsers
        })
        .eyesCheckWindow({
          sizeMode: 'selector',
          selector: mainContentSelector,
          sendDom: false,
        })
        .eyesClose();
    });
  });

  describe.only('Charts Page', () => {
    const componentsArray = [
      {url: '/#LineChart', selector: 'app-line-chart'},
      {url: '/#BarChart', selector: 'app-bar-chart'},
      {url: '/#DoughnutChart', selector: 'app-doughnut-chart'},
      {url: '/#RadarChart', selector: 'app-radar-chart'},
      {url: '/#PieChart', selector: 'app-pie-chart'},
      {url: '/#PolarAreaChart', selector: 'app-polar-area-chart'},
      {url: '/#BubbleChart', selector: 'app-bubble-chart'},
      {url: '/#ScatterChart', selector: 'app-scatter-chart'},
      {url: '/#DynamicChart', selector: 'app-dynamic-chart'}
    ];

    componentsArray.forEach(component => {
      it(`navigate to each Demo and check example: ${component.url}`, () => {
        cy.visit(component.url);
        cy.get(`${component.selector} div`)
          .should('be.visible')
          .find('canvas')
          .should('be.visible')
          .eyesOpen({
            appName: 'NG2-charts',
            testName: `NG2-charts ${component.url}`,
            browser: browsers
          })
          .eyesCheckWindow({
            sizeMode: 'selector',
            selector: `${component.selector}`,
            sendDom: false,
          })
          .eyesClose();
      });
    });
  });
});
