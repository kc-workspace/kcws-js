# Change Log - @kcws/github-actions

This log was last generated on Tue, 18 Jun 2024 06:37:36 GMT and should not be manually modified.

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

