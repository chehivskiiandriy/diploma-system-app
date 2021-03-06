import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { useTeacherDispatch, useTeacherSelector } from '../../store/context';
import { createPersonal, editPersonal } from '../../store/personal/thunks';
import useFormErrors from '../../../../hooks/useFormErrors';
import { isTaskLoading } from '../../../../store/loading/selectors';
import { CREATE_PERSONAL_LOADING, UPDATE_PERSONAL_LOADING } from '../../../../store/loading/constants';
import { emailRegexp } from '../../../../utils/validations';

const CreateEditHeadModal = ({
  isOpen, closeHandler, isEdit, defaultValues,
}) => {
  const dispatch = useTeacherDispatch();
  const createLoading = useTeacherSelector(state => isTaskLoading(state, CREATE_PERSONAL_LOADING));
  const editLoading = useTeacherSelector(state => isTaskLoading(state, UPDATE_PERSONAL_LOADING));
  const {
    handleSubmit, register, errors, reset,
  } = useForm({ mode: 'onBlur' });
  const isErrorsExist = useFormErrors(errors);
  const disabled = useMemo(() => (
    isErrorsExist || createLoading || editLoading
  ), [isErrorsExist, createLoading, editLoading]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  const onSubmit = async params => {
    if (isEdit) {
      await dispatch(editPersonal(defaultValues.id, params));
      closeHandler();
    } else {
      await dispatch(createPersonal(params));
      reset();
    }
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler} withCloseButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className="modal-header">
          <h2>
            {`${isEdit ? 'Редагувати' : 'Додати'} персонал`}
          </h2>
        </header>
        <div className="modal-body">
          <Input
            id="lastName"
            name="lastName"
            ref={register({
              required: 'Будь ласка, введіть прізвище',
              validate: value => value.trim() !== '' || 'Будь ласка, введіть коректне прізвище',
            })}
            errors={errors}
            label="Прізвище"
            placeholder="Введіть прізвище"
            autoFocus
          />
          <Input
            id="firstName"
            name="firstName"
            ref={register({
              required: 'Будь ласка, введіть ім\'я',
              validate: value => value.trim() !== '' || 'Будь ласка, введіть коректне ім\'я',
            })}
            errors={errors}
            label="Ім'я"
            placeholder="Введіть ім'я"
          />
          <Input
            id="middleName"
            name="middleName"
            ref={register({
              required: 'Будь ласка, введіть по батькові',
              validate: value => value.trim() !== '' || 'Будь ласка, введіть коректне по батькові',
            })}
            errors={errors}
            label="По батькові"
            placeholder="Введіть по батькові"
          />
          <Input
            id="email"
            name="email"
            ref={register({
              required: 'Будь ласка, введіть електронну адресу',
              pattern: {
                value: emailRegexp,
                message: 'Будь ласка, введіть коректну електронну адресу',
              },
            })}
            errors={errors}
            label="Електронна адреса"
            placeholder="Введіть електронну адресу"
          />
        </div>
        <div className="modal-footer">
          <Button
            type="submit"
            mode="primary"
            label="Submit"
            disabled={disabled}
          >
            {isEdit ? 'Змінити' : 'Створити'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

CreateEditHeadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  defaultValues: PropTypes.shape(),
};

CreateEditHeadModal.defaultProps = {
  isEdit: false,
  defaultValues: null,
};

export default CreateEditHeadModal;
