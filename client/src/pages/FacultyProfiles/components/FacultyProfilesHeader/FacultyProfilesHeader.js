import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Input from "material-ui/Input";
import Tabs, { Tab } from "material-ui/Tabs";

import { TABS } from "../../detail_tabs";


class FacultyProfilesHeader extends Component {

    tabs = () => (
        TABS.map(tab =>
            <Tab key={tab.identifier} label={tab.name} onClick={() => this.props.onTabClick(tab)} />,
        )
    );

    render() {
        const {classes, searchKeyword, onSearchInputChange, activeFaculty, activeTabIdentifier} = this.props;
        const activeTabIndex = TABS.findIndex(tab => tab.identifier === activeTabIdentifier);

        return (
            <div className={`${classes.facultyProfilesHeader} ${classes.split}`}>
                <div className={classes.searchWrapper}>
                    <Paper className={classes.searchPaper}>
                        <Input className={classes.searchInput}
                               fullWidth
                               type="search"
                               value={searchKeyword}
                               onChange={event => onSearchInputChange(event.target.value)}
                               placeholder="Search faculties" />
                    </Paper>
                </div>

                {activeFaculty &&
                <Tabs value={activeTabIndex}
                      classes={{root: classes.tabs, indicator: classes.tabsIndicator}}
                      scrollable>
                    {this.tabs()}
                </Tabs>
                }
            </div>
        );
    }
}

export default FacultyProfilesHeader;
