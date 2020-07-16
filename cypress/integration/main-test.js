const browsers = [{
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
        target: 'window',
        selector: topBarSelector,
        sendDom: false,
      })
      .eyesClose();

    cy.get(mainContentSelector).should('be.visible');
  });
});

describe('Charts screenshot', () => {
  const componentsArray = [
    {url: '/#/LineChart', selector: 'app-line-chart'},
    {url: '/#/BarChart', selector: 'app-bar-chart'},
    {url: '/#/DoughnutChart', selector: 'app-doughnut-chart'}
  ];

  componentsArray.forEach(component => {
    it(`${component.url}`, () => {
      cy.visit(component.url);
      cy.get(component.selector).find('canvas').root().wait(200).screenshot();
    });
  });
});
