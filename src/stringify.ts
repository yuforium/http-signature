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

export const stringify = (sig: Signature): string => {
  const properties: [string, string|number][] = [];

  properties.push(['keyId', sig.keyId]);
  if (sig.algorithm) {
    properties.push(['algorithm', sig.algorithm]);
  }
  if (typeof sig.created === 'number') {
    properties.push(['created', sig.created]);
  }
  if (typeof sig.expires === 'number') {
    properties.push(['expires', sig.expires]);
  }
  if (sig.headers) {
    properties.push(['headers', sig.headers.join(' ')]);
  }
  properties.push(['signature', sig.signature]);

  return properties
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, `"${value}"`];
      }
      return [key, value];
    })
    .map(([key, value]) => `${key}=${value}`)
    .join(', ');
};
