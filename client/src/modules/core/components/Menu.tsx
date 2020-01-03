import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {AppState} from '../../../store/reducers';
import {ILoggedUser} from '../../auth/models/ILoggedUser';
import {logout} from '../../auth/actions/authentication';
import {IAuthenticationLogoutAction} from '../../auth/types/authentication';

interface IProps {
  user: ILoggedUser | null;
  logout(): IAuthenticationLogoutAction;
}

const Menu: React.FC<IProps> = ({user, logout}) => {
  const {t} = useTranslation();

  return (
    <>
      <Navbar bg={'dark'} variant={'dark'} expand={'lg'} fixed={'top'}>
        <Link className={'navbar-brand'} to={'/'}>
          <img src={'/images/logo.png'} alt={'CoopERP'} height={36} /> CoopERP
        </Link>
        {user && (
          <>
            <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
            <Navbar.Collapse id={'basic-navbar-nav'}>
              <Nav className={'mr-auto'}>
                <Link to={'/activities'} className={'nav-link'}>
                  {t('activity.title')}
                </Link>
                <Link to={'/projects'} className={'nav-link'}>
                  {t('project.title')}
                </Link>
                <Link className={'nav-link'} to={'/customers'}>
                  {t('customer.title')}
                </Link>
                <Link to={'/tasks'} className={'nav-link'}>
                  {t('task.title')}
                </Link>
                <Link className={'nav-link'} to={'/users'}>
                  {t('user.title')}
                </Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className={'justify-content-end'}>
              <Nav>
                <NavDropdown
                  title={`${user.firstName} ${user.lastName}`}
                  id={'basic-nav-dropdown'}
                  alignRight={true}
                >
                  <Link to={'/profile'} className={'dropdown-item'}>
                    <i className={'fas fa-user'}></i> {t('user.profil.title')}
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <i className={'fas fa-sign-out-alt'}></i> {t('logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </>
  );
};

export default connect(
  (state: AppState) => ({
    user: state.auth.authentication.user
  }),
  dispatch => ({...bindActionCreators({logout}, dispatch)})
)(Menu);
