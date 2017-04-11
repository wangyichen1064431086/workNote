# 1.异步操作同步化方法总结(***待整理***)

## (1) co模块+yield+Promise

## (2) Promise

## (3) aysc +await

## 2.gulp 任务之前的变量不能共享
如设置一个全局变量后，使用task1改变了该变量；则在task2中该变量并无变化。

## 3.rollup模块具有将ES6的文件转换为node的功能
参见 ftc-share 的gulpfile.js的rollup任务。

## 4. gulp.task中一定要return,为什么？return的又必须满足什么条件？？

