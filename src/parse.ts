/*
Copyright 2020 Matti Hiltunen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Signature } from './Signature';

const quotedStringPattern = /^"(.)*"$/;
const integerPattern = /^(\d)*$/;

export const expectQuotedString = (key: string, value: string): string => {
  if (!quotedStringPattern.test(value)) {
    throw new Error(`Expected string: ${key}`);
  }
  return value
    .slice(1, -1)
    .replace(/\\"/g, '"');
};

export const expectInteger = (key: string, value: string): number => {
  if (!integerPattern.test(value)) {
    throw new Error(`Expected integer: ${key}`);
  }
  return +value;
};

/** Parse a signature from the string value of the HTTP Signature header */
export const parse = (raw: string): Signature => {
  const rawParams = Object.fromEntries(
    raw
      .split(',')
      .map((pair) => pair.split(/=(.+)/))
      .map(([key, value]) => [key.trim(), value.trim()]),
  );

  const result: Signature = {
    keyId: expectQuotedString('keyId', rawParams.keyId),
    signature: expectQuotedString('signature', rawParams.signature),
  };

  if (rawParams.algorithm) {
    result.algorithm = expectQuotedString('algorithm', rawParams.algorithm);
  }

  if (rawParams.created) {
    result.created = expectInteger('created', rawParams.created);
  }

  if (rawParams.expires) {
    result.expires = expectInteger('expires', rawParams.expires);
  }

  if (rawParams.headers) {
    result.headers = expectQuotedString(
      'headers',
      rawParams.headers,
    ).split(' ');
  } else {
    result.headers = ['(created)'];
  }

  return result;
};
