
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');
const clipboardy = require('clipboardy');
const yeoman = require('yeoman-environment');

const cliPath = path.resolve(__dirname,'..');

const generators = fs
  .readdirSync(`${cliPath}/app/generator`)
  .filter((f) => !f.startsWith('.'))
  .map((f) => {
    
    return {
      name: `${f.padEnd(15)} - ${chalk.gray(require(`../app/generator/${f}/meta.json`).description)}`,
      value: f,
      short: f,
    };
  });

const runGenerator = async (generatorPath, { name = '', cwd = process.cwd(), args = {} }) => {
  return new Promise((resolve) => {
    if (name) {
      mkdirp.sync(name);
      cwd = path.join(cwd, name);
    }
    
    const Generator = require(generatorPath);
    const env = yeoman.createEnv([], {
      cwd,
    });
    
    const generator = new Generator({
      name,
      env,
      resolved: require.resolve(generatorPath),
      args,
    });

    return generator.run(() => {
      if (name) {
        if (process.platform !== `linux` || process.env.DISPLAY) {
          clipboardy.writeSync(`cd ${name}`);
          console.log('📋 Copied to clipboard, just use Ctrl+V');
        }
      }
      console.log('✨ File Generate Done');
      resolve(true);
    });
  });
};

const run = async (config) => {
  process.send && process.send({ type: 'prompt' });
  process.emit('message', { type: 'prompt' });

  let { type } = config;
  if (!type) {
    const answers = await inquirer.prompt([
      {
        name: 'type',
        message: '选择你要使用的模块',
        type: 'list',
        choices: generators,
      },
    ]);
    type = answers.type;
  }

  try {
    return runGenerator(`../app/generator/${type}`, config);
  } catch (e) {
    console.error(chalk.red(`> 模板创建失败`), e);
    process.exit(1);
  }
};


module.exports = run 