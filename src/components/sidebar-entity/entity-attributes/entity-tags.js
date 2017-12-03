import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import { filter, includes } from 'lodash';

import FlexContainer from 'primitives/container/flex-container';
import SectionHeader from 'primitives/text/section-header';
import Header, { HeaderType } from 'primitives/text/header';
import Dropdown from 'primitives/form/dropdown';

import { capitalizeFirstLetter } from 'utils/common';
import Entities from 'constants/entities';

const renderList = (title, list) => (
  <div className="EntityAttributes-Content">
    <b>{title}:</b>
    <ul className="EntityAttributes-ContentList">
      {list
        .map(capitalizeFirstLetter)
        .map(element => <li key={element}>{element}</li>)}
    </ul>
  </div>
);

export default function EntityTags({
  entityType,
  entity,
  isSidebarEditActive,
}) {
  if (
    !Entities[entityType].tags ||
    (!isSidebarEditActive && !(entity.attributes.tags || []).length)
  ) {
    return null;
  }

  let tags;
  if (isSidebarEditActive) {
    tags = entity.attributes.tags.map(tag => (
      <FlexContainer key={tag} align="center" className="EntityTag--edit">
        <X className="EntityTag-Action" size={25} />
        <Dropdown
          wrapperClassName="EntityTag-Dropdown"
          value={tag}
          clearable={false}
          options={filter(
            Entities[entityType].tags,
            ({ key }) => !includes(entity.attributes.tags, key) || key === tag,
          ).map(({ key, name }) => ({
            value: key,
            label: name,
          }))}
        />
      </FlexContainer>
    ));
  } else {
    tags = entity.attributes.tags
      .map(tag => Entities[entityType].tags[tag])
      .map(
        ({
          key,
          name,
          description,
          enemies,
          friends,
          complications,
          things,
          places,
        }) => (
          <div key={key} className="EntityAttributes-Tag">
            <Header type={HeaderType.header4}>{name}</Header>
            <p className="EntityAttributes-Content">{description}</p>
            {renderList('Enemies', enemies)}
            {renderList('Friends', friends)}
            {renderList('Complications', complications)}
            {renderList('Things', things)}
            {renderList('Places', places)}
          </div>
        ),
      );
  }

  return (
    <div>
      <SectionHeader>{Entities[entityType].name} Tags</SectionHeader>
      <div className="EntityAttributes-Section">{tags}</div>
    </div>
  );
}

EntityTags.propTypes = {
  isSidebarEditActive: PropTypes.bool.isRequired,
  entity: PropTypes.shape({
    attributes: PropTypes.shape(),
  }).isRequired,
  entityType: PropTypes.string.isRequired,
};
