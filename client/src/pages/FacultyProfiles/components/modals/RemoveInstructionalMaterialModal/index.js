import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { removeInstructionalMaterial } from "../../../../../services/faculty/instructional_material";
import { RemoveInstructionalMaterialModal as Component } from "./RemoveInstructionalMaterialModal";


function mapDispatchToProps(dispatch) {
    return {
        onConfirmRemove(faculty, _id) {
            return removeInstructionalMaterial(faculty._id, _id)
                .then(() => {
                    const newFaculty = {
                        ...faculty,
                        instructionalMaterials: faculty.instructionalMaterials.filter(
                            instructionalMaterial => instructionalMaterial._id !== _id,
                        ),
                    };

                    dispatch(facultyIsUpdated(newFaculty));
                });
        },
    };
}

export const RemoveInstructionalMaterialModal = compose(
    connect(null, mapDispatchToProps),
)(Component);