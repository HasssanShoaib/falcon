import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ApprovedIcon from "@material-ui/icons/Check";
import PendingIcon from "@material-ui/icons/ChromeReaderMode";
import RejectedIcon from "@material-ui/icons/Close";
import moment from "moment";
import React from "react";
import { SUBDOCUMENT_TYPE } from "../../../../../../../enums/faculty.enums";
import { CHANGE_REQUEST_STATUSES } from "../../../../../../../enums/review_profile_change.enums";
import { wrap } from "./wrapper";


const {PENDING, APPROVED, REJECTED} = CHANGE_REQUEST_STATUSES;

const getBackgroundClass = (changeRequest, classes) => {
    switch (changeRequest.status) {
        case PENDING.identifier:
            return classes.pendingBackground;
        case APPROVED.identifier:
            return classes.acceptedBackground;
        case REJECTED.identifier:
            return classes.rejectedBackground;
        default:
            throw new Error(`Error: Attempted to get background for unknown change request status ${changeRequest.status}`);
    }
};

const getIcon = (changeRequest, classes) => {
    switch (changeRequest.status) {
        case PENDING.identifier:
            return <PendingIcon className={classes.icon}/>;
        case APPROVED.identifier:
            return <ApprovedIcon className={classes.icon}/>;
        case REJECTED.identifier:
            return <RejectedIcon className={classes.icon}/>;
        default:
            throw new Error(`Error: Attempted to get icon for unknown change request status ${changeRequest.status}`);
    }
};

const renderPendingMessage = () => (
    <Typography variant="subheading">
        This change request is <strong>pending</strong> and is awaiting review.
    </Typography>
);

const renderApprovedMessage = () => (
    <Typography variant="subheading">
        This change request has been <strong>approved</strong>.
    </Typography>
);

const renderRejectedMessage = rejectionReason => (
    <Grid container direction="column" spacing={8}>
        <Grid item>
            <Typography variant="subheading">
                This change request has been <strong>rejected</strong>.
            </Typography>
        </Grid>
        <Grid item>
            <Typography variant="body2">
                The following reason was given:
            </Typography>

            <Typography variant="body1">
                {rejectionReason}
            </Typography>
        </Grid>
    </Grid>
);

const BaseFacultyChangeRequestTopBar = ({changeRequest, classes}) => {
    const submitted = moment(changeRequest.submitted).fromNow();
    const subdocumentType = SUBDOCUMENT_TYPE[changeRequest.subdocumentType].name;
    const backgroundClass = getBackgroundClass(changeRequest, classes);

    return (
        <Toolbar className={`${backgroundClass} ${classes.topBar}`}>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>

                            <Grid container spacing={16} direction="row" alignItems="center">

                                <Grid item>
                                    {getIcon(changeRequest, classes)}
                                </Grid>

                                <Grid item>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography>
                                                <strong>You</strong> submitted a change request to add
                                                this <strong>{subdocumentType}</strong>.
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            {changeRequest.status === PENDING.identifier && renderPendingMessage()}
                                            {changeRequest.status === APPROVED.identifier && renderApprovedMessage()}
                                            {changeRequest.status === REJECTED.identifier && renderRejectedMessage(
                                                changeRequest.rejectionReason)}
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item>
                            <Typography color="textSecondary">
                                {submitted}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

export const FacultyChangeRequestTopBar = wrap(BaseFacultyChangeRequestTopBar);