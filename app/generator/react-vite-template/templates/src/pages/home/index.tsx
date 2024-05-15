
<% if (features.includes('ahooks')) { -%>
import { useRequest } from 'ahooks'
<% } -%>
<% if(features.includes('antd')){ -%>
import { Button, message } from 'antd'
<% } -%>
  
function Home() {

  <% if (features.includes('ahooks')) { -%>
    <% } -%>
	const {
		loading: fetchLoading,
		runAsync: handleFakeFetch
  } = {

    <% if (features.includes('ahooks')) { -%>
      useRequest(
        () => {
          return fetch(window.location.href).then((res) => {
            return res.text();
          });
        },
        {
          manual: true,
          onSuccess: (res) => {
            console.log("请求结果", res);
            message.success('请求成功')
          },
        }
      )
    <% } -%>
   
  };

  return (
    <>
      <div>
        <button loading={fetchLoading} onClick={handleFakeFetch}>
          点击请求
        </button>
      </div>
      <div>
        <button>
          <a href="/about">路由切换</a>
        </button>
      </div>
      <div>
        <button>
          <a href="/antd-demo">AntD Demo</a>
        </button>
      </div>
    </>
  );
}

export default Home;
