export const styles = theme => ({
    popper: {
        transition: "300ms all",
        opacity: "0",
        "&.open": {
            opacity: 1,
        },
    },
    cardContainer: {
        minWdith: 280,
        maxWidth: 320,
        boxShadow: theme.shadows[10],
    },
    facultyChipWrapper: {
        display: "inline-block",
        maxWidth: "100%",
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: "auto",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
});
