'use strict';

const elmCss = require('elm-css');
const path = require('path');

class ElmCSSCompiler {
  constructor(config) {
    // Get the config
    this.config = config;
    this.pluginConfig = config.plugins.elmCss || {};
    this.ranAtLeastOnce = false;

    // Ensure a sourcePath was specified by the user
    if (!this.pluginConfig.sourcePath) {
      throw "missing required config: `sourcePath`";
    }

    // Match the main source path (e.g. Stylesheets.elm) plus all other
    // files that could potentially affect our CSS output
    //
    // Default here is any .elm file, but the user can make this more
    // specific in their brunch-config
    this.pattern = new RegExp(
      (new RegExp(this.pluginConfig.pattern || /\.elm/)).source + '|' +
      (new RegExp(this.pluginConfig.sourcePath)).source
    );
  }
  compile(file) {
    if (file.path !== this.pluginConfig.sourcePath && !this.ranAtLeastOnce) {
      // The initial build will match everything, but we don't want to
      // build elm-css for n number of files, just once is fine.
      //
      // Going forward, rebuilds will only pass the matched file that
      // was modified.
      return;
    }
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
  onCompile() {
    this.ranAtLeastOnce = true;
  }
}

ElmCSSCompiler.prototype.brunchPlugin = true;
ElmCSSCompiler.prototype.type = 'stylesheet';
ElmCSSCompiler.prototype.extension = 'elm';
ElmCSSCompiler.prototype.targetExtension = 'css';

module.exports = ElmCSSCompiler;
