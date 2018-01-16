import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import Table from './proptable';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  nopadding: {
    padding: 0,
  },
  correctpadding: {
    paddingLeft: 24,
    paddingRight: 24,
  },
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Props</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.nopadding }}>
          <Table />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Related docs</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.nopadding }}>
          <List classes={{ root: classes.nopadding }}>
            <ListItem button className={classes.correctpadding}>
              <ListItemText primary="Libary Foo explained" />
              <ChevronRightIcon />
            </ListItem>
            <ListItem button className={classes.correctpadding}>
              <ListItemText primary="Configuration for Z" />
              <ChevronRightIcon />
            </ListItem>
            <ListItem button className={classes.correctpadding}>
              <ListItemText primary="Setup up mockdata for XYZ" />
              <ChevronRightIcon />
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Dependencies & Dependends</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.nopadding }}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Typography
                type="title"
                gutterBottom
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
              >
                It depends on <Chip label="3" />
              </Typography>
              <List classes={{ root: classes.nopadding }}>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component A" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component B" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component C" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                type="title"
                gutterBottom
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
              >
                Is dependended on by <Chip label="6" />
              </Typography>
              <List classes={{ root: classes.nopadding }}>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component H" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component R" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component V" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component W" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component Y" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
                <ListItem button className={classes.correctpadding}>
                  <ListItemText primary="Component Z" secondary="description of the component" />
                  <ChevronRightIcon />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
