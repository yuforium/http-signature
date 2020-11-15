[![Written in TypeScript](https://flat.badgen.net/badge/icon/typescript?icon=typescript&label)](http://www.typescriptlang.org/) <!-- [![npm](https://flat.badgen.net/npm/v/@mtti/typescript-base?icon=npm)](https://www.npmjs.com/package/@mtti/typescript-base) --> [![License](https://flat.badgen.net/github/license/mtti/typescript-base)](https://github.com/mtti/typescript-base/blob/master/LICENSE)

This is my personal backend TypeScript base project.

I try to support the newest Node.js version [supported by AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html), which was `12.13.0` at the time of last updating this repository.

## Checklist

* Modify `package.json`:
    * Change `name` and `description` to refer to your project
    * Change `repository` to point to your project's repository
    * Change `author` if you're not me
    * Change `license` if you don't want to use Apache 2.0
    * Consider if you want to change `version` to something else
    * Consider if you want to remove `private` now, if your eventual plan is to publish to the public NPM registry.
* Modify or delete `LICENSE` depending on if you want to release your project under the Apache 2.0 license.
* Remove `.travis.yml` and/or `renovate.json` if you're not planning on using those services.
* Modify `.eslintrc.json` and remove the `@mtti/eslint-config-typescript` dependency if you don't want to use my personal ESLint configs.
* Replace the content of this `README.md` with something relevant to your project.
