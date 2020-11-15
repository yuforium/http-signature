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

import crypto from 'crypto';
import { createInput, CreateInputOptions } from './createInput';
import { Signature } from './Signature';

export type SignOptions = CreateInputOptions & {
  keyId: string;
  algorithm: 'rsa-sha256';
  privateKey: crypto.KeyObject;
}

export const sign = (options: SignOptions): Signature => {
  const {
    keyId,
    method,
    requestPath,
    privateKey,
    algorithm,
    created,
    expires,
    headers,
    headerValues,
  } = options;

  const input = createInput({
    method,
    requestPath,
    created,
    expires,
    headers,
    headerValues,
  });

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(input);
  const signature = signer.sign(privateKey).toString('base64');

  return {
    keyId,
    signature,
    algorithm,
    created,
    expires,
    headers,
  };
};
