/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RCTNetworking
 */
'use strict';

const FormData = require('FormData');
const NativeEventEmitter = require('NativeEventEmitter');
const RCTNetworkingNative = require('NativeModules').Networking;

class RCTNetworking extends NativeEventEmitter {

  constructor() {
    super(RCTNetworkingNative);
  }

  sendRequest(
    method: ?string,
    trackingName: string,
    url: ?string,
    headers: Object,
    data: string | FormData | Object,
    incrementalUpdates: boolean,
    timeout: number,
    callback: (requestId: number) => void,
  ) {
    if (typeof data === 'string') {
      data = {string: data};
    } else if (data instanceof FormData) {
      data = {formData: data.getParts()};
    }
    data = {...data, trackingName};
    RCTNetworkingNative.sendRequest({
      method,
      url,
      data,
      headers,
      incrementalUpdates,
      timeout
    }, callback);
  }

  abortRequest(requestId: number) {
    RCTNetworkingNative.abortRequest(requestId);
  }

  clearCookies(callback: number) {
    console.warn('RCTNetworking.clearCookies is not supported on iOS');
  }
}

module.exports = new RCTNetworking();
