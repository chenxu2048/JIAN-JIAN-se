[TOC]

# 更新日志

**2018-04-16/00:26**

* 添加获取自身用户信息的接口

**2018-04-15/21:09**

* 点赞 取消点赞
* 获取评论的同时返回点赞的结果

**2018-04-15/10:59**

* 修改评论的api

**2018-04-13/23:57**

* 添加摘走的api

**2018-04-08/10:56**

* 修复了评论的bug
* 更新一些返回格式
* 做出关于漂流相关接口id的说明



# TODO

TODO:

1. ~~评论~~
2. 摘走
3. 模糊查找
4. 点赞

# 漂流相关

url : /driftings

Attention : **在没有要求id的地方请不要在url中添加id，否则会造成404**

## 添加

POST

```json
{
    "isbn":"9787111453789",
    "content":"卓君"
}
```

返回

```json
{
    "status": "OK",
    "msg": "Success",
    "data": {
        "drifting_id": 7
    },
    "time": "2018-04-08T02:48:34.199Z"
}
```



## 修改

Url:127.0.0.1:3000/api/driftings/{drifting_id}

Method : PUT

参数:content

```JSON
{
    "content":content
}
```



## 删除

Url:127.0.0.1:3000/api/driftings/{drfiting_id}

Method : DELETE

参数：

```JSON
{
    "status": "OK",
    "msg": "Success",
    "data": {
        "success": true
    },
    "time": "2018-04-08T02:51:30.181Z"
}
```



## 获取

get

会返回全部漂流信息

返回格式:

```json
{
    "status": "OK",
    "msg": "Success",
    "data": {
        "result": [
            {
                "isbn": "9787535672100",
                "title": "写给大家的西方美术史",
                "author": "蒋勋",
                "title_page_image": "https://img3.doubanio.com/lpic/s28101992.jpg",
                "drifting_id": 6,
                "content": null,
                "nick_name": "罗沦",
                "avator_url": "https://wx.qlogo.cn/mmopen/vi_32/VscoDFHXorE80U6WzmG3iaP55hJx0h5zHgBJ3JXRwAgNvjF3eS480ibdwIicTUzyD4n9IfPPkhooZtkpS7oasl0TA/0"
            },
            {
                "isbn": "9787111453789",
                "title": "计算机网络（第6版）",
                "author": "[美] James F.Kurose;[美] Keith W.Ross",
                "title_page_image": "https://img3.doubanio.com/lpic/s27667093.jpg",
                "drifting_id": 4,
                "content": "4534534534534534534534534534534534532134535435432312312321321313132132132131",
                "nick_name": "Bob Wu",
                "avator_url": "https://wx.qlogo.cn/mmopen/vi_32/g2EeSDdHytSzM2vLngbEeYibzrWPpSkMekuC3yc5Tzibz88SIkzbbu7Gibqr1MrJic2kV9NU3GTViceQiax3dfiadj9Mw/0"
            }
        ]
    },
    "time": "2018-04-08T02:47:30.143Z"
}
```

# 评论相关

/comment

## 获取

/api/comment?squareId=32

GET

获取某条动态的评论信息

样例：

* 请求URL:http://127.0.0.1:3000/api/comment?squareId=14

* 返回数据:

  ```json
  {
      "status": "OK",
      "msg": "Success",
      "data": {
          "comments": [
              {
                  "comment_id": 11,
                  "square_square_id": 32,
                  "comment_user_id": 1,
                  "content": "卓君修改",
                  "add_time": "2018-04-14T18:58:35.000Z",
                  "user_id": 1,
                  "nick_name": "Bob Wu",
                  "avator_url": "https://wx.qlogo.cn/mmopen/vi_32/g2EeSDdHytSzM2vLngbEeYibzrWPpSkMekuC3yc5Tzibz88SIkzbbu7Gibqr1MrJic2kV9NU3GTViceQiax3dfiadj9Mw/0",
                  "open_id": "oWxUG0THs46X8hZFoXzw83Ry2nik"
              }
          ],
          "zanNum": 0,
          "whetherZanByMe": false
      },
      "time": "2018-04-15T13:12:43.811Z"
  }
  ```

  ​

## 添加

url:localhost:3000/api/comment?squareId=32

Method:JSON

```json
{
    "comment":"卓君修改"
}
```

成功返回：

```JSON
{
    "status": "OK",
    "msg": "Success",
    "data": {},
    "time": "2018-04-15T03:00:40.052Z"
}
```



# 广场相关

Url:127.0.0.1:3000/api/square_sentences

Method:GET

```jSon
{
    "status": "OK",
    "msg": "Success",
    "data": [
        {
            "square_id": 23,
            "author_user_id": 2,
            "thoughts": "test",
            "add_time": "2018-04-07T08:16:16.000Z",
            "isbn": "9787535672100",
            "nick_name": "罗沦",
            "avator_url": "https://wx.qlogo.cn/mmopen/vi_32/VscoDFHXorE80U6WzmG3iaP55hJx0h5zHgBJ3JXRwAgNvjF3eS480ibdwIicTUzyD4n9IfPPkhooZtkpS7oasl0TA/0",
            "title": "写给大家的西方美术史",
            "author": "蒋勋",
            "title_page_image": "https://img3.doubanio.com/lpic/s28101992.jpg",
            "sentences": [
                {
                    "content": "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
                    "thought": "11111111111111111111111111111111111122222222222222222222222222222222222222222222222",
                    "sentence_id": 10
                },
                {
                    "content": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
                    "thought": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
                    "sentence_id": 11
                }
            ]
        }
    ],
    "time": "2018-04-08T02:46:27.669Z"
}
```

## 摘走

url : /api/sentence/{square_id}

Method : POST

Attention: **不要随便添加 id选项**

成功调用：

```shell
{
    "status": "OK",
    "msg": "Success",
    "data": {},
    "time": "2018-04-13T16:16:03.332Z"
}
```

调用失败:

```shell
{
    "status": "NOT_FOUND",
    "msg": "当前动态不存在",
    "data": {},
    "time": "2018-04-13T16:16:46.695Z"
}
```



# 点赞相关

## 点赞

url : localhost:3000/api/zan?squareId=?

method : POST

成功：

```json
{
    "status": "OK",
    "msg": "Success",
    "data": {
        "result": true
    },
    "time": "2018-04-15T13:11:35.819Z"
}
```

失败:

```json
{
    "status": "OK",
    "msg": "Success",
    "data": {
        "result": false
    },
    "time": "2018-04-15T13:11:48.524Z"
}
```

## 取消点赞

url : localhost:3000/api/zan?squareId=?

method : DELETE

成功：

```json
{
    "status": "OK",
    "msg": "Success",
    "data": {
        "result": true
    },
    "time": "2018-04-15T13:11:35.819Z"
}
```

失败:

```json
{
    "status": "OK",
    "msg": "Success",
    "data": {
        "result": false
    },
    "time": "2018-04-15T13:11:48.524Z"
}
```

### 

# 用户相关

## 获取自身用户信息

url : /api/user/self

Method : GET

返回信息：

```json
{
    "status": "OK",
    "msg": "Success",
    "data": {
        "self": {
            "user_id": 1,
            "nick_name": "Bob Wu",
            "avator_url": "https://wx.qlogo.cn/mmopen/vi_32/g2EeSDdHytSzM2vLngbEeYibzrWPpSkMekuC3yc5Tzibz88SIkzbbu7Gibqr1MrJic2kV9NU3GTViceQiax3dfiadj9Mw/0",
            "open_id": "******************"
        }
    },
    "time": "2018-04-15T16:26:18.589Z"
}
```

