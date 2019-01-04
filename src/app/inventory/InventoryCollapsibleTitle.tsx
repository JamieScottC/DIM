import * as React from 'react';
import { RootState } from '../store/reducers';
import { connect } from 'react-redux';
import { toggleCollapsedSection } from '../settings/actions';
import { Dispatch } from 'redux';
import { AppIcon, expandIcon, collapseIcon } from '../shell/icons';
import classNames from 'classnames';
import '../dim-ui/CollapsibleTitle.scss';
import './InventoryCollapsibleTitle.scss';
import { DimStore } from './store-types';
import { storeBackgroundColor } from '../shell/dimAngularFilters.filter';

interface ProvidedProps {
  sectionId: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  stores: DimStore[];
}

interface StoreProps {
  collapsed: boolean;
}

interface DispatchProps {
  toggle(): void;
}

function mapStateToProps(state: RootState, props: ProvidedProps): StoreProps {
  return {
    collapsed: state.settings.collapsedSections[props.sectionId]
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ProvidedProps): DispatchProps {
  return {
    toggle: () => {
      dispatch(toggleCollapsedSection(ownProps.sectionId));
    }
  };
}

type Props = StoreProps & ProvidedProps & DispatchProps;

class InventoryCollapsibleTitle extends React.Component<Props> {
  render() {
    const { title, collapsed, children, toggle, className, stores } = this.props;
    return (
      <>
        <div className="store-row inventory-title">
          {stores.map((store, index) => (
            <div
              className={classNames('title', 'store-cell', className, {
                collapsed,
                vault: store.isVault
              })}
              style={
                store.isDestiny2() && store.color ? storeBackgroundColor(store, index) : undefined
              }
            >
              {index === 0 && (
                <span className="collapse-handle" onClick={toggle}>
                  <AppIcon className="collapse" icon={collapsed ? expandIcon : collapseIcon} />{' '}
                  <span>{title}</span>
                </span>
              )}
            </div>
          ))}
        </div>
        {!collapsed && children}
      </>
    );
  }
}

export default connect<StoreProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(InventoryCollapsibleTitle);
