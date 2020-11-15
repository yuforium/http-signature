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
import fs from 'fs';
import path from 'path';
import { parse } from './parse';
import { sign } from './sign';
import { stringify } from './stringify';
import { verify } from './verify';

const loadTestFile = (name: string): Buffer => fs.readFileSync(
  path.join(__dirname, '../test/', name),
);

const privateKey = crypto.createPrivateKey(loadTestFile('private.pem'));
const publicKey = crypto.createPublicKey(loadTestFile('public.pem'));

describe('integration tests', () => {
  describe('sign and verify', () => {
    let result: boolean;

    beforeEach(() => {
      const signatureObject = sign({
        keyId: 'my-key',
        algorithm: 'rsa-sha256',
        privateKey,
        created: 12345,
        headers: [
          '(created)',
          'host',
        ],
        headerValues: {
          host: 'example.com',
        },
      });
      const signatureString = stringify(signatureObject);

      const parsedSignature = parse(signatureString);
      result = verify({
        publicKey,
        headerValues: {
          host: 'example.com',
        },
        signature: parsedSignature,
      });
    });

    it('validation succeeds', () => {
      expect(result).toBe(true);
    });
  });
});
