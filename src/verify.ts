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
import { createInput } from './createInput';
import { Signature } from './Signature';

export type VerifyOptions = {
  method?: string;
  requestPath?: string;
  headerValues?: Record<string, string>;
  signature: Signature;
  publicKey: crypto.KeyObject;
};

export const verify = (
  options: VerifyOptions,
): boolean => {
  const {
    method,
    requestPath,
    headerValues,
    signature,
    publicKey,
  } = options;

  const {
    created,
    expires,
    headers,
  } = signature;

  const input = createInput({
    method,
    requestPath,
    headerValues,
    created,
    expires,
    headers,
  });

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(input);

  return verifier.verify(publicKey, signature.signature, 'base64');
};
