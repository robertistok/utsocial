import React from 'react';
import PropTypes from 'prop-types';

import MaterialForm from '../MaterialForm';
import Card from '../../../../../../../components/Courses/Materials/Card';

const MaterialCard = (props) => {
  const {
    material: { _id: materialID, link, description, enteredOn },
    toggle: editMateial,
    toggledOn: editing,
    handleCardEdit,
    handleCardDelete,
    showButtons,
    initialValues
  } = props;

  if (editing === true) {
    return (
      <MaterialForm
        initialValues={initialValues}
        submitForm={handleCardEdit(materialID)}
        positiveButton="Save"
        negativeButton="Cancel"
        onNegativeButtonClick={editMateial}
        newMaterial={false}
        form={`${materialID}edit`}
      />
    );
  }

  return (
    <Card
      link={link}
      description={description}
      enteredOn={enteredOn}
      handleCardDelete={() => handleCardDelete(materialID)}
      showButtons={showButtons}
      editMaterial={editMateial}
    />
  );
};

const { func, string, shape, bool } = PropTypes;
MaterialCard.propTypes = {
  toggle: func.isRequired,
  handleCardEdit: func.isRequired,
  handleCardDelete: func.isRequired,
  material: shape({
    _id: string.isRequired,
    link: string.isRequired,
    description: string.isRequired,
    enteredOn: string.isRequired
  }).isRequired,
  showButtons: bool.isRequired,
  toggledOn: bool.isRequired,
  initialValues: shape({
    link: string.isRequired,
    description: string.isRequired,
    type: string.isRequired
  }).isRequired
};

export default MaterialCard;
