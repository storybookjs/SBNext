/* global __NEXT_DATA__ */
import glob from 'glob';
import { sep } from 'path';
import fetch from 'unfetch';

import { isServer } from './env';
import processEntries from './process';

export default async (path = 'docs') => (isServer() ? fromServer(path) : fromClient(path));

const fromServer = async entriesPath => {
  const paths = glob.sync(`${entriesPath}/**/*.md`, { root: process.cwd() });

  return processEntries(paths, entriesPath).filter(({ data }) => data.published !== false);
};

const fromClient = async path => {
  // in safari the popstate event is fired when user press back and
  // causes the getInitialProps to be called in the SSR version
  // This will pickup the current props and return it as a workaround
  // https://github.com/zeit/next.js/issues/2360
  if (__NEXT_DATA__.nextExport) {
    return __NEXT_DATA__.props.docs;
  }
  const resp = await fetch('/_load_entries');
  return resp.json();
};

export const byFileName = async (path, root = 'docs') =>
  isServer() ? byFileNameFromServer(path, root) : byFileNameFromClient(path);

const byFileNameFromServer = (path, entriesPath) => processEntries([path], entriesPath).pop();

const byFileNameFromClient = async path => {
  // this is used to make next.js Link to work on exported sites.
  if (__NEXT_DATA__.nextExport) {
    return findDocFromNextCache(path);
  }
  const resp = await fetch(`/_load_entry/${path.replace(sep, '/')}`);
  return resp.json();
};

const findDocFromNextCache = path => {
  const { doc, docs } = __NEXT_DATA__.props;

  return doc && doc.data._entry === path
    ? doc
    : docs.filter(p => p.data._entry === path).reduce(v => v);
};
