<% if (features.includes('core') || features.includes('core-preset')) { -%>
    import {request} from '@likone/core';
<% } else { -%>
    import {request} from 'umi';
<% } -%>
