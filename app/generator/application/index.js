const Generator = require('yeoman-generator')
const BasicGenerator = require('../../BasicGenerator')
const {getNameByRepository} = require('../../utils')
const {existsSync,readFileSync,rmSync} =require('fs')

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
        type:'checkbox',
        name:'features',
        message:'请选择你你要安装的模块',
        default:["qiankun","gulp"],
        choices:[
          {name:'@umijs/plugin-qiankun',value:'qiankun'},
          {name:"gulp",value:"gulp"}
        ]
      },
      {
        type:'list',
        name:'startRouter',
        message:'是否开启约定式路由',
        default:'yes',
        choices:[
          "yes",
          "no",
        ],
      }
    ])
      .then(props => {
        let gitModules = []
       
        const {name,moduleName,packageName} = getNameByRepository(props.repository)
        try {
          const gitModulesContent = readFileSync(this.destinationPath('.gitmodules'), {
            encoding: 'utf-8',
          });
          
          gitModules =
            typeof gitModulesContent === 'string' &&
            gitModulesContent
              .split('\n')
              .filter((i) => i.startsWith('[') && i.endsWith(']'))
              .map((i) => i.split('/')[1].replace('"]', ''));
              
        } catch (e) {
         
          throw new Error('解析.gitmodules失败!');
        }
        if (
          existsSync(this.destinationPath(this.perfix, moduleName)) ||
          gitModules.indexOf(moduleName) > -1
        ) {
          throw new Error('该模块已存在');
        }
        
        this.props = {...props,name,moduleName,packageName}
      })
  }

  default() {
    console.log('clone submodule...');
    const path =
      this.perfix.length > 0
        ? `${this.perfix}/${this.props.moduleName}`
        : this.props.moduleName;
   
    this.spawnCommandSync('git', ['clone', this.props.repository, path]);
  }

  writing() {
    const {features} = this.props;
    const isGulp = (file) => {
      if(!features.includes('gulp')){
        return file != 'gulpfile.js'
      }else{
        return true
      }
    }
    this.writeFiles({context:this.props, filterFiles:isGulp})
  }
}
