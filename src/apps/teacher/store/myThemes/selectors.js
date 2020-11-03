import { createSelector } from 'reselect';
import { idX } from '../../../../redux/helpers';

const getMyThemes = state => state.myThemes.themes;
const getMyThemesFilters = state => state.myThemes.filters;

export const myThemesFiltersSelector = createSelector(getMyThemesFilters, idX);

export const myThemesSelector = createSelector(
  getMyThemes,
  myThemes => myThemes && myThemes.map(el => ({
    ...el,
    requests: el.requests && el.requests.filter(req => req.status === 'PENDING'),
  })),
);

export const filteredMyThemesSelector = createSelector(
  [myThemesSelector, myThemesFiltersSelector],
  (themes, themesFilters) => {
    const academicDegree = themesFilters.academicDegree && themesFilters.academicDegree.value;
    const academicYear = themesFilters.academicYear && themesFilters.academicYear.value;
    const student = themesFilters.student && themesFilters.student.value;
    const { name } = themesFilters;

    return themes.filter(el => (
      (!academicDegree || el.academicDegreeId === academicDegree)
      && (!academicYear || el.academicYearId === academicYear)
      && (!student || el.studentId === student)
      && (!name || el.name.toLowerCase().includes(name.toLowerCase()))
    ));
  },
);
