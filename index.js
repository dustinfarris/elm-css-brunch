'use strict';

const elmCss = require('elm-css');
const path = require('path');

class ElmCSSCompiler {
  constructor(config) {
    this.config = config;
    this.pluginConfig = config.plugins.elmCss || {};
    if (!this.pluginConfig.sourcePath) {
      throw "missing required config: `sourcePath`";
    }
    this.pattern = new RegExp(this.pluginConfig.sourcePath);
  }
  compile(file) {
    return elmCss(
      this.pluginConfig.projectDir || process.cwd(),
      this.pluginConfig.sourcePath,
      this.pluginConfig.outputDir || 'css',
      this.pluginConfig.moduleName || 'Stylesheets',
      this.pluginConfig.portName || 'files',
      this.pluginConfig.pathToMake
    ).then(function(results) {
      console.log('elm-css-brunch: The following CSS files were created: ');
      results.forEach(function(result) {
        console.log('\t- ' + result.filename);
      });
    });
  }
}

ElmCSSCompiler.prototype.brunchPlugin = true;
ElmCSSCompiler.prototype.type = 'stylesheet';
ElmCSSCompiler.prototype.extension = 'elm';
ElmCSSCompiler.prototype.targetExtension = 'css';

module.exports = ElmCSSCompiler;
