The querystring module provides utilities for parsing and formatting URL query strings. It can be accessed using:

提供了用于解析和格式化URL查询字符串的实用程序。

### querystring.escape(str)
对给定的str进行URL编码。

该方法是提供给 querystring.stringify() 使用的，通常不直接使用。 它之所以对外开放，是为了在需要时可以通过给 querystring.escape 赋值一个函数来重写编码的实现。

