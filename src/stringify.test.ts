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

import { stringify } from './stringify';

describe('stringify', () => {
  let result: string;

  describe('when given well-formed input', () => {
    beforeEach(() => {
      result = stringify({
        keyId: 'my-key',
        algorithm: 'rsa-sha256',
        created: 12345,
        expires: 67890,
        headers: [
          '(request-target)',
          '(created)',
          'host',
        ],
        signature: 'DUMMY SIGNATURE',
      });
    });

    it('produces the correct output', () => {
      expect(result).toBe(
        'keyId="my-key", algorithm="rsa-sha256", created=12345, expires=67890, headers="(request-target) (created) host", signature="DUMMY SIGNATURE"',
      );
    });
  });
});
