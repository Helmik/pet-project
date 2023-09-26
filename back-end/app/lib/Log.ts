'use strict';

const chalk = require('chalk');

export default class Log {
  moduleName : string;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  success(msg: string) {
    console.log(`${chalk.bgGreen('[' + this.moduleName + '] ')} ${chalk.gray(new Date().toUTCString())} ${msg}`);
  }

  warning(msg: string) {
    console.log(`${chalk.bgYellow('[' + this.moduleName + '] ')} ${chalk.gray(new Date().toUTCString())} ${msg}`);
  }

  error(msg: string) {
    console.log(`${chalk.bgRed('[' + this.moduleName + '] ')} ${chalk.gray(new Date().toUTCString())} ${msg}`);
  }

  info(msg: string) {
    console.log(`${chalk.bgBlue('[' + this.moduleName + '] ')} ${chalk.gray(new Date().toUTCString())} ${msg}`);
  }
}
