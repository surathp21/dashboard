import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";
// @material-ui/cinos;
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardFooter from "../../components/Card/CardFooter.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const StatWidget = (props) => {
  const classes = useStyles();
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Realtime Updates</p>
              <h3 className={classes.cardTitle}>{props.realTimeUpdates}</h3>
            </CardHeader>
            {/* <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Service Bookings</p>
              <h3 className={classes.cardTitle}>{props.serviceBookings}</h3>
            </CardHeader>
            {/* <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Customer Conversations</p>
              <h3 className={classes.cardTitle}>
                {props.customerConversations}
              </h3>
            </CardHeader>
            {/* <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Feedback Collected</p>
              <h3 className={classes.cardTitle}>{props.feedbackCollected}</h3>
            </CardHeader>
            {/* <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter> */}
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

StatWidget.propTypes = {
  realTimeUpdates: PropTypes.number.isRequired,
  serviceBookings: PropTypes.number.isRequired,
  customerConversations: PropTypes.number.isRequired,
  feedbackCollected: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const {
    realTimeUpdates,
    serviceBookings,
    customerConversations,
    feedbackCollected,
  } = state.vechileGraph;
  return {
    realTimeUpdates,
    serviceBookings,
    customerConversations,
    feedbackCollected,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatWidget);
