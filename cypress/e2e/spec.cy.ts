describe('Ng2 Charts Demo', () => {
  it(`navigate to main Demo page and check info`, () => {
    const topBarSelector = 'mat-toolbar';
    const mainContentSelector = 'main';
    cy.visit('');
    cy.wait(1000);
    cy.get(topBarSelector)
      .should('be.visible')
      .matchImage();

    cy.get(mainContentSelector).should('be.visible');
  });
});

describe('Charts canvas ', () => {
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
    it(`${component.url}`, () => {
      cy.visit(component.url);
      cy.wait(1000);
      cy.get(component.selector)
        .find('canvas')
        .should('be.visible')
        .matchImage();
    });
  });
});
