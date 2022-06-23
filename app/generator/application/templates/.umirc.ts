import { defineConfig } from 'umi';
import { join } from 'path';

export default defineConfig({
  <% if(startRouter ==='no') { -%>
  routes: [{ path: '/', component: '@/pages/index' }],
  <% } -%>
  base:'/<%= moduleName %>',
  devtool: false,
  dynamicImport: {},
  <%  if(features.includes('qiankun')){ -%>
    qiankun: {
      slave: {},
    },
  <% } %>
});
