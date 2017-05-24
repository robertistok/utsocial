import React from 'react';

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

export default MaterialCard;
