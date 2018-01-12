## source
npm:<https://www.npmjs.com/package/karma>

doc:<https://karma-runner.github.io/2.0/intro/installation.html>

## Karma
A simple tool that allows you to execute JavaScript code in multiple real browsers.

一个简单的工具，允许您在多个真实的浏览器中执行JavaScript代码。

> The main purpose of Karma is to make your test-driven development easy, fast, and fun.

> Karma的主要目的是使测试驱动的开发变得简单，快速和有趣。

### When should I use Karma?
- You want to test code in real browsers.
- You want to test code in multiple browsers (desktop, mobile, tablets, etc.).
- You want to execute your tests locally during development.
- You want to execute your tests on a continuous integration server.
- You want to execute your tests on every save.
- You love your terminal.
- You don't want your (testing) life to suck.
- You want to use Istanbul to automagically generate coverage reports.
- You want to use RequireJS for your source files.


- 你想在真正的浏览器中测试代码。
- 你想在多个浏览器（桌面，手机，平板电脑等）测试代码。
- 你想在开发过程中在本地执行你的测试。
- 您想要在持续集成服务器上执行测试。
- 你想在每次保存时执行你的测试。
- 你爱你的终端。
- 你不希望你的（测试）生涯很糟糕。
- 你想使用Istanbul自动生成覆盖率报告。
- 你想使用RequireJS作为源代码。

### But I still want to use _insert testing library_

Karma is not a testing framework, nor an assertion library. Karma just launches an HTTP server, and generates the test runner HTML file you probably already know from your favourite testing framework. So for testing purposes you can use pretty much anything you like. There are already plugins for most of the common testing frameworks:

Karma不是一个测试框架，也不是一个断言库。 Karma只是启动一个HTTP服务器，并生成用于执行测试的HTML文件，你可能已经从你喜欢的测试框架中了解过这种测试HTML文件。所以出于测试的目的，你可以使用任何你喜欢的东西。Karma已经有大部分常用测试框架的插件：

- Jasmine
- Mocha
- QUnit