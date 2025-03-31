const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

const options = {
    theme: 'bootstrap',
    jsonFile: path.join(reportsDir, 'cucumber_report.json'),
    output: path.join(reportsDir, 'cucumber_report.html'),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "Test",
        "Browser": "Headless",
        "Platform": "API Testing",
        "Executed": "API"
    }
};

reporter.generate(options);
