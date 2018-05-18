import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import React from "react";
import ModalFormComponent from "../../../../../components/ModalFormComponent";
import { EXTENSION_WORK } from "../../../../../enums/faculty.enums";
import validateForm from "../../../../../utils/forms";


function getFormErrors(form) {
    return validateForm({
        title: {
            value: form.title,
        },
        venue: {
            value: form.venue,
        },
    });
}

function mapExtensionWorkToForm(extensionWork) {
    return {
        title: extensionWork.title,
        // Copy the array to avoid manipulating state in form
        roles: [...extensionWork.roles],
        venue: extensionWork.venue,
    };
}

const initialForm = {
    title: "",
    roles: [],
    venue: "",
};

export default class ExtensionWorkModal extends ModalFormComponent {
    get initialForm() {
        return initialForm;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.action === "add") {
            return {
                ...prevState,
                form: {...initialForm},
            };
        }

        return {
            ...prevState,
            form: mapExtensionWorkToForm(nextProps.extensionWork),
        };
    }

    get submitAddAction() {
        const form = this.state.form;
        const {submitAddExtensionWorkForm, faculty} = this.props;
        return () => submitAddExtensionWorkForm(form, faculty);
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {submitUpdateExtensionWorkForm, faculty, extensionWork} = this.props;
        return () => submitUpdateExtensionWorkForm(form, extensionWork._id, faculty);
    }

    get buttonName() {
        return this.props.action === "add" ? "Add Extension Work" : "Update Extension Work";
    }

    get modalTitle() {
        return this.props.action === "add" ? "Add an Extension Work" : "Update Extension Work";
    }

    handleRolesCheckbox = event => {
        const {value, checked} = event.target;
        const form = {...this.state.form};

        if (!checked) {
            form.roles = form.roles.filter(role => role !== value);
        } else {
            form.roles = [...form.roles, value];
        }

        this.setState({
            form: form,
        });
    };

    render() {
        const {open, classes} = this.props;
        const {form, isSubmitting} = this.state;
        const {hasErrors, fieldErrors} = getFormErrors(form);

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>{this.modalTitle}</DialogTitle>
                <DialogContent className={classes.container}>
                    <Grid container className={classes.form} spacing={24} direction="column">
                        <Grid item>
                            <FormControl error={fieldErrors.title.length > 0} fullWidth>
                                <TextField
                                    error={fieldErrors.title.length > 0}
                                    label="Title"
                                    disabled={isSubmitting}
                                    onChange={this.handleFormChange("title")}
                                    value={form.title}
                                />
                                {fieldErrors.title.length > 0 &&
                                <FormHelperText>{fieldErrors.title[0]}</FormHelperText>
                                }
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl error={fieldErrors.venue.length > 0} fullWidth>
                                <TextField
                                    error={fieldErrors.venue.length > 0}
                                    label="Venue"
                                    disabled={isSubmitting}
                                    onChange={this.handleFormChange("venue")}
                                    value={form.venue}
                                />
                                {fieldErrors.venue.length > 0 &&
                                <FormHelperText>{fieldErrors.venue[0]}</FormHelperText>
                                }
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl disabled={isSubmitting}>
                                <FormLabel>Roles</FormLabel>
                                <FormGroup>
                                    {Object.entries(EXTENSION_WORK.ROLES).map(([identifier, {name}]) =>
                                        <FormControlLabel
                                            key={identifier}
                                            label={name}
                                            disabled={isSubmitting}
                                            control={
                                                <Checkbox
                                                    checked={form.roles.includes(identifier)}
                                                    onChange={this.handleRolesCheckbox}
                                                    value={identifier}
                                                />
                                            }
                                        />,
                                    )}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                </DialogContent>

                {this.renderModalFormDialogActions(hasErrors)}
            </Dialog>
        );
    }
}