import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, type, required = false, description = '-', defaultValue) {
  id += 1;
  return {
    id,
    name,
    type,
    required: JSON.stringify(required),
    description,
    defaultValue: defaultValue === undefined ? '-' : JSON.stringify(defaultValue),
  };
}

const data = [
  createData('label', 'string', true, 'the label show', undefined),
  createData('children', 'node', true, 'the contents', <b>empty</b>),
  createData('blink', 'bool', false, 'attract attention', false),
];

function BasicTable(props) {
  const { classes } = props;

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Required</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Default value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(n => (
          <TableRow key={n.id}>
            <TableCell>{n.name}</TableCell>
            <TableCell>{n.type}</TableCell>
            <TableCell>{n.required}</TableCell>
            <TableCell>{n.description}</TableCell>
            <TableCell>{n.defaultValue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);
