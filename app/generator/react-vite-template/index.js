const Generator = require('yeoman-generator')
const BasicGenerator = require('../../BasicGenerator')
const {getNameByRepository} = require('../../constants')

module.exports = class Generator extends BasicGenerator {
  prompting() {
    return this.prompt([
      {
        name:'repository',
        message:'请输入你的git仓库地址(eg:xxxx)'
      },
      {
        type:'input',
        name:'envPort',
        default:'8000',
        message:'请输入的你端口号:（默认:8000)'
      },
      {
        type: 'checkbox',
        name: 'features',
        message: '请选择你你要安装的模块',
        default: ["tailwind", "antd", "ahooks"],
        choices: [
          { name: 'tailwind', value: 'tailwind' },
          { name: "antd", value: "antd" },
          { name: 'ahooks', value: 'ahooks' },
        ]
      },
    ])
      .then(props => {
        const {name,moduleName,packageName} = getNameByRepository(props.repository)
        this.props = {...props,name,moduleName,packageName}
      })
  }

  default() {
    console.log('clone...');
    const path =
      this.perfix.length > 0
        ? `${this.perfix}/${this.props.moduleName}`
        : this.props.moduleName;
   
    this.spawnCommandSync('git', ['clone', this.props.repository, path]);
  }

  writing() {
    this.writeFiles({context:this.props})
  }
}
