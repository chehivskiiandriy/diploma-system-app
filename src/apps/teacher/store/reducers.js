import loading from '../../../store/loading';
import myThemes from './myThemes';
import teacherLoad from './teacherLoad';
import academicDegree from '../../personal/store/academicDegree';
import academicYear from '../../personal/store/academicYear';
import laboratory from '../../personal/store/laboratory';
import laboratoryDirection from '../../personal/store/laboratoryDirection';

const reducers = {
  loading,
  myThemes,
  academicDegree,
  academicYear,
  laboratory,
  laboratoryDirection,
  teacherLoad,
};

export default reducers;
