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

import { expectInteger, expectQuotedString, parse } from './parse';
import { Signature } from './Signature';

describe('expectQuotedString', () => {
  let result: string;

  describe('when called with a well formed input', () => {
    beforeEach(() => {
      result = expectQuotedString('dummy', '"hello world"');
    });

    it('returns the input with double quotes removed', () => {
      expect(result).toBe('hello world');
    });
  });

  describe('when called with escaped quotes', () => {
    beforeEach(() => {
      result = expectQuotedString('dummy', '"hello \\"world\\""');
    });

    it('applies the escaped quotes', () => {
      expect(result).toBe('hello "world"');
    });
  });
});

describe('expectInteger', () => {
  let result: number;
  let error: Error|null;

  beforeEach(() => {
    error = null;
  });

  describe('when called with a well formed input', () => {
    beforeEach(() => {
      result = expectInteger('dummy', '12345');
    });

    it('returns the string converted to integer', () => {
      expect(result).toBe(12345);
    });
  });

  describe('when called with a string', () => {
    beforeEach(() => {
      try {
        result = expectInteger('dummy', '"hello world"');
      } catch (e: any) {
        error = e;
      }
    });

    it('throws an error', () => {
      expect(error?.message).toBe('Expected integer: dummy');
    });
  });
});

describe('parse', () => {
  const wellFormed = 'keyId="test-key-b", algorithm="rsa-sha256", created=1402170695, expires=1402170995, headers="(request-target) (created) host date cache-control x-emptyheader x-example", signature="T1l3tWH2cSP31nfuvc3nVaHQ6IAu9YLEXg2pCeEOJETXnlWbgKtBTaXV6LNQWtf4O42V2DZwDZbmVZ8xW3TFW80RrfrY0+fyjD4OLN7/zV6L6d2v7uBpuWZ8QzKuHYFaRNVXgFBXN3VJnsIOUjv20pqZMKO3phLCKX2/zQzJLCBQvF/5UKtnJiMp1ACNhG8LF0Q0FPWfe86YZBBxqrQr5WfjMu0LOO52ZAxi9KTWSlceJ2U361gDb7S5Deub8MaDrjUEpluphQeo8xyvHBoNXsqeax/WaHyRYOgaW6krxEGVaBQAfA2czYZhEA05Tb38ahq/gwDQ1bagd9rGnCHtAg=="';
  let result: Signature;

  describe('when called with a well formed value', () => {
    beforeEach(() => {
      result = parse(wellFormed);
    });

    it('sets keyId correctly', () => {
      expect(result.keyId).toBe('test-key-b');
    });

    it('sets algorithm correctly', () => {
      expect(result.algorithm).toBe('rsa-sha256');
    });

    it('sets created correctly', () => {
      expect(result.created).toBe(1402170695);
    });

    it('sets expires correctly', () => {
      expect(result.expires).toBe(1402170995);
    });

    it('sets signature correctly', () => {
      expect(result.signature).toBe('T1l3tWH2cSP31nfuvc3nVaHQ6IAu9YLEXg2pCeEOJETXnlWbgKtBTaXV6LNQWtf4O42V2DZwDZbmVZ8xW3TFW80RrfrY0+fyjD4OLN7/zV6L6d2v7uBpuWZ8QzKuHYFaRNVXgFBXN3VJnsIOUjv20pqZMKO3phLCKX2/zQzJLCBQvF/5UKtnJiMp1ACNhG8LF0Q0FPWfe86YZBBxqrQr5WfjMu0LOO52ZAxi9KTWSlceJ2U361gDb7S5Deub8MaDrjUEpluphQeo8xyvHBoNXsqeax/WaHyRYOgaW6krxEGVaBQAfA2czYZhEA05Tb38ahq/gwDQ1bagd9rGnCHtAg==');
    });

    it('sets 7 headers', () => {
      expect(result.headers?.length).toBe(7);
    });
  });
});
