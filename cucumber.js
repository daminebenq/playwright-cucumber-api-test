module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step_definitions/**/*.js'],
    format: [
      'summary',
      'json:reports/cucumber_report.json',
      'html:reports/cucumber_report.html'
    ],
  }
}
