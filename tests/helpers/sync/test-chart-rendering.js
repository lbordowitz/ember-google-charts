import hbs from 'htmlbars-inline-precompile';

export default function testChartRendering(assert, {
  context,
  template,
  type,
  usingMaterialCharts,
}) {
  const capitalizedType = Ember.String.capitalize(type);
  const constructorName = usingMaterialCharts ? capitalizedType : `${capitalizedType}Chart`;
  const done = assert.async();

  assert.expect(6);

  context.on('chartDidRender', (chart) => {
    const $component = context.$('div:first-child');
    const google = window.google;
    const googlePackage = usingMaterialCharts ? google.charts : google.visualization;
    const constructor = googlePackage[constructorName];

    assert.ok(!!googlePackage,
      `The required Google package should have loaded`);

    assert.ok(!!constructor,
      `The ${constructorName} visualization constructor should be available`);

    assert.ok($component.find('svg').length,
      'The component should have an SVG rendered inside it');

    assert.ok($component.hasClass(`${type}-chart`),
      `The component should have the ${type}-chart class`);

    assert.ok($component.hasClass('google-chart'),
      'The component should have the google-chart class');

    assert.equal(chart.constructor, constructor,
      `The component should have a public chart property created by ${constructorName}`);

    done();
  });

  context.render(template);
}
