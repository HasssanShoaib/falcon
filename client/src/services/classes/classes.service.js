import { client } from "../../client";
import gql from "../../../node_modules/graphql-tag";

export const classFields = `
    _id
    subject
    meetingDays
    meetingHours
    room
    enrollmentCap
    faculty
    course
    section
`;

export const addClassSchedule = (termScheduleId, newClass) =>
    client.mutate({
        mutation: gql`
        mutation($termScheduleId: ID!, $newClass: ClassInput!) {
            termSchedule(_id: $termScheduleId) {
                classes {
                    add(newClass: $newClass) {
                        ${classFields}
                    }
                }
            }
        }
    `,
        variables: {
            termScheduleId,
            newClass,
        },
    });

export const updateClassSchedule = (termScheduleId, _id, newClass) =>
    client.mutate({
        mutation: gql`
        mutation($termScheduleId: ID!, $classId: ID!, $newClass: ClassInput!) {
            termSchedule(_id: $termScheduleId) {
                classes {
                    update(_id: $classId, newClass: $newClass) {
                        ${classFields}
                    }
                }
            }
        }
    `,
        variables: {
            termScheduleId,
            classId: _id,
            newClass,
        },
    });

export const removeClassSchedule = (termScheduleId, classId) =>
    client.mutate({
        mutation: gql`
            mutation($termScheduleId: ID!, $classId: ID!) {
                termSchedule(_id: $termScheduleId) {
                    classes {
                        remove(_id: $classId)
                    }
                }
            }
        `,
        variables: {
            termScheduleId,
            classId,
        },
    });