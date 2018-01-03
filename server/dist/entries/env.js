'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isServer = exports.isServer = function isServer() {
  return typeof window === 'undefined';
};

exports.default = {
  isServer: isServer
};