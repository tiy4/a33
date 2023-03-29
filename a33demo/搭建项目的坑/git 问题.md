# git 分支提交代码给远程
## 如果本地仓库没有 .git 文件夹
1. 先 git init 初始化 
git add .
git commit -m 

2. 
查看已联系的远程关联
git remote -v 
结果：
origin  https://github.com/ai-dengzy/c_server.git (push)
则
删除远程关联
git remote rm origin
添加关联远程仓库
git remote add origin github.com/ai-dengzy/c_server.git

# 本地分支改名
切换到要改名的分支
git checkout name

git branch -m newname

# 删除本地分支
git branch delname -d
