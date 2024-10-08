# Change Log - @kcws/github-actions

This log was last generated on Tue, 08 Oct 2024 22:41:43 GMT and should not be manually modified.

## 0.17.0
Tue, 08 Oct 2024 22:41:43 GMT

### Minor changes

- upgrade dependencies [auto]

## 0.16.1
Tue, 01 Oct 2024 22:41:32 GMT

_Version update only_

## 0.16.0
Tue, 17 Sep 2024 22:39:58 GMT

### Minor changes

- upgrade dependencies [auto]

## 0.15.2
Tue, 10 Sep 2024 22:40:02 GMT

_Version update only_

## 0.15.1
Tue, 03 Sep 2024 22:40:49 GMT

_Version update only_

## 0.15.0
Tue, 27 Aug 2024 22:41:00 GMT

### Minor changes

- upgrade dependencies [auto]

## 0.14.0
Tue, 20 Aug 2024 22:38:16 GMT

### Minor changes

- upgrade dependencies [auto]

## 0.13.1
Tue, 13 Aug 2024 22:38:38 GMT

_Version update only_

## 0.13.0
Tue, 06 Aug 2024 22:38:53 GMT

### Minor changes

- upgrade dependencies [auto]

## 0.12.1
Tue, 30 Jul 2024 22:37:16 GMT

_Version update only_

## 0.12.0
Tue, 23 Jul 2024 22:38:06 GMT

### Minor changes

- upgrade dependencies [auto]

## 0.11.7
Tue, 16 Jul 2024 22:38:39 GMT

_Version update only_

## 0.11.6
Fri, 12 Jul 2024 09:26:55 GMT

### Patches

- Fix input field in runner data should be required and remove error field

## 0.11.5
Tue, 09 Jul 2024 22:38:22 GMT

_Version update only_

## 0.11.4
Sun, 07 Jul 2024 09:30:34 GMT

_Version update only_

## 0.11.3
Thu, 04 Jul 2024 03:44:32 GMT

### Patches

- Update documents and fix unresolved links

## 0.11.2
Wed, 03 Jul 2024 13:10:22 GMT

### Patches

- Add additional documents to interface and type

## 0.11.1
Wed, 03 Jul 2024 10:50:31 GMT

_Version update only_

## 0.11.0
Wed, 03 Jul 2024 10:37:19 GMT

### Minor changes

- Refactor App with actual builder class
- upgrade dependencies [auto]
- upgrade dependencies [auto]

### Patches

- Update jsdoc typo on LogContextPlugin

## 0.10.0
Tue, 18 Jun 2024 06:37:36 GMT

### Minor changes

- Support building input from promise

### Patches

- Fix wrong document on function arguments

## 0.9.0
Fri, 14 Jun 2024 08:18:12 GMT

### Minor changes

- Add new IO and System ContextPlugins

## 0.8.1
Thu, 13 Jun 2024 10:31:33 GMT

### Patches

- CacheContextPlugin will check feature availability first

## 0.8.0
Thu, 13 Jun 2024 10:01:32 GMT

### Minor changes

- Add captureRerun and captureRun on ExecutorContextPlugin for capture stdout and stderr automatically after finish

## 0.7.0
Thu, 13 Jun 2024 08:31:15 GMT

### Minor changes

- Add new AppContext type for get Context object from Actions app
- Add new OutputContextPlugin for create output on GitHub Actions

### Patches

- Migrate cache utilities function to context plugin

## 0.6.0
Thu, 13 Jun 2024 05:24:18 GMT

### Minor changes

- Context plugin supports dependency to other plugins
- New HelperContextPlugin for helper functions
- Change static function name on ContextBuilder using `from*()` and `empty()` and update when default value might use if metadata is missing

### Patches

- Fix static fromPackageJson didn't update function signature

## 0.5.0
Wed, 12 Jun 2024 11:00:41 GMT

### Minor changes

- fromPackageJson() will find package.json from code directory instead of current directory by default

## 0.4.0
Tue, 11 Jun 2024 13:57:56 GMT

### Minor changes

- Improve search environment variable works with scoped npm package

## 0.3.0
Tue, 11 Jun 2024 11:23:07 GMT

### Minor changes

- Add new APIs to fetch context metadata from package.json file

## 0.2.2
Tue, 11 Jun 2024 10:36:12 GMT

### Patches

- Improve TSDocs for context
- Ignore *.test.* files when publish package

## 0.2.1
Tue, 11 Jun 2024 09:11:17 GMT

_Version update only_

## 0.2.0
Tue, 11 Jun 2024 09:04:30 GMT

### Minor changes

- Migrate actions helpers from GitHub Actions repository

