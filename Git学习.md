官网book:<https://www.git-scm.com/book/en/v2>
中文版book:<https://www.git-scm.com/book/zh/v2>
## 1.Getting Started
安装完成后，初次运行前的配置

### 查看所有配置信息

	git config --list

### 检查某一项配置信息

	git config user.name

结果:wangyichen1064431086

### 获取帮助

	git help <verb>

例如：

	git help commit
	git help config

就会分别打开commit和config命令的手册。s无需联网。

## 2. Git基础

### 2.1在现有目录中初始化Git仓库
 
cd 到现有的非git目录中,eg:

	E:\> cd:/GitHub/gitTest

输入命令：

	git init

将创建一个名为.git的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这些文件是 Git 仓库的骨干。 但是，在这个时候，我们仅仅是做了一个初始化的操作，你的项目里的文件还没有被跟踪。

指定目录中已有文件为跟踪文件：

	git add test1.md

commit一条变化：

	git commit -m 'initial project version'

### 克隆现有仓库

Git 克隆的是该 Git 仓库服务器上的几乎所有数据，而不是仅仅复制完成你的工作所需要文件。
 
克隆现有的远程仓库到当前目录：

	git clone https://github.com/FTChinese/NEXT

这会在当前目录下创建一个名为 “NEXT” 的目录，并在这个目录下初始化一个 .git 文件夹，从远程仓库拉取下所有数据放入 .git 文件夹，然后从中读取最新版本的文件的拷贝。

如果想为克隆的仓库自定义本地仓库的名字，你可以使用如下命令：
	
	git clone https://github.com/FTChinese/NEXT FtNestMyCLone

### 提交每次更新到本地仓库
**你工作目录下的每一个文件都不外乎这两种状态：已跟踪或未跟踪。** 已跟踪的文件是指那些被纳入了版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后，它们的状态可能处于**未修改，已修改或已放入暂存区**。

未跟踪文件既不存在于上次快照的记录中，也没有放入暂存区。 初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态。

编辑过某些文件之后，由于自上次提交后你对它们做了修改，Git 将它们标记为已修改文件。 我们逐步将这些修改过的文件放入暂存区，然后提交所有暂存了的修改，如此反复。

#### 查看哪些文件处于什么状态：

	git status

结果为：

	On branch master
	nothing to commit, working directory clean

说明：

1. 所有已跟踪文件在上次提交后都未被更改过。
2. 当前目录下没有出现任何处于未跟踪状态的新文件，否则 Git 会在这里列出来。
3. 示了当前所在分支，并告诉你这个分支同远程服务器上对应的分支没有偏离。 现在，分支名是 “master”,这是默认的分支名。


如在该当前创建一个新文件test2.md,则运行git status,结果为：

	On branch master
	Untracked files:
	  (use "git add <file>..." to include in what will be committed)
	
	   test2.md
	
	nothing added to commit but untracked files present (use "git add" to track)

#### 跟踪新文件

	git add test2.md
git add 命令使用文件或目录的路径作为参数；如果参数是目录的路径，该命令将递归地跟踪该目录下的所有文件。

此时再运行git status,结果为：

	On branch master
	Changes to be committed:
  	(use "git reset HEAD <file>..." to unstage)

    new file:   test2.md

除了跟踪新文件外，git add还可以用于把已跟踪的文件放到暂存区。

#### 暂存已修改的文件
本地修改test2.md文件，运行git status,结果为：

	On branch master

	Changes not staged for commit:
	  (use "git add <file>..." to update what will be committed)
	  (use "git checkout -- <file>..." to discard changes in working directory)
	
	    modified:   test2.md

该状态为已跟踪文件的内容发生了变化，但还没有放到暂存区。

暂存文件：

	git add test2.md

再次运行git status,结果为：

	On branch master
	Changes to be committed:
	  (use "git reset HEAD <file>..." to unstage)
	
	    new file:test2.md

#### 状态简览

	git status --short或git status -s

得到更紧凑的输出。

新添加的未跟踪文件前面有 ?? 标记，新添加到暂存区中的文件前面有 A 标记，修改过的文件前面有 M 标记。 你可能注意到了 M 有两个可以出现的位置，出现在右边的 M 表示该文件被修改了但是还没放入暂存区，出现在靠左边的 M 表示该文件被修改了并放入了暂存区。

#### 忽略文件

	$ cat .gitignore//以下是应该忽略的文件列表
	*.[oa]
	*~

第一行告诉 Git 忽略所有以 .o 或 .a 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的。 第二行告诉 Git 忽略所有以波浪符（~）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。


#### 提交更新

提交前，请**一定要确认还有什么修改过的或新建的文件还没有 git add 过**，否则提交的时候不会记录这些还没暂存起来的变化。 这些修改过的文件只保留在本地磁盘。 所以，**每次准备提交前，先用 git status 看下，是不是都已暂存起来了**。

	git commit -m "finished my changes"

这样就创建了一个提交。

#### 跳过使用暂存区域 **important**
可以跳过使用暂存区域这一步骤,给git commit加上-a选项，Git就会自动把所有已跟踪过的文件暂存起来一并提交，从而跳过git add 步骤：

	git commit -a -m "new change"

#### 移除文件

	git rm test1.md

#### 重命名文件
	git mv test2.md newTest2.md


#### 查看提交历史

	git log

#### 重新提交以覆盖上次的提交 
	git commit --amend

#### 撤销对文件的修改（不是提交的文件）

	git checkout -- newTest2.md

看到<https://www.git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8>

### 2.5 Git基础-远程仓库的使用

#### 查看远程仓库

git remote指令可以查看已经配置的远程仓库。如果你已经克隆了自己的仓库，那么至少会看到origin——这是Git给你克隆的仓库的服务器的默认名字。

	git remote

得到：

	origin

指定 -v选项，可以列出远程仓库使用的Git保存的简写与其对应的URL。

	git remote -v

得到：

	origin https://github.com/wangyichen1064431086/myft.git(fetch)
	origin https://github.com/wangyichen1064431086/myft.git(push)

#### 添加远程仓库
 git remote add <shortname> <url> 可以添加一个新的远程Git仓库，同时可指定一个引用的简写。

	git remote add mygitTest https://github.com/wangyichen1064431086/mygitTest.git

#### 从远程仓库中抓取数据

	git fetch mygitTest

这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

必须注意 git fetch 命令会将数据拉取到你的本地仓库 - **它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作**。

#### 推送到远程仓库
当你想要将 master 分支推送到远程服务器时（再次说明，**克隆时通常会自动帮你设置好远程服务器的简称为origin），那么运行这个命令就可以将你所做的备份到服务器：

	git push mygitTest master

#### 查看远程仓库

	git remote show mygitTest

#### 远程仓库简写名的重命名

	git remote rename mygitTest paul

#### 移除远程仓库

	git remote rm paul

### 2.6 Git打标签
暂略

### 2.7

## 3.Git分支

### 3.1 分支简介
使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。

Git的分支模型为它的“必杀技特性”。为何 Git 的分支模型如此出众呢？ Git 处理分支的方式可谓是难以置信的轻量，创建新分支这一操作几乎能在瞬间完成，并且在不同分支之间的切换操作也是一样便捷。 与许多其它版本控制系统不同，Git 鼓励在工作流程中频繁地使用分支与合并

#### 分支简介
在有一个工作目录，里面包含了三个将要被暂存和提交的文件。 暂存操作会为每一个文件计算校验和，然后会把当前版本的文件快照保存到 Git 仓库中，最终将校验和加入到暂存区域等待提交：
	
	git add newTest2.md readme.md readme2.md

	git commit -m 'The initial commit of my project'

当使用 git commit 进行提交操作时，Git 会先计算每一个子目录（本例中只有项目根目录）的校验和，然后在 Git 仓库中这些**校验和保存为树对象**。 随后，Git 便会创建一个**提交对象**，它除了包含上面提到的那些信息外，还包含指向这个树对象（项目根目录）的指针。如此一来，Git 就可以在需要的时候重现此次保存的快照。

现在，Git 仓库中有五个对象：

- 三个 blob 对象（保存着文件快照）
- 一个树对象（记录着目录结构和 blob 对象索引）
- 一个提交对象（包含着指向前述树对象的指针和所有提交信息）。

做些修改后再次提交，那么**新产生的提交对象会包含一个指向上次提交对象（父对象）的指针**。

**Git 的分支，其实本质上仅仅是指向提交对象的可变指针。 Git 的默认分支名字是 master。 在多次提交操作之后，你其实已经有一个指向最后那个提交对象的 master 分支。 它会在每次的提交操作中自动向前移动。**

NOTE：<br>
Git 的 “master” 分支并不是一个特殊分支。 它就跟其它分支完全没有区别。 之所以几乎每一个仓库都有 master 分支，是因为 git init 命令默认创建它，并且大多数人都懒得去改动它。

#### 分支创建
Git是怎么创建新分支的呢？很简单，它只是为你**创建了一个可以移动的新指针**，需要git branch命令：

	git branch testing

这就在当前所在的提交对象上创建了一个新的名为testing的指针。

那么，Git 又是怎么知道当前在哪一个分支上呢？ 也很简单，它有一个**名为 HEAD 的特殊指针**，其指向当前所在的本地分支（译注：将 HEAD 想象为当前分支的别名）。 在本例中，你仍然在 master 分支上。 因为 git branch 命令仅仅 创建 一个新分支，并不会自动切换到新分支中去。

查看各个分支当前所指的对象：

	git log --oneline --decorate

运行结果：

	$ git log --oneline --decorate
	f30ab (HEAD, master, testing) add feature #32 - ability to add new
	34ac2 fixed bug #1328 - stack overflow under certain conditions
	98ca9 initial commit of my project

 “master” 和 “testing” 分支均指向校验和以 f30ab 开头的提交对象。

#### 分支切换

	git checkout testing

这样head就指向testing分支了。

再修改一下文件，再提交一次：

	git commit -a -m 'Bonnie made a change'

此时testing分支向前移动了，master分支却没有，它们指向的是两个提交对象。执行 git log --oneline --decorate查看结果：

	d5c8e7c (HEAD -> testing)Bonnie made a change
	3b7965a (master) The initial commit of my project

那现在切换回master:
	
	git checkout master

这条命令做了两件事。 一是使 HEAD 指回 master 分支，二是将工作目录恢复成 master 分支所指向的快照内容。 也就是说，你现在做修改的话，项目将始于一个较旧的版本。 本质上来讲，这就是忽略 testing 分支所做的修改，以便于向另一个方向进行开发。

再在此刻做些修改并提交：

	git commit -a -m 'made other changes'

现在，这个项目的提交历史已经产生了分叉。上述两次改动针对的是不同分支：你可以在不同分支间不断地来回切换和工作，并在时机成熟时将它们合并起来。

运行 git log --oneline --decorate --graph --all ，它会输出你的提交历史、各个分支的指向以及项目的分支分叉情况：

	git log --oneline --decorate --graph --all

### 

1. 回滚已提交操作

·	git reset --hard 671475b1ce