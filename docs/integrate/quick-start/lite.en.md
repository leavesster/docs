---
id: quick-start-lite
title: Quick Start（Pure Front End）
order: 3
---

## Overview

OpenSumi provides a pure front-end access capability that takes you away from the Node environment and provides relatively complete IDE capabilities with a simple B/S architecture in a pure browser environment.

Before running it, please ensure that Node.js 10.15.x or higher is installed in your local environment. Also, OpenSumi relies on some Node.js Addons, so as to ensure that these Addons are compiled properly. It is recommended to refer to the installation guide in [node-gyp](https://github.com/nodejs/node-gyp#installation) to set up local environment.

At the same time, you can directly visit our [preview page](https://opensumi.github.io/ide-startup-lite/) to experience the latest running effect. It supports the branch or tag address, such as `https://opensumi.github.io/ide-startup-lite/#https://github.com/opensumi/core/tree/v2.16.0`.

## Quick Start

Clone `opensumi/ide-startup-lite`，go to the directory and execute the following command to start the IDE：

```shell
$ git clone https://github.com/opensumi/ide-startup-lite.git
$ cd ide-startup-lite
$ npm install                  # to install dependency
$ npm run compile:ext-worker   # to compile webworker environment
$ npm run start                # to start
```

Open `http://127.0.0.1:8080` in your browser for preview or development.

![screenshot](https://gw.alipayobjects.com/mdn/rms_3b03a3/afts/img/A*ZXeHTJFmx3AAAAAAAAAAAAAAARQnAQ)

A fully feasible and pure front-end IDE requires the following implementations:

- File Service Configuration \*（mandatory）
- Extension Configuration
- Language Competence Configuration
- Search service Configuration

## File Service Configuration

The pure front-end version uses `BrowserFsProvider` to replace `DiskFileSystemProvider` in OpenSumi. The difference is that the original local file service is changed into an http interface service

> File Location：`web-lite/file-provider/browser-fs-provider.ts`

### File Services

Different from full-featured IDEs including container and electron versions, pure front-end versions of IDEs generally serve a vertical, specific scenario, such as code viewing, codereview, etc. The corresponding underlying capabilities are service-oriented. And since the browser itself does not have a file system, it needs an external data source to provide and maintain the file information. In the pure front-end version, we need developers to implement the following two methods to support the underlying code viewing capabilities:

> File Location：`web-lite/file-provider/http-file-service.ts`

- `readDir(uri: Uri): Promise<Array<{type: ‘tree’ | ‘leaf’, path: string}>>`：return directory structure information
- `readFile(uri: Uri, encoding?: string): Promise<string>`：return file contents

Implementing the above two methods enables IDE capabilities in read-only mode. If you want to support code editing capabilities, you also need to implement the following three methods:

- `updateFile(uri: Uri, content: string, options: { encoding?: string; newUri?: Uri; }): Promise<void>`
- `createFile(uri: Uri, content: string, options: { encoding?: string; }): Promise<void>`
- `deleteFile(uri: Uri, options: { recursive?: boolean }): Promise<void>`

After the code is modified, the corresponding method will be called to synchronize to the server end of the integration side. After that, the browser side will cache a new code in memory, and invalid it after refreshing.

## Syntax Highlighting and Code Hints

### Syntax Highlighting

For performance reasons, the static syntax highlighting capability of the pure front-end version is not registered through extensions by default. We have encapsulated common syntax into a unified NPM package and declared the syntax we want to support directly:

> File Location：`web-lite/grammar/index.contribution.ts`

```typescript
const languages = [
  ‘html’,
  ‘css’,
  ‘javascript’,
  ‘less’,
  ‘markdown’,
  ‘typescript’,
];
```

> Note: We provide both direct Require and dynamic import to introduce syntax declaration files. The former will make bundleSize larger, while the latter deployment costs will be higher. You may take your chooice when integration.

### Single File Syntax Service

OpenSumi is based on pure front-end extension (Worker version) capabilities, providing basic hints of common syntax. Since there is no file service, the worker version syntax prompt that extensions only support single-file code hints and do not support cross-file analysis, which is basically sufficient for pure front-end lightweight editing scenarios. The following is the Syntax hint extensions currently available:

```typescript
const languageExtensions = [
  { id: 'alex.typescript-language-features-worker', version: '1.0.0-beta.2' },
  { id: 'alex.markdown-language-features-worker', version: '1.0.0-beta.2' },
  { id: 'alex.html-language-features-worker', version: '1.0.0-beta.1' },
  { id: 'alex.json-language-features-worker', version: '1.0.0-beta.1' },
  { id: 'alex.css-language-features-worker', version: '1.0.0-beta.1' }
];
```

Add the syntax prompt extension directly to the extension list.

### Lsif Syntax Service

For pure browsing scenarios such as code viewing and Code review, the [LSIF Scheme](https://microsoft.github.io/language-server-protocol/specifications/lsif/0.6.0/specification/) based on offline indexing analysis will support cross-file Hover hints and code skipping without any additional analysis overhead on the browser side. OpenSumi pure front-end version integrated with lsif client,and just need a simple docking to access lsif service.

> File Location：`web-lite/language-service/lsif-service/lsif-client.ts`

```typescript
export interface ILsifPayload {
  repository: string;
  commit: string;
  path: string;
  character: number;
  line: number;
}

export interface ILsifClient {
  exists(repo: string, commit: string): Promise<boolean>;
  hover(params: ILsifPayload): Promise<vscode.Hover>;
  definition(params: ILsifPayload): Promise<vscode.Location[]>;
  reference(params: ILsifPayload): Promise<vscode.Location[]>;
}
```

## Search Capability

The search function is optional and is not enabled by default. The core search capability lies in the implementation of file-search and the back-end part of the search module.

### File Search

To make the file search function (triggered by cmd+p) possible, the following method need to be implemented:

```typescript
export interface IFileSearchService {
  /**
   * finds files by a given search pattern.
   * @return the matching paths, relative to the given `options.rootUri`.
   */
  find(
    searchPattern: string,
    options: IFileSearchService.Options,
    cancellationToken?: CancellationToken
  ): Promise<string[]>;
}
```

Replace the default mock-file-seach.ts after implementation

### File Content Search

The implementation of the file content search function requires modification of `search.service.ts`, and the official implementation is not available at this time.
