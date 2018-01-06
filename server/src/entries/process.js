import { readFileSync, statSync } from 'fs';
import { resolve, basename, extname, relative, dirname, sep } from 'path';
import fm from 'frontmatter';
import pathToRegEx from 'path-to-regexp';

export default paths =>
  paths
    .map(path => readFileSync(path, 'utf-8'))
    .map(fm)
    .map(addEntry(paths))
    .map(addName)
    .map(addDate)
    .map(addUrl);

const addPage = value => {
  const { data } = value;
  const { page = 'doc' } = data;
  return { ...value, data: { ...data, page } };
};

const addEntry = paths => (value, idx) => {
  const { data } = value;
  return { ...value, data: { ...data, _entry: paths[idx] } };
};

const addName = value => {
  const { data } = value;
  return { ...value, data: { ...data, name: createName({ ...data }) } };
};

const addUrl = value => {
  const { data } = value;
  return { ...value, data: { ...data, url: createURL({ ...data }) } };
};

const addDate = value => {
  const { data } = value;
  return { ...value, data: { ...data, date: createDate({ ...data }) } };
};

const DATE_IN_FILE_REGEX = /^(\d{4}-\d{2}-\d{2})-(.+)$/;
const DATE_MATCH_INDEX = 1;
const NAME_MATCH_INDEX = 2;

const extractFileName = path => basename(path, extname(path));

const createName = ({ _entry }) => {
  const name = extractFileName(_entry);
  const match = name.match(DATE_IN_FILE_REGEX);

  return match ? match[NAME_MATCH_INDEX] : name;
};

const createURL = data => {
  const { _entry } = data;

  return `/${_entry.replace(/\.[^/.]+$/, '/')}`;
};

const createDate = ({ _entry, date }) => {
  const name = extractFileName(_entry);
  const match = name.match(DATE_IN_FILE_REGEX);
  let result;

  if (date) {
    result = new Date(date);
  } else if (match) {
    result = new Date(match[DATE_MATCH_INDEX]);
  } else {
    result = fileCreationDate(_entry);
  }

  return result.toJSON();
};

const fileCreationDate = path => {
  const { birthtime } = statSync(path);
  return birthtime;
};
