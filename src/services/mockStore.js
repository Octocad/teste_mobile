let teacherMockPending = false;
let studentMockPending = false;

export const setTeacherPending = (value = true) => {
  teacherMockPending = !!value;
};

export const consumeTeacherPending = () => {
  const v = teacherMockPending;
  teacherMockPending = false;
  return v;
};

export const setStudentPending = (value = true) => {
  studentMockPending = !!value;
};

export const consumeStudentPending = () => {
  const v = studentMockPending;
  studentMockPending = false;
  return v;
};

export default {
  setTeacherPending,
  consumeTeacherPending,
  setStudentPending,
  consumeStudentPending,
};
