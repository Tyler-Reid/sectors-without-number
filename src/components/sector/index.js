import { connect } from 'react-redux';

import Entities from 'constants/entities';
import { generateEntity } from 'store/actions/entity.actions';
import { editSystem, closeSystemCreate } from 'store/actions/system.actions';
import { getCurrentSector } from 'store/selectors/sector.selectors';
import { closeUserDropdown } from 'store/actions/user.actions';
import Sector from './sector';

const mapStateToProps = state => ({
  renderSector: state.sector.renderSector,
  sector: getCurrentSector(state),
  createSystemKey: state.system.createSystemKey,
  isDropdownActive: state.user.isDropdownActive,
  isInitialized: state.user.isInitialized,
});

const mapDispatchToProps = dispatch => ({
  editSystem: system => dispatch(editSystem(system.key, system)),
  closeSystemCreate: () => dispatch(closeSystemCreate()),
  closeUserDropdown: () => dispatch(closeUserDropdown()),
  generateSector: () => dispatch(generateEntity(Entities.sector.key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sector);
