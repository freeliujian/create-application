import { useRequest } from 'ahooks'
import { Button, message } from 'antd'

function Home() {
	const {
		loading: fetchLoading,
		runAsync: handleFakeFetch
	} = useRequest(
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
  );

  return (
    <>
      <div>
        <Button loading={fetchLoading} onClick={handleFakeFetch}>
          点击请求
        </Button>
      </div>
      <div>
        <Button>
          <a href="/about">路由切换</a>
        </Button>
      </div>
      <div>
        <Button>
          <a href="/antd-demo">AntD Demo</a>
        </Button>
      </div>
    </>
  );
}

export default Home;
